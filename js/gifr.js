function addClasses() {
  let classes = "gif";
  if ( $ds('#action-mobile').hasClass("selected") ) { classes += " gif-mobile"; }
  if ( $ds('#action-clickable').hasClass("selected") ) { classes += " cursor"; }
  if ( $ds('#action-zoom').hasClass("selected") ) { classes += " zoom"; }
  return classes;
}

function addGifToRow(data) {
  let url = JSON.parse(data).data.image_url;
  if (url.split("")[4] !== 's') { // ensure image is https
    url = [url.slice(0, 4), 's', url.slice(4)].join('');
  }
  let img = `<img class="${ addClasses() }" src="${ url }" />`;
  $ds('.gif-wrapper').last().append(img);
}

function addDescription(item) {
  let text = whichToAdd(item);
  $ds(".action-description").append(`<p>${text}</p>`);
}

function addRowOfGifs() {
  for (var i = 0; i < 4; i++) {
    addSingleGif();
  }
}

function addSingleGif(tag = "dog") {
  let lastRow = $ds('.gif-wrapper').last();
  if ( lastRow.children().length()  === 4 || lastRow.length() === 0 ) {
    $ds('.gif-wrapper').append('<div class="row"></div>');
  }
  fetchGif(tag);
}

function searchForGif() {
  let query = $ds("#search-form").elements()[0].value;
  addSingleGif(query);
}

function fetchGif(tag) {
  $ds.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${tag}&rating=g`,
    success: data => addGifToRow(data)
  });
}

function whichToAdd(item) {
  switch (item) {
    case 'add':
      return "Sends an AJAX request to the giphy API and appends the received gif to the last child";
    case 'remove':
      return "Removes the last '.row' child element from the screen";
    case 'removeAll':
      return "Removes all elements with class 'row' (and therefore, all gifs) from the screen";
    case 'zoom':
      return "Toggles a class that adds a 'transform: scale(1.2)' property on hover";
    case 'click':
      return "Toggles an on-click event handler that opens the image's url in a new window";
    case 'mobile':
      return "Toggles a class that adds a 'flex-direction: column' property to each row and increases image width and height ";
    default:
      return "";
  }
}

function removeAllGifs() {
  if ( $ds('.gif').length() === 0 ) { return; }
  $ds(".row").remove();
}

function removeDescription() {
  $ds(".action-description").children().remove();
}

function removeLastGif() {
  if ( $ds('.gif').length() === 0 ) { return; }
  if ( $ds('.gif-wrapper').last().children().length() === 1 ) {
    $ds('.gif-wrapper').last().remove();
  } else {
    $ds('.row').last().remove();
  }
}

function noGifsOnScreen() {
  return ( $ds('.gif').length() === 0 );
}

function removeRow() {
  $ds('.gif').last().remove();
}

function toggleClickableGifs() {
  $ds('#action-clickable').toggleClass("selected");
  $ds('.gif').toggleClass("cursor");
  if ( $ds('.gif').hasClass("cursor") ) {
    $ds('.gif').on("click", ((e) => window.open(e.target.src, '_blank') ));
  } else {
    $ds('.gif').off("click");
  }
}

function toggleMobile() {
  $ds('.row').toggleClass("row-mobile");
  $ds('.gif').toggleClass("gif-mobile");
  $ds('.wrapper').toggleClass("wrapper-mobile");
  $ds('#action-mobile').toggleClass("selected");
}

function toggleZoom() {
  $ds('#action-zoom').toggleClass("selected");
  $ds('.gif').toggleClass("zoom");
}
