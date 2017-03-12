function addGifToRow(data) {
  const giphy = JSON.parse(data).data;
  const img = `<img class="${ addClasses() }" src="${giphy.image_original_url}" />`;
  $d('.gif-wrapper').last().append(img)
}

function addClasses() {
  let classes = "gif";
  if ($d('.gif').length() > 0 ) {
    if ( $d('.gif').hasClass("gif-mobile") ) { classes += " gif-mobile" }
    if ( $d('.gif').hasClass("cursor") ) { classes += " cursor" }
    if ( $d('.gif').hasClass("zoom") ) { classes += " zoom" }
  }
  return classes;
}

function toggleMobile() {
  $d('.row').toggleClass("row-mobile");
  $d('.gif').toggleClass("gif-mobile");
  $d('.wrapper').toggleClass("wrapper-mobile");
  $d('#action-mobile').toggleClass("selected");
}

function addRowOfGifs(tag = "dog") {
  $d('.gif-wrapper').append('<div class="row"></div>');
  for (var i = 0; i < 4; i++) {
    $d.ajax({
      method: 'GET',
      url: `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${tag}&rating=g`,
      success: data => addGifToRow(data)
    });
  }
}



function removeGif() {
  $d('.gif-wrapper').children().last().remove();
}

function removeRow() {
  $d('.gif-wrapper').last().remove();
}

function toggleZoom() {
  $d('#action-zoom').toggleClass("selected");
  $d('.gif').toggleClass("zoom")
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
