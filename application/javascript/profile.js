$(document).ready(function(){
   let userJSON = localStorage.getItem('loggedInUser');
   
   if (userJSON != null) {
      let user = JSON.parse(userJSON);
      
      var fetchOptions = {
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
	 console.log(dataJson);
      })
});

