# Greatreads

*It's not good like [goodreads](https://www.goodreads.com/). It's greatreads!*

Greatreads is a community‑driven book review platform powered by the Google Books API, where readers sign up, sift through millions of titles, and upload reviews.

## Features

- **User Authentication:** JWT‑based account creation and login
- **Book Search & Reviews:** Google Books API integration; create, edit, and delete reviews
- **User and Global Feeds:** Pages for reviews made by specific users and by everyone
- **Shelves & Favorites:** “Read”, “Currently Reading”, “Want to Read” lists
- **E2E Testing:** Playwright test suites covering authentication & authorization, search, review flows 

## The Stack
- **Frontend:** Angular, Google Books API
- **Backend:** ASP.NET Core (EF Core, JWT auth), Docker
- **DB:** PostgreSQL
- **Tests:** Playwright (Chromium, Firefox, WebKit)
- **CI/CD:** GitHub Actions
- **Platforms used:** AWS/Azure

## License
This project is released under the WTFPL. See [LICENSE](LICENSE) for the full text.