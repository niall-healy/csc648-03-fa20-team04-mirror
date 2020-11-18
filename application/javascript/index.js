function generateCards(items, numberOfItems, title) {
    var _html = `<div class="container"> \
                <h3>` + title + `</h3> \
                <div class="card-deck">`;
    let cardNumber = 0;

    for (item in items) {
        let description = items[item].description;
        if (description.length > 100)
            description = description.substring(0, 97) + '...';

        _html += `<a class="card mb-4 box-border mx-auto" href="/listing/?id=${items[item].id}"> \
                        <img class="card-img-top img-fluid" src="${items[item].photoPaths[0].thumbnailPath}" alt="item image"> \
                        <div class="card-body d-flex flex-column"> \
                            <p class="card-title">${items[item].name}</p> \
                            <p class="card-text">` + description + ` - $${items[item].price}</p> \
                            <p class="card-text mt-auto"><small class="text-muted">${items[item].timestamp}</small></p> \
                        </div> \
                    </a>`;

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

$(document).ready(function () {
    if (localStorage.hasOwnProperty('recentlyVisited')) {
        var recentlyVisited = JSON.parse(localStorage.getItem('recentlyVisited'));

        var fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                'recentlyVisited': recentlyVisited
            })
        };

        // Get recently viewed items
        var numRecent = 5;
        var fetchURL = '/items/?numItems=' + numRecent;

        fetch(fetchURL, fetchOptions)
            .then((data) => {
                return data.json();
            })
            .then((dataJson) => {
                if (Object.keys(dataJson).length > 0)
                    loadRecent(dataJson, numRecent);
            })
            .catch((err) => {
                console.log(err);
            });

        // Get newest items
        var numNewest = 10;
        fetchURL = '/newest/?numItems=' + numNewest;
        fetch(fetchURL)
            .then((data) => {
                return data.json();
            })
            .then((dataJson) => {
                if (Object.keys(dataJson).length > 0)
                    loadNewest(dataJson, numNewest);
                else
                    noPostings();
            })
            .catch((err) => {
                console.log(err);
            });
    }
});