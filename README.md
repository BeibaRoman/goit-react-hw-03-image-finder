# Image Finder

A React application for searching images by keyword using the [Pixabay API](https://pixabay.com/api/docs/). Results are shown in a responsive gallery with "Load more" pagination and a modal window for the full-size image.

**Live demo:** https://beibaroman.github.io/goit-react-hw-03-image-finder/

## Features

- Search images by keyword
- Responsive grid gallery (12 images per page)
- "Load more" button that appears only when there are more results to load
- Loading spinner while a request is in progress
- Modal window with the full-size image
  - closes on `Esc`
  - closes on click on the backdrop
  - page scroll is locked while the modal is open
- Toast notifications for an empty query, an empty result and request errors
- Duplicate images returned by the API across pages are filtered out

## Tech stack

- React (class components for stateful parts, function components for presentational ones)
- Vite
- CSS Modules
- [react-toastify](https://fkhadra.github.io/react-toastify/)
- [react-loader-spinner](https://mhnpd.github.io/react-loader-spinner/)
- Pixabay API (`fetch` + `URLSearchParams`)
- GitHub Pages (`gh-pages`) for deployment

## How it works

State lives in `App`:

| State field     | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `query`         | current search query                                 |
| `page`          | current page of results                              |
| `images`        | images shown in the gallery                          |
| `totalHits`     | total number of results available for the query      |
| `isLoading`     | shows the loader while a request is in progress      |
| `selectedImage` | image shown in the modal, `null` when it is closed   |

- `SearchBar` keeps the input value in its own state and calls `onSubmit(query)` only when the form is submitted.
- `componentDidUpdate` in `App` compares the previous and the current `query` / `page`. When one of them changes, it fetches the next portion of images and appends it to the gallery.
- A new search resets `page` to `1` and clears the previous results.
- The "Load more" button is shown while `page < Math.ceil(totalHits / PER_PAGE)` and nothing is loading.
- `Modal` adds a `keydown` listener in `componentDidMount` and removes it in `componentWillUnmount`.

## Project structure

```
src/
├── components/
│   ├── App/
│   ├── SearchBar/
│   ├── ImageGallery/
│   │   └── ImageGalleryItem/
│   ├── Button/
│   ├── Loader/
│   └── Modal/
├── services/
│   └── pixabayApi.js
├── index.css
└── main.jsx
```