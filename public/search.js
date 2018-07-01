console.log(localStorage.searchTerm);
$('.searchResults').html(`
<p>${localStorage.searchTerm}</p>
`);