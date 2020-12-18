/*
This file contains the javascript for displaying a user's info, messages, and
listings

Author: Joseph Babel
*/

let allMessages;

function loadMessages() {
    let _html = '';
    let isOdd = true;

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

    $('#messages').html(_html);
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
});
