# Sanjyot Pote — Portfolio

A responsive, accessible personal portfolio focused on wireless communications, RF engineering, research, and selected technical work.

## Update the content

Most repeatable content lives in `dist/site-data.js`:

- `experience` controls the career timeline.
- `work` controls the filterable project and research cards.
- `publications` controls the publication cards.
- `contacts` controls the links in the contact section.

Edit the main biography, education, leadership note, and life mission directly in `dist/index.html`.

## Publish with GitHub Pages

1. Create a new GitHub repository and upload this project.
2. Make sure the default branch is named `main`.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. Push a commit to `main`. The included workflow publishes the contents of `dist/` automatically.

## Preview locally

Open `dist/index.html` in a browser. For clipboard support and the closest production behavior, serve the folder with any local static server.

## Contact-link placeholders

GitHub and Gmail are intentionally hidden until their exact values are added to `dist/site-data.js`. This avoids publishing an incorrect or private address.
