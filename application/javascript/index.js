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
         window.location.href= "http://ec2-3-21-104-38.us-east-2.compute.amazonaws.com/html/results.html";
      })
      .catch((err) => {
       	 console.log(err);
      })
   }

   document.getElementById("search-button").addEventListener('click', search);
   var resultField = document.getElementById("results");
   
   if(resultField) {
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
