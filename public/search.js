console.log(localStorage.searchTerm);
$('.searchResults').html(`
<p>${localStorage.searchTerm}</p>
`);

let cuisine = localStorage.cuisine;
let searchTerm = localStorage.searchTerm

function renderResults(response) {
    let results = response.results;

    for (i = 0; i < results.length; i++) {
        let html = results[i].image.split('.').slice(0, -1).join('.')
        console.log(html)
        $('.searchResults').append(
            `<div class="result">
                <div class="title">
                   <a href="https://spoonacular.com/recipes/${html}" target="_blank">${results[i].title}</b>
                </div>
                <img class="image" src="https://spoonacular.com/recipeImages/${results[i].image}" alt="Food">   
            </div>    
            `
        )
    }
}

function searching(searchTerm, cuisine) {
    console.log(searchTerm,cuisine);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=${searchTerm}&cuisine=${cuisine}`,
        "method": "GET",
        "headers": {
            "x-mashape-key": "EehXJ0iPBnmshdMyiJI0de1hhibTp18MKSyjsnFq4rxv3AQUHH",
            "accept": "application/json",
            "cache-control": "no-cache",
            "postman-token": "ad5687e4-3c6d-a132-7e1b-67c63c0ff6d5"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        renderResults(response);
    });

}

$(window).on("load", searching(searchTerm, cuisine));