# ReadJourney

ReadJourney is a book reading tracker. Users create an account, browse recommended books, build a personal library, and record reading sessions page by page. The app keeps a diary of every session and shows how much of each book has been read.

The project was built for the GoIT full-stack JavaScript course. It is a single-page application written in React and talks to the course's REST API.

## Links

- **Live demo:** - COMING SOON -
- **Repository:** https://github.com/hllverel/ReadJourney
- **Design (Figma):** https://www.figma.com/file/z3m0rdBcEfLTJUBDkAKhWQ/BOOKS-READING?type=design&node-id=18743%3A4973&mode=design&t=Hi1KTaUJMogWXZzz-1
- **API documentation (Swagger):** https://readjourney.b.goit.study/api-docs/

## Features

**Authentication**

- Registration and login forms validated with react-hook-form and Yup (the email pattern and the 7-character minimum password come from the specification), with a show/hide password toggle.
- Backend errors are shown as pop-up notifications. A successful registration signs the user in automatically.
- The session is stored in `localStorage` and restored on every visit. The access token is renewed silently when it expires, and the current user is verified when the app starts.
- Logging out ends the session on the server and clears both the Redux store and `localStorage`, even when the request fails.

**Home: recommended books**

- Server-side pagination with previous and next arrows that are disabled on the first and last page.
- Filtering by title and author.
- The number of books per page follows the real layout: as many full rows as fit the screen.
- Clicking a cover opens a details modal with an "Add to library" button, followed by a confirmation modal. Modals close on a backdrop click, the close button or the Escape key.

**My library**

- A validated "Add book" form (title, author, number of pages).
- A status filter (Unread, In progress, Done, All books), delete buttons, and a preview of three recommended books.
- A "Start reading" modal that opens the reading page for the chosen book.
- Books without a cover get a default placeholder image.

**Reading**

- A start/stop form that validates the page number against the book and the current session.
- A status indicator, a "book is read" modal, and the estimated time left.
- A diary with one entry per finished session (pages, percentage, minutes, speed) and a delete button on each, plus a statistics view with a progress ring.

## Tech stack

| Area                 | Tools                                     |
| -------------------- | ----------------------------------------- |
| Framework and build  | React, Vite                               |
| State                | Redux Toolkit, redux-persist              |
| Routing              | React Router                              |
| HTTP                 | Axios                                     |
| Forms and validation | react-hook-form, Yup, @hookform/resolvers |
| Notifications        | react-hot-toast                           |
| Styling              | CSS Modules, written mobile first         |
| Code quality         | ESLint, Prettier                          |

## Getting started

Requirements: a current LTS release of Node.js and npm.

```bash
git clone git@github.com:hllverel/ReadJourney.git
cd ReadJourney
npm install
cp .env.example .env
npm run dev
```

The app starts on `http://localhost:3000`.

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally   |

### Environment variables

| Variable       | Description                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| `VITE_API_URL` | Base URL of the backend API, for example `https://readjourney.b.goit.study/api` |

Vite reads this value when it starts or builds, so restart the dev server after changing it.

## Routes

| Route              | Access  | Page                                                   |
| ------------------ | ------- | ------------------------------------------------------ |
| `/register`        | Public  | Welcome page with the registration form                |
| `/login`           | Public  | Welcome page with the login form                       |
| `/recommended`     | Private | Home: filters, workout guide, recommended books        |
| `/library`         | Private | My library: add a book, recommended preview, book list |
| `/reading/:bookId` | Private | Reading: start/stop form, diary, statistics            |
| `/`                | Any     | Redirects to `/recommended`                            |
| `*`                | Any     | Page not found                                         |

Logged-in visitors are redirected away from the public pages, and logged-out visitors are redirected to `/login` from the private ones.

## Project structure

```
src/
├── components/   Reusable UI pieces, one folder per component
├── hooks/        Custom hooks (modal state, books per page)
├── pages/        One component per route
├── redux/        Store and slices: auth, books, library, reading
├── services/     Axios instance, interceptors and API request functions
├── utils/        Validation schemas, reading statistics and formatting helpers
├── App.jsx
├── index.css     Global styles and design tokens
└── index.jsx
public/
├── assets/       Optimised hero images (1x and 2x)
└── symbol-defs.svg   SVG sprite with all icons
```

## API

The app uses the ReadJourney backend (`/users/*` and `/books/*`). Authentication uses a bearer token that lasts one hour, plus a refresh token.

| Purpose                                        | Endpoint                                                                                 |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Sign up, sign in, sign out                     | `POST /users/signup`, `POST /users/signin`, `POST /users/signout`                        |
| Current user and token refresh                 | `GET /users/current`, `GET /users/current/refresh`                                       |
| Recommended books (page, limit, title, author) | `GET /books/recommend`                                                                   |
| Library                                        | `GET /books/own`, `POST /books/add`, `POST /books/add/{id}`, `DELETE /books/remove/{id}` |
| Reading sessions                               | `POST /books/reading/start`, `POST /books/reading/finish`, `DELETE /books/reading`       |
| Book details                                   | `GET /books/{id}`                                                                        |

## Implementation notes

- **Token refresh.** An Axios response interceptor catches a 401, requests new tokens with the refresh token, and replays the failed request. Requests that fail together share a single refresh call, and a failed refresh clears the session. The interceptor receives the store from `index.jsx`, which avoids a circular import between the store and the services.
- **Books per page.** The page size is the number of grid columns multiplied by the number of rows. The columns are read from the rendered grid, so CSS stays the single source of truth. On desktop, the rows also depend on the height of the window.
- **Library state.** The whole library is loaded once and filtered by status in the browser. Because the API creates a new copy each time a book is added, the app checks for an existing book with the same title and author before adding one.
- **Reading state.** Starting, stopping and deleting a session each return the updated book, so the page replaces its copy with every response. The library list is updated from the same responses, which keeps book statuses in step.
- **Accessibility.** Semantic landmarks, labelled form controls, visible focus indicators, and modals that move focus inside, make the rest of the page inert and return focus when closed.
- **Performance.** All icons come from one SVG sprite, covers are loaded lazily, and the hero image is served as WebP at 1x and 2x for retina screens.

## Responsive design

The layout is mobile first and follows the Figma design: flexible from 320px, fully responsive from 375px, a tablet layout from 768px and a desktop layout from 1280px. The header adapts to each size: on mobile it shows the logo, the avatar and a burger button that opens a side menu; tablet shows the full navigation without the site name and user name; desktop shows everything.

## Author

Hilal ([@hllverel](https://github.com/hllverel))
