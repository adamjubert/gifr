function addClasses() {
  let classes = "gif";
  if ($d('.gif').length() > 0 ) {
    if ( $d('.gif').hasClass("gif-mobile") ) { classes += " gif-mobile"; }
    if ( $d('.gif').hasClass("cursor") ) { classes += " cursor"; }
    if ( $d('.gif').hasClass("zoom") ) { classes += " zoom"; }
  }
  return classes;
}

function addGifToRow(data) {
  const giphy = JSON.parse(data).data;
  const img = `<img class="${ addClasses() }" src="${giphy.image_original_url}" />`;
  $d('.gif-wrapper').last().append(img)
}

function addDescription(item) {
  let text = whichToAdd(item);
  $d(".action-description").append(`<p>${text}</p>`);
}


function addRowOfGifs() {
  for (var i = 0; i < 4; i++) {
    addSingleGif();
  }
}

function addSingleGif(tag = "dog") {
  let lastRowLength = $d('.gif-wrapper').last().length();
  if ( lastRowLength  === 4 || lastRowLength === 0 ) {
    $d('.gif-wrapper').append('<div class="row"></div>');
  }
  fetchGif(tag)
}

function searchForGif() {
  let query = $d("#search-form").elements()[0].value;
  addSingleGif(query);
}

function fetchGif(tag) {
  $d.ajax({
    method: 'GET',
    url: `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${tag}&rating=g`,
    success: data => addGifToRow(data)
  });
}

function whichToAdd(item) {
  switch (item) {
    case 'add':
      return "Sends an AJAX request to the giphy API and appends the received gif to the last child";
    case 'remove':
      return "Removes the last element with class 'gif' from the screen";
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
  $d(".row").remove();
}

function removeDescription() {
  $d(".action-description").children().remove();
}

function removeLastGif() {
  $d('.gif-wrapper').children().last().remove();
  if ($d('.row').last().length() === 0) {
    $d('.row').last().remove();
  }
}

function removeRow() {
  $d('.gif').last().remove();
}

function toggleClickableGifs() {
  $d('#action-clickable').toggleClass("selected");
  $d('.gif').toggleClass("cursor");
  if ( $d('.gif').hasClass("cursor") ) {
    $d('.gif').on("click", ((e) => window.open(e.target.src, '_blank') ));
  } else {
    $d('.gif').off("click");
  }
}

function toggleMobile() {
  $d('.row').toggleClass("row-mobile");
  $d('.gif').toggleClass("gif-mobile");
  $d('.wrapper').toggleClass("wrapper-mobile");
  $d('#action-mobile').toggleClass("selected");
}

function toggleZoom() {
  $d('#action-zoom').toggleClass("selected");
  $d('.gif').toggleClass("zoom");
}
