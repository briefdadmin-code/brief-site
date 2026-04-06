# Briefd Landing Site — Deployment Guide

## Before you deploy (2 things to do)

### 1. Set your Calendly link
Open `app/page.jsx` and replace the placeholder on line 6:
```
const CALENDLY_URL = "https://calendly.com/YOUR_LINK_HERE";
```

### 2. Buy your domain
Purchase `briefd.com` (or whatever you've chosen) from Namecheap, Google Domains, etc.

---

## Deploy to Vercel (fastest — 5 minutes)

1. **Push to GitHub**
   ```bash
   cd briefd-site
   git init
   git add .
   git commit -m "Briefd landing page"
   gh repo create briefd-site --private --push
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your `briefd-site` repo
   - Click **Deploy** (zero config needed for Next.js)

3. **Add your domain**
   - In Vercel dashboard → Settings → Domains
   - Add `briefd.com`
   - Update your DNS nameservers or add the CNAME/A records Vercel gives you

That's it. Site is live.

---

## Local development
```bash
npm install
npm run dev
# Opens at http://localhost:3000
```

## What's NOT included (set up separately)
- **Calendly** — Create your booking page at calendly.com, paste the link in `page.jsx`
- **Stripe** — Not needed on the landing page. Set up billing inside the app later.
- **Analytics** — Add Vercel Analytics or Plausible after launch if you want tracking.
