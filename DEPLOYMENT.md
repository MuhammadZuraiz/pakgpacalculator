# Deployment Checklist

This is a no-build static site. Deploy the whole folder to Netlify, then connect a real domain before submitting the sitemap or applying for AdSense.

## Domain and AdSense Timing (read first)

- **Buy a cheap custom domain up front, before the site is publicly indexed.** Pakistan falls under AdSense's ~6-month site-age rule, so the aging clock and your indexed URLs should live on the final domain from day one. Launching on a free `*.netlify.app` subdomain and migrating later wastes aging time and SEO equity.
- Use `*.netlify.app` only as a private staging/preview URL, not as the public address.
- **Cheapest paths:** GitHub Student Developer Pack (free `.me`/`.tech` for a year via Namecheap), Cloudflare Registrar (at-cost `.com`), or Porkbun/Namecheap promos. Avoid Freenom (`.tk/.ml`) and `.pk` (expensive). Prefer a keyword `.com` such as `gpacalculatorpakistan.com`.
- **Sequence:** buy domain → launch on it → submit sitemap → build organic traffic for ~6 months → apply to AdSense once there is real crawl history and steady traffic.

## Before Public Launch

1. Buy or choose the real domain.
2. Create a real owner contact email for that domain.
3. Confirm Node.js is available:

```powershell
node --version
```

If that command is not found, install Node.js LTS or ask Codex to run the launch command from its bundled runtime.

4. Apply the launch settings:

```powershell
node tools/configure-launch.cjs --site-url=https://your-real-domain.com --contact-email=hello@your-real-domain.com
```

Optional tracking values can be added at the same time:

```powershell
node tools/configure-launch.cjs --site-url=https://your-real-domain.com --contact-email=hello@your-real-domain.com --ga4=G-XXXXXXXXXX --search-console=YOUR_GOOGLE_VERIFICATION_TOKEN
```

The script updates `site.config.json`, regenerates the hub pages, writes `robots.txt` plus `sitemap.xml`, and injects optional GA4/Search Console tags into the manual pages.

If you do not want to use Node, manually replace `https://your-domain.com` in `site.config.json`, `robots.txt`, and `sitemap.xml`, then replace the launch note in `contact.html` with a real email address.

## Netlify Steps

1. Upload this whole folder to Netlify Drop or a Netlify site.
2. Confirm the temporary `.netlify.app` URL loads.
3. Test `/`, `/nust-gpa-calculator/`, `/cgpa-calculator-pakistan/`, `/privacy.html`, `/robots.txt`, and `/sitemap.xml`.
4. Add the custom domain in Netlify.
5. Update DNS records at the domain registrar using the values Netlify gives you.
6. Wait for HTTPS to become active.
7. Re-run the launch config command with the final domain and redeploy.
8. Add the site to Google Search Console and submit `https://your-real-domain.com/sitemap.xml`.
9. Add GA4 if you want traffic and calculator event tracking.
10. Apply for AdSense only after the live site has real pages, trust pages, a contact channel, and some crawl history.

## AdSense Guardrails

- Keep calculator controls free from ads.
- Keep placeholder labels as `Advertisement` until real AdSense code is approved.
- Do not ask visitors to click ads.
- Keep About, Contact, Privacy, and calculator navigation visible.
- After approval, paste the line AdSense gives you into `ads.txt` (it currently lists no authorized sellers), then enable ad units inside the existing `.ad-slot` placeholders.

## Assets already in place

- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` (icons), `og-image.png` (1200x630 social preview), and a branded `404.html`.
- The image sources live in `tools/asset-src/` and can be re-rendered if you change the branding.
