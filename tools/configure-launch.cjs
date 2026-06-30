const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const configPath = path.join(root, "site.config.json");

function parseArgs(argv) {
  return argv.reduce((result, arg) => {
    if (!arg.startsWith("--")) {
      return result;
    }

    const [key, ...valueParts] = arg.slice(2).split("=");
    result[key] = valueParts.join("=");
    return result;
  }, {});
}

function readConfig() {
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    return {};
  }
}

function normalizeSiteUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function validateSiteUrl(siteUrl) {
  if (!siteUrl) {
    return;
  }

  try {
    const parsed = new URL(siteUrl);
    if (parsed.protocol !== "https:") {
      throw new Error("Site URL must use HTTPS.");
    }
  } catch (error) {
    throw new Error("Use a full HTTPS site URL, for example --site-url=https://gpacalculatorpakistan.com");
  }
}

function validateEmail(email) {
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Use a valid contact email, for example --contact-email=hello@example.com");
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHeadTags(config) {
  const lines = [];

  if (config.searchConsoleVerification) {
    lines.push(`    <meta name="google-site-verification" content="${escapeHtml(config.searchConsoleVerification)}">`);
  }

  if (config.adsenseClientId) {
    const clientId = escapeHtml(config.adsenseClientId);
    lines.push(
      `    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}"`,
      '         crossorigin="anonymous"></script>'
    );
  }

  if (config.ga4MeasurementId) {
    const measurementId = escapeHtml(config.ga4MeasurementId);
    lines.push(
      `    <script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>`,
      "    <script>",
      "      window.dataLayer = window.dataLayer || [];",
      "      function gtag(){dataLayer.push(arguments);}",
      '      gtag("js", new Date());',
      `      gtag("config", "${measurementId}");`,
      "    </script>"
    );
  }

  return lines.join("\n");
}

function updateLaunchHead(file, config) {
  const target = path.join(root, file);
  const start = "    <!-- launch-head:start -->";
  const end = "    <!-- launch-head:end -->";
  const tags = buildHeadTags(config);
  const replacement = tags ? `${start}\n${tags}\n${end}` : `${start}\n${end}`;
  let html = fs.readFileSync(target, "utf8");
  const markerPattern = /    <!-- launch-head:start -->[\s\S]*?    <!-- launch-head:end -->/;

  if (markerPattern.test(html)) {
    html = html.replace(markerPattern, replacement);
  } else {
    html = html.replace(/(\s{4}<link rel="canonical" href="[^"]+">\r?\n)/, `$1${replacement}\n`);
  }

  fs.writeFileSync(target, html, "utf8");
}

// Rewrite canonical, og:url, og:image, and twitter:image to absolute URLs for the
// hand-maintained pages (index.html, privacy.html). Generated pages already emit
// absolute URLs from the build script. Idempotent and safe to re-run when the
// domain changes, because it always overwrites with the current site URL.
function absolutizeUrls(file, siteUrl, canonicalPath) {
  const target = path.join(root, file);
  let html = fs.readFileSync(target, "utf8");
  const pageUrl = `${siteUrl}${canonicalPath}`;
  const imageUrl = `${siteUrl}/og-image.png`;

  html = html.replace(/(<link rel="canonical" href=")[^"]*(">)/, `$1${pageUrl}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${pageUrl}$2`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*(">)/, `$1${imageUrl}$2`);
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*(">)/, `$1${imageUrl}$2`);

  fs.writeFileSync(target, html, "utf8");
}

const args = parseArgs(process.argv.slice(2));
const current = readConfig();
const next = {
  siteUrl: normalizeSiteUrl(args["site-url"] || process.env.SITE_URL || current.siteUrl || "https://your-domain.com"),
  contactEmail: String(args["contact-email"] || process.env.CONTACT_EMAIL || current.contactEmail || "").trim(),
  adsenseClientId: String(
    args["adsense-client"] || process.env.ADSENSE_CLIENT_ID || current.adsenseClientId || ""
  ).trim(),
  ga4MeasurementId: String(args["ga4"] || process.env.GA4_MEASUREMENT_ID || current.ga4MeasurementId || "").trim(),
  searchConsoleVerification: String(
    args["search-console"] || process.env.SEARCH_CONSOLE_VERIFICATION || current.searchConsoleVerification || ""
  ).trim()
};

validateSiteUrl(next.siteUrl);
validateEmail(next.contactEmail);

fs.writeFileSync(configPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
require("./generate-hub-pages.cjs");
updateLaunchHead("index.html", next);
updateLaunchHead("privacy.html", next);
updateLaunchHead("404.html", next);
absolutizeUrls("index.html", next.siteUrl, "/");
absolutizeUrls("privacy.html", next.siteUrl, "/privacy.html");

console.log("Launch config applied.");
console.log(`Site URL: ${next.siteUrl}`);
console.log(`Contact email: ${next.contactEmail || "(not set)"}`);
console.log(`AdSense client: ${next.adsenseClientId || "(not set)"}`);
console.log(`GA4: ${next.ga4MeasurementId || "(not set)"}`);
console.log(`Search Console meta: ${next.searchConsoleVerification ? "set" : "(not set)"}`);
