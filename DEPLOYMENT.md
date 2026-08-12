# Deployment Checklist

This is a no-build static site. Deploy the whole folder to Netlify and verify the published routes before submitting the sitemap or requesting an AdSense review.

## Domain and review timing

- A custom domain can help branding, but AdSense does not publish a universal minimum traffic, word-count, article-count, or site-age threshold.
- Keep one stable canonical hostname. If you add a custom domain, update `site.config.json`, regenerate the pages, redirect the old hostname, and resubmit the sitemap.
- Request review only after the deployed site is complete, crawlable, source-checked, and free of empty, test, or dead-end ad screens.

## Before public launch

1. Choose the final public hostname.
2. Confirm the published contact email is monitored.
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

The script updates `site.config.json`, regenerates the hub pages, writes `robots.txt` plus `sitemap.xml`, and injects optional tags into the manual pages. If you do not use Node, update the domain in those files and in canonical metadata manually, then verify every generated page.

## Netlify steps

1. Upload this whole folder to Netlify Drop or connect the repository to a Netlify site.
2. Confirm the public URL loads over HTTPS.
3. Test `/`, `/nust-gpa-calculator/`, `/semester-gpa-calculator/`, `/methodology.html`, `/privacy.html`, `/robots.txt`, and `/sitemap.xml`.
4. If using a custom domain, add it in Netlify and update DNS using the values Netlify provides.
5. Re-run the launch configuration with the final hostname and redeploy.
6. Add the site to Google Search Console and submit its `/sitemap.xml` URL.
7. Request an AdSense review only after the live site has complete original guidance, working calculators, primary sources, trust pages, and a contact channel.

## AdSense guardrails

- Keep calculator controls free from ads.
- Do not add empty advertisement placeholders before approval.
- Do not ask visitors to click ads.
- Do not load ad code on 404, privacy, contact, about, methodology, or other low-content or dead-end pages.
- Keep About, Contact, Privacy, methodology, source links, and calculator navigation visible.
- Keep `ads.txt` synchronized with the publisher ID shown by AdSense.
- Use a consent-management setup wherever Google or local law requires it before serving personalized ads.

## Assets already in place

- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.png`, and a branded `404.html`.
- The image sources live in `tools/asset-src/` for local editing. Netlify routes `/tools/*` to a 404 so build assets are not public pages.
