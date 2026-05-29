# Learning Journal

A minimalist, vibe-coded journal for the things worth keeping. Browse notes by
dimension, expand a section, and copy any line with one click.

No build step, no dependencies. Open `index.html` in a browser.

## Adding a note

All content lives in [`data.js`](./data.js). To add a note, append an object to
the `journal` array:

```js
{
  dimension: "Content Creation",   // groups notes into a tab
  title: "Note title",
  subtitle: "Optional one-liner",  // optional
  date: "2026-05-29",              // optional (ISO)
  sections: [
    {
      title: "Section name",       // a collapsible group
      items: [
        "A line you can copy.",
        "Another one.",
      ],
    },
  ],
  footer: "Optional closing note." // optional
}
```

Notes with the same `dimension` are grouped under one tab. Each `item` renders
with its own copy button.

## Running locally

Just open the file:

```sh
open index.html        # macOS
```

Or serve it (avoids any browser file:// quirks):

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```
