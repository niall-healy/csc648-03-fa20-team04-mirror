/*
This file contains the javascript for displaying a user's info, messages, and
listings

Author: Joseph Babel
*/

let allMessages;
let allListings;

function loadMessages() {
    let _html = '';
    let isOdd = true;

    for (message in allMessages) {
        messageElements = allMessages[message].message.split('\n');
        messageHeader = messageElements[0];
        messageListing = messageElements[1];
        messageBody = messageElements[2];

        _html +=
            '<li id="' +
            allMessages[message].id +
            '" class="' +
            (isOdd ? 'list-group-item-1' : 'list-group-item-2') +
            ' p-2">';
        _html +=
            '<p class="text-dark"><b>' +

            messageHeader +
            '</b><br>' +
            '<a href="/listing/?id=' +
            allMessages[message].listing_id + '">' +
            messageListing +
            '</a></p>' +
            '<p class="text-dark">' +

            messageBody +
            '</p>' +
            '</li>';

        isOdd = !isOdd;
    }

    $('#messages').html(_html);
}

// Load the search results from the server into the html
function loadListings() {
    let _html = '';

    for (listing in allListings) {
    let isOdd = true;
    let isTextbook = allListings[listing].course != null;

        _html +=
            '<li id="' +
            allListings[listing].id +
            '" class="list-group-item list-group-item-action p-2 ' +
            (isOdd ? 'list-group-item-1' : 'list-group-item-2') +
            '">' +
            '<div class="row no-gutters">';
        _html +=
            '<div class="col-lg-10 d-flex">' +
            '<img class="thumbnail rounded" src="' +
            allListings[listing].photoPaths[0].thumbnailPath +
            '">';
        _html +=
            '<div class="p-2">' +
            '<h5><b>' +
            allListings[listing].name +
            '</b></h5>';
        _html +=
            '<p class="text-secondary no-overflow">' +
            allListings[listing].description +
            '</p></div></div>';
        _html +=
            '<div class="col p-2"><b>Price: </b>$' +
            allListings[listing].price +
            '<br><br>' +
            (isTextbook ? '<b>Course: </b>' +
            allListings[listing].course : '') +
            '</div></div></li>'

        isOdd = !isOdd;
    }

    $('#results').html(_html);
}

$(document).ready(function () {
    let userJSON = localStorage.getItem('loggedInUser');
    let fetchOptions;

    if (userJSON != null) {
        let user = JSON.parse(userJSON);

        fetchOptions = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + user.authToken,
            },
        }
    }

    fetchURL = '/message/';

    fetch(fetchURL, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJson) => {
            allMessages = dataJson;
            loadMessages()
        })

    fetchURL = '/listing/user/'

    fetch(fetchURL, fetchOptions)
    .then((response) => {
        return response.json();
    })
    .then((dataJson) => {
        allListings = dataJson;
        loadListings();
    })
});
