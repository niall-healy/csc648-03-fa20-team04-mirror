function loadListing(listing){
   document.getElementById('name-price').innerHTML =listing.name + " - $" + listing.price; 
   document.getElementById('description').innerHTML = listing.description;

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
      img.className = "d-block w-25 mx-auto round";
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

   fetchURL="/searchId/?id=" + id

   fetch(fetchURL, fetchOptions)
   .then((data) => {
      return data.json();
   })
   .then((dataJson) => { 
      loadListing(dataJson[0]); 
   })
   .catch((err) => {
      console.log(err);
   })
}
