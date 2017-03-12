// function addGifToGrid(data) {
//   const img = document.createElement('img');
//   const giphy = JSON.parse(data).data;
//   img.src = giphy.image_original_url;
//   $go('.gif-grid').last().append(img);
// }


// function addRow() {
//   $d('.gif-wrapper').append('<div class="row"></div>');
//   for (var i = 0; i < 4; i++) {
//     const img = document.createElement('img');
//     img.addClass("gif");
//     const giphy = JSON.parse(data).data;
//     img.src = giphy.image_original_url;
//     $d('.gif-wrapper').last().append(img)
//   }
// }


// function searchForGifs() {
//   $d(".gif-wrapper").empty();
//   let searchTerm = $d("#search-form").htmlElements[0].value
//   addRowOfGifs(searchTerm)
// }

function toggleMobile() {
  $d('.row').toggleClass("row-mobile");
  $d('.gif').toggleClass("gif-mobile");
  $d('.wrapper').toggleClass("wrapper-mobile");
  $d('#action-mobile').toggleClass("selected");
}

// function addGif(tag="dog") {
//   let lastRow = $d('.gif-wrapper').last().children();
//   if ( lastRow.length() >= 4 || lastRow.length() === 0 ) {
//     $d('.gif-wrapper').append('<div class="row"></div>');
//     debugger
//   }
//   $d.ajax({
//     method: 'GET',
//     url: `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=dog&rating=g`,
//     success: data => addGifToRow(data)
//   });
// }

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
// function addRowOfGifs() {
//   $d('.gif-wrapper').append('<div class="row"></div>');
//   for (var i = 0; i < 4; i++) {
//     $d.ajax({
//       method: 'GET',
//       url: 'https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&user_id=24878717%40N06&sort=date-taken-desc&api_key=1f02f8142b7ce9469814076e19c68582',
//       success: data => addGifToRow(data)
//     });
//   }
// }

function addGifToRow(data) {
  const giphy = JSON.parse(data).data;
  let classes = "gif";
  if ($d('.gif').length() > 0 ) {
    if ( $d('.gif').hasClass("gif-mobile") ) { classes += " gif-mobile" }
    if ( $d('.gif').hasClass("cursor") ) { classes += " cursor" }
    if ( $d('.gif').hasClass("frame") ) { classes += " frame" }
  }

  const img = `<img class="${classes}" src="${giphy.image_original_url}" />`;
  debugger

  $d('.gif-wrapper').last().append(img)
}

function removeGif() {
  $d('.gif-wrapper').children().last().remove();
}

function removeRow() {
  $d('.gif-wrapper').last().remove();
}

function toggleFrames() {
  $d('#action-frames').toggleClass("selected");
  $d('.gif').toggleClass("frame")
}

function toggleClickableGifs() {
  $d('#action-clickable').toggleClass("selected");
  $d('.gif').toggleClass("cursor");
  $d('.gif').on("click", ((e) => window.open(e.target.src, '_blank') ));
}
