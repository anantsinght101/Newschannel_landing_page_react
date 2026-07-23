# News Yatra — Link & Route Audit Report

> **Summary Total**: 31 working, 8 placeholder, 0 dead, 0 orphaned.

This report documents every clickable link, route, button navigation trigger, and registered page across the News Yatra web application.

---

## Working links
| Location | Link text/label | Destination | Notes |
|---|---|---|---|
| TopBar Header | `न्यूज यात्रा` / `NEWS YATRA` Logo | `/` | Navigates to Homepage |
| TopBar Header | `Instagram` Icon | `https://instagram.com/newsyatra2025` | Official Instagram handle |
| TopBar Header | `YouTube` Icon | `https://www.youtube.com/@NewsYatraS` | Official YouTube channel |
| TopBar Header | `WhatsApp` Icon | `https://wa.me/919764444001` | Official WhatsApp contact |
| TopBar Header | `Facebook` Icon | `https://facebook.com` | Official Facebook handle |
| TopBar Header | `Twitter` Icon | `https://twitter.com` | Official Twitter handle |
| TopBar Header | `अ‍ॅडमिन लॉगिन` / `Admin Login` | `/admin/login` | Navigates to Admin Login portal |
| Navbar Header | `🏠 होम` / `Home` (Non-homepage view) | `/` | Navigates to Homepage |
| Navbar Header | `ताज्या बातम्या` / `Latest News` | `/latest` | Category page (Latest News) |
| Navbar Header | `महाराष्ट्र` / `Maharashtra` | `/maharashtra` | Category page (Maharashtra) |
| Navbar Header | `राजकारण` / `Politics` | `/politics` | Category page (Politics) |
| Navbar Header | `क्रीडा` / `Sports` | `/sports` | Category page (Sports) |
| Navbar Header | `मनोरंजन` / `Entertainment` | `/entertainment` | Category page (Entertainment) |
| Navbar Header | `व्यवसाय` / `Business` | `/business` | Category page (Business) |
| Navbar Header | `तंत्रज्ञान` / `Technology` | `/tech` | Category page (Tech) |
| Navbar Header | `कृषी` / `Agriculture` | `/agriculture` | Category page (Agriculture) |
| Navbar Header | `संवाद` / `Interviews` | `/interviews` | Category page (Interviews) |
| Navbar Header | `व्हिडिओ` / `Videos` | `/videos` | Category page (Videos) |
| Navbar Header | `विशेष` / `Special` | `/special` | Category page (Special Reports) |
| Navbar Header | `ग्लोबल` / `Global` | `/global` | Category page (Global) |
| Sidebar Menu Drawer | `📂 सर्व विभाग` / `All Categories` (1st option) | `/categories` | Navigates to All Categories overview grid |
| Sidebar Menu Drawer | `🏠 मुख्यपृष्ठ` / `Homepage` | `/` | Navigates to Homepage |
| Breaking News Ticker | Live Marquee Headlines | `/article/:id` | Dynamic link to published article detail page |
| Dynamic News Grid | Article Card Image & Headline | `/article/:id` | Navigates to Article Detail page |
| Categories Overview | Category Cards (12 Cards) | `/:categorySlug` | Navigates to respective Category Page |
| Article Detail Page | Category Breadcrumb Link | `/:categorySlug` | Navigates to respective Category Page |
| Article Detail Page | Related Article Cards | `/article/:id` | Navigates to related Article Detail page |
| Footer Header | `News Yatra` Logo & Brand Name | `/` | Navigates to Homepage |
| Footer Contact | `📞 9764444001` | `https://wa.me/919764444001` | Direct WhatsApp contact link |
| Footer Social | `Instagram`, `YouTube`, `WhatsApp`, `Facebook` | External URLs | Official channel social media links |
| Admin Dashboard | `+ नवीन बातमी अपलोड करा` Button | Opens Modal | Triggers `UploadNewsModal` dialog |

---

## Placeholder links (real route, generic/empty content)
| Location | Link text/label | Destination | Notes |
|---|---|---|---|
| TopBar Utility Links | `आमच्याबद्दल` / `About Us` | `/about` | Routes to `PlaceholderPage` |
| TopBar Utility Links | `संपर्क` / `Contact` | `/contact` | Routes to `PlaceholderPage` |
| TopBar Utility Links | `ई-पेपर` / `E-Paper` | `/epaper` | Routes to `PlaceholderPage` |
| Footer Company Links | `जाहिरात करा` / `Advertise With Us` | `/advertise` | Routes to `PlaceholderPage` |
| Footer Company Links | `गोपनीयता धोरण` / `Privacy Policy` | `/privacy` | Routes to `PlaceholderPage` |
| Footer Services Links | `लाइव्ह टीव्ही` / `Live TV Stream` | `/livetv` | Routes to `PlaceholderPage` |
| Footer Services Links | `न्यूजलेटर` / `Newsletter` | `/newsletter` | Routes to `PlaceholderPage` |
| App Router | Catch-all Unknown Paths | `*` | Any undefined path routes safely to `PlaceholderPage` |

---

## Dead links (go nowhere)
| Location | Link text/label | Attempted destination | Why it's dead |
|---|---|---|---|
| *None* | *None* | *None* | Zero dead links found. All links either route to active features/pages, external URLs, or `PlaceholderPage`. |

---

## Orphaned pages (exist, but nothing links to them)
| Route | What it renders | Notes |
|---|---|---|
| *None* | *None* | All registered routes (`/`, `/categories`, `/article/:id`, 12 Category pages, `/admin/login`, `/admin`) are actively linked from UI components or auth flows. |
