let items;

// Load the search results from the server into the html
function loadListings() {
    let _html = '';
    let isOdd = true;
    for (listing in items) {
        _html +=
            '<li id="' +
            items[listing].id +
            '" class="list-group-item list-group-item-action p-2 ' +
            (isOdd ? 'list-group-item-1' : 'list-group-item-2') +
            '">' +
            '<div class="row no-gutters">';
        _html +=
            '<div class="col-lg-7 d-flex">' +
            '<img class="thumbnail rounded" src="' +
            items[listing].photoPaths[0].thumbnailPath +
            '">';
        _html +=
            '<div class="p-2">' +
            '<h5><b>' +
            items[listing].name +
            '</b></h5>';
        _html +=
            '<p class="text-secondary no-overflow">' +
            items[listing].description +
            '</p></div></div>';
        _html +=
            '<div class="col d-flex p-2"><b>Price: </b>$' +
            '<div class="price">' +
            items[listing].price +
            '</div></div>';
        _html +=
            '<div class="col-sm-12 col-md p-2">' +
            '<button id="' + items[listing].id + '" type="button" class="btn btn-primary btn-block pull-right no-overflow" data-toggle="modal" data-target="#modal"' +
            'onclick="event.stopPropagation(); openContactModal(this);">Contact Seller</button>';
        _html += '</div></div></li>';

        isOdd = !isOdd;
    }

    $('#results').html(_html);

    var listings = document.getElementById('results').children;

    // Set onclick attribute for every li
    // This has to be done in a separate scope. If not, dynamically adding the id to the href link
    // does not work properly (took me like an hour to figure this out lol).
    for(var i = 0; i < listings.length; i++){
       setOnClick(listings[i]);
    }

    displayResults();
}

// Redirect to listing page in new tab
function setOnClick(li){
   li.onclick = function(){
      $('<a href="/listing/?id=' + li.id + '" target="_blank"></a>')[0].click();
   }
}

function clearResults() {
    $('#results').empty();
}

// Apply alternating colors
function reapplyAlternatingColors() {
    let isOdd = true;
    $('#main-body li').each(function () {
        if ($(this).css('display') != 'none') {
            $(this).removeClass();
            $(this).attr('class', 'list-group-item list-group-item-action p-2');
            (isOdd ? $(this).addClass('list-group-item-1') : $(this).addClass('list-group-item-2'));
            isOdd = !isOdd;
        }
    });
}

// Applys price filter
function filterPrice() {
    let min = $('#price-min-field').prop('value');
    let max = $('#price-max-field').prop('value');
    if (max == '' || max == 2000) {
        max = Number.MAX_SAFE_INTEGER;
        $('#price-max-field').prop('value', '');
    }

    $('#main-body li').each(function () {
        let price = $(this).find('.price');
        if (parseInt(price.html()) < min || parseInt(price.html()) > max) {
            $(this).css('display', 'none');
        } else {
            $(this).css('display', 'grid');
        }
    });

    displayResults();
    reapplyAlternatingColors();
}

// Displays number of results
function displayResults() {
    let counter = 0;
    $('#main-body li').each(function () {
        if ($(this).css('display') != 'none') {
            counter++;
        }
    });
    $('.num-results').html('<h5>Showing ' + counter + ' results...</h5>');
}



function openContactModal(buttonObj) {

    user = JSON.parse(localStorage.getItem('loggedInUser'));

    // If user is not logged in, redirect to login page
    if(!user) {
      window.location.assign('/html/login-register.html');
      return;
    }

    $('#modal').modal();

    // Find relevant listing
    var listing;
    for (var i = 0; i < items.length; i++) {
        if (items[i].id == buttonObj.id) {
            listing = items[i];
        }
    }
    modal = document.getElementById('contact-text');


    // Add listing id to be used by sendMessage
    $('#modal').data('id', listing.id);

    modal.value = "";
    modal.value += 'From: ' + user.email + '\n';
    modal.value += 'Subject: ' + listing.name + '\n';
    modal.value += '----------------------------------------------------------------------------';

    // TODO: Set cursor position of textarea and make From and Subject lines read-only
}

function sendMessage(){
   var message = document.getElementById('contact-text').value;

   var id = $('#modal').data('id');

   var fetchBody = {
      "message": message,
      "listing_id": id
   }

   var fetchOptions = {
      method: "POST",
      body: JSON.stringify(fetchBody)
   }

   var fetchURL = '/message/';

   fetch(fetchURL, fetchOptions)
	.then((response) => {
           //console.log(response);
	})
}

$(document).ready(function () {
    var search = new URLSearchParams(window.location.search);
    var category = search.get('category');
    var keywords = search.get('keywords');

    var fetchOptions = {
        method: 'GET',
    };

    fetchURL = '/search/?category=' + category + '&keywords=' + keywords;

    fetch(fetchURL, fetchOptions)
        .then((data) => {
            return data.json();
        })
        .then((dataJson) => {
            items = dataJson;
            loadListings();
        })
        .catch((err) => {
            console.log(err);
        });

    if (category) {
        document.getElementById('category').value = category;
    } else {
        document.getElementById('category').value = 'Any';
    }

    if (keywords) {
        document.getElementById('search-bar').value = keywords;
    } else {
        document.getElementById('search-bar').placeholder = 'Search...';
    }

    // sync price sliders
    $('#price-min').on('input', function () {
        $('#price-min-field').prop('value', $(this).prop('value') * 10);
    });

    $('#price-max').on('input', function () {
        $('#price-max-field').prop('value', $(this).prop('value') * 10);
        if ($('#price-max').prop('value') == 200) {
            $('#price-max-field').prop('value', "");
        }
    });

    $('#price-min-field').on('input', function () {
        $('#price-min').prop('value', $(this).prop('value') / 10);
    });

    $('#price-max-field').on('input', function () {
        $('#price-max').prop('value', $(this).prop('value') / 10);
    });

    // apply filters
    $('#apply-button').on('click', function () {
        filterPrice();
        $(this).prop('aria-pressed', 'false');
        $(this).blur();
    });

    // flip filter arrow on collapse
    $('#collapsable').on('show.bs.collapse', function () {
        $('.rotate').toggleClass('fa-rotate-180');
    });

    $('#collapsable').on('hide.bs.collapse', function () {
        $('.rotate').toggleClass('fa-rotate-180');
    });

    $('#sort').on('changed.bs.select', function() {
        clearResults();

        fetchURL = '/search/?category=' + category + '&keywords=' + keywords + '&sort=' + $(this).val();

        fetch(fetchURL, fetchOptions)
            .then((data) => {
                return data.json();
            })
            .then((dataJson) => {
                items = dataJson;
                loadListings();
            })
            .catch((err) => {
                console.log(err);
            });
    })
});
