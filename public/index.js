function login() {
    //Upon successful login from middleware, will 
    //redirect to homepage

}

function searching(searchTerm) {
    //Will Put Recipe API code here (3rd party API)
    //to search for the searchterm & current pantry items 
    //
    localStorage.searchTerm = searchTerm
    window.location.assign('./search.html');
    console.log('The Search Term is '+searchTerm);
  

}


//gets search term from the search bar and runs
$('form').submit(function(event){
    event.preventDefault();
    console.log("hi from the searchBar");   
    let searchTerm = $(`#searchBar`).val();
    searching(searchTerm);
})