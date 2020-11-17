// Load the search results from the server into the html
function loadListings(dataJson) {
    let _html = '';
    let isOdd = true;
    for (listing in dataJson) {
        _html +=
            '<li onclick="location.href=\'/listing/?id=' +
            dataJson[listing].id +
            '\'" class="list-group-item list-group-item-action p-2 ' +
            (isOdd ? 'list-group-item-1' : 'list-group-item-2') +
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
            '<div class="col d-flex p-2"><b>Price: </b>$' +
            '<div class="price">' +
            dataJson[listing].price +
            '</div></div>';
        _html +=
            '<div class="col-sm-12 col-md p-2">' +
            '<button type="button" class="btn btn-primary btn-block pull-right no-overflow" onclick="event.stopPropagation()">Contact Seller</button>';
        _html += '</div></div></li>';

        isOdd = !isOdd;
    }

    $('#results').html(_html);
    displayResults();
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

// Send get request with the search parameters
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

    // sync price sliders
    $('#price-min').on('input', function () {
        $('#price-min-field').prop('value', $(this).prop('value') * 10);
    });

    $('#price-max').on('input', function () {
        $('#price-max-field').prop('value', $(this).prop('value') * 10);
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
});