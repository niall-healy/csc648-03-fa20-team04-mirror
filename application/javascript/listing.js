function loadListing(listing){
   var elements = document.getElementsByClassName('listing-name');
   Array.from(elements).forEach(element => element.innerHTML += listing.name);

   document.getElementById('listing-description').innerHTML += listing.description;
   document.getElementById('listing-price').innerHTML += '$' + listing.price;

   var carousel = document.getElementById('carousel-inner');
   var indicators = document.getElementById('carousel-indicators');

   photos = listing.photoPaths;

   for(var i = 0; i < photos.length; i++){
      var div;
      div = document.createElement('div');
      div.id = 'img-' + i;

      if(i == 0){
	 div.className = 'carousel-item active';
	 carousel.appendChild(div);

         indicators.innerHTML += '<li data-target="#carousel" data-slide-to="' + i + '"" class="active"></li>';
      } else {
	 div.className = 'carousel-item';
         carousel.appendChild(div);

         indicators.innerHTML += '<li data-target="#carousel" data-slide-to="' + i + '""></li>';
      }
      
      var img = document.createElement('img');
      img.className = "img-thumbnail img-fluid";
      img.src = photos[i].path;

      document.getElementById('img-' + i).appendChild(img);
   }
   $('#carousel').carousel();
}

window.onload = function() {
   var search = new URLSearchParams(window.location.search);
   var id = search.get('id');

   var fetchOptions = {
      method: 'GET'
   }

   fetchURL="/listing/getListing/?id=" + id

   fetch(fetchURL, fetchOptions)
   .then((data) => {
      return data.json();
   })
   .then((dataJson) => { 
      loadListing(dataJson); 
   })
   .catch((err) => {
      console.log(err);
   })
}
