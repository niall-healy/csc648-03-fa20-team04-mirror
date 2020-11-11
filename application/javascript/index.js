window.onload = function() {
	var localStorageCategories = localStorage.getItem('categories');
	if (localStorageCategories == null) {
		getCategoriesFromServer();
	}
	else {
		renderCategoryDropdown(JSON.parse(localStorageCategories));
	}

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

function getCategoriesFromServer() {
	fetch('/categories/')
		.then((data) => {
			return data.json();
		})
		.then((dataJson) => {
			console.log(dataJson);
			storeAndRenderCategories(dataJson);
		})
		.catch((err) => {
			console.log(err);
		});
}

function storeAndRenderCategories(categories) {
	var dropdown = document.getElementById('category');
    var categoriesToStore = [];
	var _html = '';
    for (i = 0; i < categories.length; i++) {
            categoriesToStore.push(categories[i].category);
			_html += '<option value="' + categories[i].category + '">' + categories[i].category + '</option>';
    }

    localStorage.setItem('categories', JSON.stringify(categoriesToStore));
	dropdown.innerHTML = _html;
}

function renderCategoryDropdown(categories) {
	var dropdown = document.getElementById('category');
	var _html = '';
	for (i = 0; i < categories.length; i++) {
		_html += '<option value="' + categories[i] + '">' + categories[i] + '</option>';
	}
	dropdown.innerHTML = _html;
}
