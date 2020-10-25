window.onload = function() {
   function search(){
      let text = document.getElementById("search-bar").value;
      text = text.replace(" ", "%20");

      let category = document.getElementById("category").value;

      var fetchOptions = {
		method: "GET",
      };

      let fetchURL = '/search/?category=' + category  + "&keywords=" + text;
      fetch(fetchURL, fetchOptions)
      .then((data) => {
        return data.json() 
      })
      .then((jsonData) => {
         localStorage.setItem('results', JSON.stringify(jsonData));
         window.location.href= "http://ec2-18-144-21-168.us-west-1.compute.amazonaws.com/html/results.html";
      })
      .catch((err) => {
       	 console.log(err);
      })
   }

   var searchButton = document.getElementById("search-button");
   var resultField = document.getElementById("result");

   if(searchButton) {
      searchButton.addEventListener('click', search);
   }
   else if(resultField) {
      console.log("HEY");
      var results = JSON.parse(localStorage.getItem('results')); 
      var html = "";
   
      results.forEach((result) => {
         html += "<img src='" + result['photo'] + "'/>";
         html += "<p><b>Item Name: </b> " + result['name'] + "</p>\n";
         html += "<p><b>Description: </b> " + result['description'] + "</p>\n";
         html += "<p><b>Price: </b> " + result['price'] + "</p>\n";
         html += "<br>\n";
      });

      resultField.innerHTML = html;
   }
}
