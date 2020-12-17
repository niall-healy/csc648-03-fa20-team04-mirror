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
