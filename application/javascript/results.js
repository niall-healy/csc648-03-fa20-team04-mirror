function loadListings(dataJson) {
    var _html = '';
    var listOdd = true;
    for (listing in dataJson) {
        _html += '<a href="/listing/?id=' + dataJson[listing].id + '">';
        _html +=
            '<li class="list-group-item list-group-item-action p-2 ' +
            (listOdd ? 'list-group-item-1' : 'list-group-item-2') +
            '">';
        _html += '<div class="row no-gutters">';
        _html +=
            '<img class="thumbnail rounded" src="' +
            dataJson[listing].photoPaths[0].path +
            '">';
        _html +=
            '<div class="col-lg-5 col-md-4 col-sm-12 p-2"><h5><b>' +
            dataJson[listing].name +
            '</b></h5>';
        _html +=
            '<p class="text-secondary no-overflow">' +
            dataJson[listing].description +
            '</p></div>';
        _html +=
            '<div class="col-lg-3 col-md-5 col-sm-12 p-2"><p><b>Price: </b>$' +
            dataJson[listing].price +
            '</p><p><b>Meeting Location: </b></p><p><b>Meeting Time: </b></p></div>';
        _html +=
            '<div class="col-md col-xs-12 p-2"><button type="button" class="btn btn-primary btn-block pull-right no-overflow">Contact Seller</button></div>';
        _html += '</div>';
        _html += '</li>';
        _html += '</a>';

        if (listOdd) {
            listOdd = false;
        } else {
            listOdd = true;
        }
    }

    document.getElementById("results").innerHTML = _html;
}

$(document).ready(function () {
    var search = new URLSearchParams(window.location.search);
    var category = search.get("category");
    var keywords = search.get("keywords");

    var fetchOptions = {
        method: "GET",
    };

    fetchURL = "/search/?category=" + category + "&keywords=" + keywords;

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
        document.getElementById("category").value = category;
    } else {
        document.getElementById("category").value = "Any";
    }

    if (keywords) {
        document.getElementById("search-bar").value = keywords;
    } else {
        document.getElementById("search-bar").placeholder = "Search...";
    }
});
