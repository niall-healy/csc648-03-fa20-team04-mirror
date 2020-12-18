/*
This file contains the javascript that loads newest and recently viewed listings
for the homepage.

Author: Dale Armstrong
*/

function generateCards(items, numberOfItems, title) {
    var _html = `<div class="container"> \
                <h3>` + title + `</h3> \
                <div class="card-deck">`;
    var cardNumber = 0;

    for (item in items) {
        let description = items[item].description;
        if (description.length > 100)
            description = description.substring(0, 97) + '...';

        _html += `<div class="card mb-4 box-border mx-auto" onclick="openListing(` + items[item].id + `);"> \
                        <img class="card-img-top img-fluid" src="${items[item].photoPaths[0].thumbnailPath}"> \
                        <div class="card-body d-flex flex-column"> \
                            <p class="card-title">${items[item].name}</p> \
                            <p class="card-text">` + description + ` - $${items[item].price}</p>`;

	if(items[item].course) {
	    _html += `<p id="card-course" class="card-text">Course: ${items[item].course}</p>`;
	} else {
	    _html += `<p class="card-text" style="opacity: 0">Empty space</p>`;
	}


        _html += `<button type="button" data-toggle="modal" data-target="#modal" onclick="event.stopPropagation(); openContactModal('` + items[item].name + `', ` +  items[item].id + `);" \ 
	          class="btn btn-primary btn-block no-overflow mt-1 sticky-bottom">Contact Seller</button> \
                        </div> \
                    </div>`;

        cardNumber += 1;
        if (cardNumber % 2 == 0) {
            _html += `<div class="w-100 d-none d-sm-block d-md-none"></div>`
        }
        if (cardNumber % 3 == 0) {
            _html += `<div class="w-100 d-none d-md-block d-lg-none"></div>`
        }
        if (cardNumber % 4 == 0) {
            _html += `<div class="w-100 d-none d-lg-block d-xl-none"></div>`
        }
        if (cardNumber >= numberOfItems)
            break;
    }
    _html += `</div></div>`;

    return _html;
}

function openListing(id) {
    location.href = '/listing/?id=' + id;
}

function loadRecent(items, numberOfItems) {
    var _html = generateCards(items, numberOfItems, 'Recently Viewed');
    $('#recently-viewed').html(_html);
}

function loadNewest(items, numberOfItems) {
    var _html = generateCards(items, numberOfItems, 'Newest Listings');
    $('#newest-listings').html(_html);
}

function noPostings() {
    var _html = `<div class="container text-center"> \
                    <h2>No Postings Found...</h2> \
                </div>`;
    $('#newest-listings').html(_html);
}

function openContactModal(name, id) {

    user = JSON.parse(localStorage.getItem('loggedInUser'));

    // If user is not logged in, redirect to login page
    if (!user) {
        window.location.assign('/html/login-register.html');
        return;
    }

    $('#modal').modal();

    modal = document.getElementById('contact-text');

    // Add listing id to be used by sendMessage
    $('#modal').data('id', id);

    $('#from-text').html('From: ' + user.email);
    $('#listing-text').html('Listing: ' + name);
    $('#contact-text').val('');
}

function sendMessage() {
    $('#modal').modal('toggle');

    var message = "";
    message += $('#from-text').html() + '\n';
    message += $('#listing-text').html() + '\n';

    message += $('#contact-text').val();

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
            if (response.ok) {
                alert('Message sent!');
            } else {
                alert('Message failed to send.');
            }
        })
}

$(document).ready(function () {
    var numRecent = 5;
    var numNewest = 5;


    if (localStorage.hasOwnProperty('recentlyVisited')) {
        var recentlyVisited = JSON.parse(localStorage.getItem('recentlyVisited'));

        // Get recently viewed items
        var fetchURL = '/items/?numItems=' + numRecent;

        for (var i = 0; i < recentlyVisited.length; i++) {
            fetchURL += '&ids=' + recentlyVisited[i];
        }

        fetch(fetchURL)
            .then((data) => {
                return data.json();
            })
            .then((dataJson) => {
                if (dataJson.length > 0) {
                    loadRecent(dataJson, numRecent);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Get newest items
    fetchURL = '/newest/' + numNewest;
    fetch(fetchURL)
        .then((data) => {
            return data.json();
        })
        .then((dataJson) => {
            console.log(dataJson.length);
            if (dataJson.length > 0) {
                loadNewest(dataJson, numNewest);
            } else {
                noPostings();
            }
        })
        .catch((err) => {
            console.log(err);
        });

});
