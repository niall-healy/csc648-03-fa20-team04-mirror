window.onload = function() {

	var search = new URLSearchParams(window.location.search);
	var category = search.get('category');
	var keywords = search.get('keywords');

	if(category){
	  document.getElementById('category').value = category;
	}
	else {
	  document.getElementById('category').value = 'Any';
	}

	if(keywords){
	  document.getElementById('search-bar').value = keywords;
	}
	else {
	  document.getElementById('search-bar').placeholder = "Search..."
	}
}
