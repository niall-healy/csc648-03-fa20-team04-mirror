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

    if (allMessages.length != 0) {
        for (message in allMessages) {
            let messageElements = allMessages[message].message.split('\n');
            let messageHeader = messageElements[0];
            let messageListing = messageElements[1];
            let messageBody = messageElements[2];
            let messageDate = new Date(allMessages[message].timestamp);
    
            _html +=
                '<li id="' +
                allMessages[message].id +
                '" class="' +
                (isOdd ? 'list-group-item-1' : 'list-group-item-2') +
                ' p-2 d-flex justify-content-between">';
            _html +=
                '<div><div class="d-flex"><p class="text-dark"><b>' +
                messageHeader +
                '</b><br>' +
                messageListing +
                '</div><div class="text-secondary">Date: ' +
                messageDate +
                '</p><br></div>' +
                '<p class="text-dark">' +
                messageBody +
                '</p></div>' +
                '<button onclick="location.href=\'/listing/?id=' +
                allMessages[message].listing_id +
                '\'" type="button" class="btn btn-primary">View Listing</button>'
                '</li>';
    
            isOdd = !isOdd;
        }
    } else {
        _html = '<h5>No messages found...</h5>'
    }


    $('#messages').html(_html);
}

// Load the search results from the server into the html
function loadListings() {
    let _html = '';
    let isOdd = true;

    if (allListings.length != 0) {
        for (listing in allListings) {
            let isTextbook = allListings[listing].course != null;
            let isApproved = allListings[listing].isApproved;

            _html +=
                '<li onclick="location.href=\'/listing/?id=' +
                allListings[listing].id +
                '\'" class="list-group-item list-group-item-action p-2 ' +
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
                '<br><br>' +
                (isApproved ? '<b>Approved: </b>Yes' : '<b>Approved: </b>No') +
                '</div></div></li>';
    
            isOdd = !isOdd;
        }
    } else {
        _html = '<h5>No listings found...</h5>'
    }



    $('#listings').html(_html);
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
