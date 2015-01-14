var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
	eventMove = isMobile ? 'touchmove' : 'scroll',
	onEventClick = isMobile ? 'ontouchend' : 'onclick';

var searchForm = document.getElementById('search-form'),
	searchInput = searchForm.querySelector('.search-input'),
	searchButton = searchForm.querySelector('.search-button');

searchButton[onEventClick] = showSearchInput;
searchInput[onEventClick] = function(e) {
	e.stopPropagation();
}

function showSearchInput(e) {
	// show input
	searchForm.classList.add('active');
	searchInput.focus();
	
	registerEvents();

	e.stopPropagation();
}
function registerEvents() {
	// register events to hide search input
	!isMobile && document.addEventListener("click", hideSearchInput);
	document.addEventListener(eventMove, hideSearchInput);
	// register events to search
	searchButton[onEventClick] = clickToSearch;
	document.addEventListener('keydown', keydownToSearch);
}
function unregisterEvents() {
	// unregister events those used to hide search input
	!isMobile && document.removeEventListener("click", hideSearchInput);
	document.removeEventListener(eventMove, hideSearchInput);
	// unregister events those used to search
	searchButton[onEventClick] = showSearchInput;
	document.removeEventListener('keydown', keydownToSearch);
}
function hideSearchInput(e) {
	// hide input
	searchInput.blur();
	searchForm.classList.remove('active');

	unregisterEvents();
	
	e.stopPropagation();
}

function clickToSearch(e) {
	search();

	e.stopPropagation();
}
function keydownToSearch(e) {
	if (e.which == "13") {
		search();
	}
}
function search() {
	var value = searchInput.value.trim(),
		searchEngine;

	if(value){
		// google
		// searchEngine =  'https://www.google.com/search?q=';
		// baidu
		searchEngine =  'http://www.baidu.com/s?wd=';

		location.href = searchEngine + searchInput.value + ' site: dragonwong.github.io';
	}
}