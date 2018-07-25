console.log(localStorage.searchTerm);
$('.searchResults').html(`
<p>${localStorage.searchTerm}</p>
`);

let page = 0;

let cuisine = localStorage.cuisine;
let searchTerm = localStorage.searchTerm


function getSummary(id){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/summary`,
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
        $(`#${id}`).after(
            `<p class='summary'>${response.summary}</p>`
        )
    });
    
}

function renderResults(response) {
    let results = response.results;
    if(page>0) {
        $('.prev').show();
    } else {
        $('.prev').hide();
    }

    if (results.length == 0) {
        $('.next').hide();
        $('.searchResults').html(
            `<h3>We are sorry, there are no more search results. Please try a new search</h3>`
        );

    }
    else {
        $('.next').show();
    }

    for (i = 0; i < results.length; i++) {
        let html = results[i].image.split('.').slice(0, -1).join('.')
        console.log(html)
        getSummary(results[i].id);
        $('.searchResults').append(
            `<div class="result" id='${results[i].id}'>
                <div class="title">
                   <a href="https://spoonacular.com/recipes/${html}" target="_blank">${results[i].title}</b>
                </div>
                <img class="image" src="https://spoonacular.com/recipeImages/${results[i].image}" alt="Food">   
            </div>    
            `
        )
        
    }
}

function searching(searchTerm, cuisine, offset) {
    console.log(searchTerm, cuisine);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=${searchTerm}&cuisine=${cuisine}&offset=${offset}`,
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

$('.prev').click(function () {
    $('.searchResults').empty()
    page = page - 10;
    searching(searchTerm, cuisine, page);

})

$('.next').click(function () {
    $('.searchResults').empty()
    page = page + 10;
    searching(searchTerm, cuisine, page);
})

$('#home').click(function () {
    window.location.assign('./home.html');
})

$('#logout').click(function () {
    console.log('Signing Out');
    localStorage.clear();
    window.location.assign('./login.html');
})

$(window).on("load", searching(searchTerm, cuisine, 0));