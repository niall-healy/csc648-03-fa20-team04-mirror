// Load response from server into html
function loadListing(listing) {
    document.getElementById('listing-name').innerHTML += listing.name;
    document.getElementById('listing-description').innerHTML += listing.description;
    document.getElementById('listing-price').innerHTML += '$' + listing.price;

    var carousel = document.getElementById('carousel-inner');
    var indicators = document.getElementById('carousel-indicators');

    photos = listing.photoPaths;

    // Load each photo, and with each photo create a new indicator
    for (var i = 0; i < photos.length; i++) {
        var div;
        div = document.createElement('div');
        div.id = 'img-' + i;

        if (i == 0) {
            div.className = 'carousel-item active';
            carousel.appendChild(div);

            indicators.innerHTML += '<li data-target="#carousel" data-slide-to="' + i + '" class="active"></li>';
        } else {
            div.className = 'carousel-item';
            carousel.appendChild(div);

            indicators.innerHTML += '<li data-target="#carousel" data-slide-to="' + i + '"></li>';
        }

        var img = document.createElement('img');
        img.className = "img-fluid";
        img.src = photos[i].path;

        document.getElementById('img-' + i).appendChild(img);
    }
    $('#carousel').carousel();
}

function setModalInfo(listing) {
    modal = document.getElementById('contact-text');
    user = JSON.parse(localStorage.getItem('loggedInUser'));

    modal.value = "";
    modal.value += 'From: ' + user.email + '\n';
    modal.value += 'Subject: ' + listing.name + '\n';
    modal.value += '----------------------------------------------------------------------------';

    // TODO: Set cursor position of textarea and make From and Subject lines read-only
}

//function to store last 10 recent listings visited
function storeRecentListingId(id) {
    var recentlyVisited = null
    if (localStorage.hasOwnProperty('recentlyVisited')) {
        recentlyVisited = JSON.parse(localStorage.getItem('recentlyVisited'));
        if (recentlyVisited.includes(id))
            return

        if(recentlyVisited.length == 10) {
            recentlyVisited.shift(); 
        }

        recentlyVisited.push(id);
    } else {
        recentlyVisited = [id];
    }

    localStorage.setItem('recentlyVisited', JSON.stringify(recentlyVisited));
}

// Send get request for listing on page load
$(document).ready(function () {
    var search = new URLSearchParams(window.location.search);
    var id = parseInt(search.get('id'));

    var fetchOptions = {
        method: 'GET'
    }

    fetchURL = "/listing/getListing/?id=" + id

    // Listing information fetch call
    fetch(fetchURL, fetchOptions)
        .then((data) => {
            return data.json();
        })
        .then((dataJson) => {
            storeRecentListingId(id);
            loadListing(dataJson);
            setModalInfo(dataJson);
        })
        .catch((err) => {
            console.log(err);
        })
});
