function login() {
    //Upon successful login from middleware, will 
    //redirect to homepage

}
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=chicken%2Crice%2Cbean&cuisine=cuban",
    "method": "GET",
    "headers": {
      "x-mashape-key": "EehXJ0iPBnmshdMyiJI0de1hhibTp18MKSyjsnFq4rxv3AQUHH",
      "accept": "application/json",
      "cache-control": "no-cache",
      "postman-token": "bc8f0baa-ac0f-f542-8348-8f1e65e6ecf8"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

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