// Load the search results from the server into the html
function loadListings(dataJson) {
    var _html = '';
    var listOdd = true;
    for (listing in dataJson) {
        _html +=
            '<li onclick="location.href=\'/listing/?id=' +
            dataJson[listing].id +
            '\'" class="list-group-item list-group-item-action p-2 ' +
            (listOdd ? 'list-group-item-1' : 'list-group-item-2') +
            '">' +
            '<div class="row no-gutters">';
        _html +=
            '<div class="col-lg-7 d-flex">' +
            '<img class="thumbnail rounded" src="' +
            dataJson[listing].photoPaths[0].thumbnailPath +
            '">';
        _html +=
            '<div class="p-2">' +
            '<h5><b>' +
            dataJson[listing].name +
            '</b></h5>';
        _html +=
            '<p class="text-secondary no-overflow">' +
            dataJson[listing].description +
            '</p></div></div>';
        _html +=
            '<div class="col p-2"><p><b>Price: </b>$' +
            dataJson[listing].price +
            '</div>';
        _html +=
            '<div class="col-sm-12 col-md p-2">' +
            '<button type="button" class="btn btn-primary btn-block pull-right no-overflow" onclick="event.stopPropagation()">Contact Seller</button>';
        _html += '</div></div></li>';

        if (listOdd) {
            listOdd = false;
        } else {
            listOdd = true;
        }
    }

    document.getElementById('results').innerHTML = _html;
}

// Send get request with the search parameters
$(document).ready(function() {
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
            console.log(dataJson);
            loadListings(dataJson);
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
});
