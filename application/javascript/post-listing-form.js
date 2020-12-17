// TO-DO
// drag and drop images to browser for upload
// prepare images to be sent to backend
// add additional fields depending on category (i.e. Category: books | will ask for ISBN:   ,Class:   , etc..)

// Add event listener for submit listing button
window.onload = function () {
    let postListingButton = document.getElementById('submit-button');

    postListingButton.addEventListener('click', (e) => {
        e.preventDefault();
        submitListing();
    });

    $('#form-category').change(function(){
	let categoryDropdown = document.getElementById('form-category');
        if(categoryDropdown.value == 'Textbooks'){
	    $('#class-label').removeClass('input-hidden');
	    $('#class-field').removeClass('input-hidden');
	    //$('#class-field').css("display", "block");
	    //$('#class-field').attr("type", "text");
	    $('#class-field').prop("required", "true");
        }
	else {
	    $('#class-label').addClass('input-hidden');
	    $('#class-field').addClass('input-hidden');
	    //$('#class-field').css("display", "none");
	    //$('#class-field').attr("type", "hidden");
	    $('#class-field').removeAttr('required');
	}
    })
}

// Send the post request with the listing info
async function submitListing() {
    let form = document.getElementById('post-listing-form');
    let userJSON = localStorage.getItem('loggedInUser');

    if (userJSON != null && form.reportValidity()) {
        let user = JSON.parse(userJSON);

        var fetchOptions = {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + user.authToken,
            },
            body: new FormData(form)
        }

        var fetchURL = '/listing/';

        fetch(fetchURL, fetchOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status)
                } else {
                    return response.json();
                }
            })
            .then((dataJson) => {
                window.location.href = '/listing/?id=' + dataJson.id;
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

// Update image preview
$('#file-upload').on('change', function (e) {
    var fileCount = $(this)[0].files.length;
    var imagePreview = $('#image-preview');

    imagePreview.empty();

    for (var i = 0; i < fileCount; i++) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('<img>', {
                'src': e.target.result,
                'class': 'thumbnail'
            }).appendTo(imagePreview);
        }
        imagePreview.show()
        reader.readAsDataURL($(this)[0].files[i]);
    }
});
