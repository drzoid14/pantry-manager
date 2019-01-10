console.log(localStorage.searchTerm);

let page = 0;

let cuisine = localStorage.cuisine;
let searchTerm = localStorage.searchTerm


function getSummary(id) {
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
        let myString = response.summary.replace(/<(?:.|\n)*?>/gm, '');
        if (myString.length > 350) {
            myString2 = myString.substring(350, myString.length);
            myString = myString.substring(0, 350) + '...';

        }
        console.log(myString2);
        $(`#${id}`).append(
            `<p class='summary'>${myString}</p>`
        );
        $(`#${id}2`).append(
            `<p class='summary'>${myString2}</p>`
        );
    });

}

function renderResults(response) {
    let results = response.results;
    if (page > 0) {
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
console.log(results)
    for (i = 0; i < results.length; i++) {
        let html = results[i].image.split('.').slice(0, -1).join('.')
        console.log('THE HTML IS',html)
        getSummary(results[i].id);
        $('.searchResults').append(
            `
    <div class="card" style="margin-left:10%; margin-bottom:40px;">
        <div class="card-image" 
                style="background-image:url(https://spoonacular.com/recipeImages/${results[i].image}); 
                display:inline-block; width:35%; background-size:cover; margin:0;">
                    <span class="card-image-title activator grey-text text-darken-4">
                    <h3>${results[i].title}</h3>


                       <!--- <a href="https://spoonacular.com/recipes/${html}" target="_blank">${results[i].title}</a> ---!>


                    </span>
        </div>
        <div class="card-content" style="display:inline-block; width:60%; height:100%;">
            <span class="card-title activator grey-text text-darken-4">${results[i].title}<i class="open material-icons right">more_vert</i></span>
            <p class='sum' id="${results[i].id}" style="overflow:hidden; max-height:85%;"></p>
            <p>
            <!--- <a href="https://spoonacular.com/recipes/${html}" target="_blank"> Try This Recipe</a> ---!>
            
            </p>
        </div>
        <div class="faders fadeInUp">
            <span class="card-title grey-text text-darken-4">${results[i].title}<i class="material-icons right close">close</i></span>
            <p id="${results[i].id}2"></p>
        </div>
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

$(`body`).on('click','.close', event=> {
    $(event.target).closest('.faders').removeClass('animated').removeClass('fadeInUp').addClass('fadeOutDown').addClass('animated').css('display','none');
    $(event.target).parent().parent().parent().find('.card-content').show();

})

$(`body`).on('click','.open',event=>{
    $(event.target).parent().parent().parent().find('.faders').removeClass('animated').removeClass('fadeOutDown').css('display','block').addClass('fadeInUp').addClass('animated');
    $(event.target).parent().parent().parent().find('.card-content').hide();
    console.log('open is listening');
})
$(window).on("load", searching(searchTerm, cuisine, 0));