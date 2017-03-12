# gifr

gifr is a single-page web app inspired by Flickr. It utilizes my own DOM manipulation library, [domSawyer](https://github.com/adamjubert/domSawyer), to handle events and send AJAX requests to the GIPHY API.

[Live](https://adamjubert.github.io/gifr)

## Features

Users can add a gif to the page either by selecting the 'Add Dog Gif' button or inputing a specific query in the search bar. This triggers a `domSawyer` AJAX request to the GIPHY API:

```
function fetchGif(tag) {
  $ds.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/random?api_key=*************&tag=${tag}&rating=g`,
    success: data => addGifToRow(data)
  });
}
```

Users can remove the last gif and remove all gifs from the screen. There are also three toggle buttons that, when clicked, toggle a specific action on/off:
* Zoom gifs 20% on hover
* Add a clickable link to each gif
* Expand gif size and only display one per row

```
function toggleZoom() {
  $ds('#action-zoom').toggleClass("selected");
  $ds('.gif').toggleClass("zoom");
}
```

These toggle buttons affect all gifs currently on the screen and remain in effect even after all gifs have been removed.
