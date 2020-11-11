// TO-DO
// drag and drop images to browser for upload
// prepare images to be sent to backend
// add additional fields depending on category (i.e. Category: books | will ask for ISBN:   ,Class:   , etc..)

// update image preview
$('#file-upload').on('change', function(e) {
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
