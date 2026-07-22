# Live News Landing Page Template

A React template rebuilding the layout of a live-TV news landing page:
sticky navbar with many links → hero heading + live player → footer with
social row + 4 link columns + copyright bar. Colors: bold blue / yellow / red.

## Structure

```
src/
  assets/            SVG logo, social icons, hero thumbnail, play icon
  components/
    Navbar.jsx        Logo + horizontal nav links (collapses to menu on mobile)
    Hero.jsx          Heading + click-to-play video block
    Footer.jsx        Logo, social links, footer columns, copyright bar
    FooterColumn.jsx  Reusable footer link-group (used 4x with different data)
  pages/
    Home.jsx           "/" route
    PlaceholderPage.jsx Catch-all route rendered for every other link
  siteData.js          All nav links / footer groups / social links live here
  App.jsx              Router setup
  main.jsx              Entry point (BrowserRouter)
```

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
```

## Customizing

- **Rename links**: edit `src/siteData.js` — every nav link, footer group,
  and footer link is generated from that file, so you only edit it once.
- **Add real routes**: replace the catch-all `<Route path="*" ...>` in
  `App.jsx` with specific `<Route>` entries once you have real pages, or keep
  `PlaceholderPage.jsx` as a fallback 404.
- **Swap images**: replace files in `src/assets/` (keep the same file names,
  or update the `import` paths) — every `<img>` already has descriptive
  `alt` text.
- **Colors**: all theme colors are CSS variables at the top of
  `src/index.css` (`--color-blue`, `--color-yellow`, `--color-red`).
- **Real video embed**: in `Hero.jsx`, swap the `iframe`'s `src="about:blank"`
  for your actual stream/embed URL.
