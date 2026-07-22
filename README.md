# Live News Landing Page Template

A React template rebuilding the layout of a news landing page's header, main
content, and footer:

1. **Top utility bar** — social icons (left) + centered logo + text links (right)
2. **Main navbar** — hamburger icon + 12 category links + search + theme-toggle icons
3. **Breaking-news ticker** — red scrolling headline bar
4. **Hero heading** + a grid of news article cards
5. **Footer** — logo, social row, 4 link columns, copyright bar

Colors: bold blue / yellow / red throughout the navbar, ticker, and footer.

## Structure

```
src/
  assets/              SVG logo, social/utility icons, article thumbnails
  components/
    TopBar.jsx          Social icons + centered logo + utility text links
    Navbar.jsx           Hamburger + 12 category links + search/theme icons
    BreakingTicker.jsx   Scrolling red "Breaking News" bar
    Hero.jsx             Bold heading above the news grid
    NewsGrid.jsx         Renders the article card grid
    ArticleCard.jsx       Reusable article card (used 6x with different data)
    Footer.jsx            Logo, social links, footer columns, copyright bar
    FooterColumn.jsx      Reusable footer link-group (used 4x with different data)
  pages/
    Home.jsx             "/" route
    PlaceholderPage.jsx   Catch-all route rendered for every other link
  siteData.js            All nav links / footer groups / articles / ticker text live here
  App.jsx                Router + header/footer composition
  main.jsx                Entry point (BrowserRouter)
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
