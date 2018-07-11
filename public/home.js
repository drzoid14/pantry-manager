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

function getPantry() {

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/items/",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "d662a2a3-7c1e-8ae2-0d13-263a8961671d"
        },
        "processData": false,
        "data": "{\"id\":\"5b3c21019b225b598c87e24b\",\n\t\"name\":\"chicken\",\n\"amount\": 5\t\n}"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        makeList(response);
    });

}

function deletePantry(id) {

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://localhost:8080/items/${id}`,
        "method": "DELETE",
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        getPantry();
    });

}


function searching(searchTerm) {
    //Will Put Recipe API code here (3rd party API)
    //to search for the searchterm & current pantry items 
    //
    localStorage.searchTerm = searchTerm
    window.location.assign('./search.html');
    console.log('The Search Term is ' + searchTerm);
}

function adding(added, addedNumber, measure) {
    let theList = $(`ul#pantryList li`);
    console.log(added + " from adding")
    console.log(theList.length)
    console.log(theList[0])
    let x = 1;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/items/",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "66f73029-ec0d-be31-07fc-7f9347f9e199"
        },
        "processData": false,
        "data": JSON.stringify({
            name: added,
            amount: addedNumber,
            measure: measure
        })

    }

    $.ajax(settings).done(function (response) {
        getPantry();
        console.log(response);
    });


}


function makeList(response) {
    $('#pantryList').empty();
    for (i = 0; i < response.length; i++) {
        let item = response[i].name;
        let amount = response[i].amount;
        let measure = response[i].measure;
        let id = response[i].id;

        $('#pantryList').append(`
    <li><input name="pantryItem" type="checkbox" value="${id}">${amount} ${measure} ${item}</li> 
    `)
    }

}
$('#delete').click(function(){

$("input[name=pantryItem]:checked").each((index,input)=>{
    console.log(input, index)
    console.log(input.value);
    deletePantry(input.value);
})

})

//gets search term from the search bar and runs
$('.search').submit(function (event) {
    event.preventDefault();
    console.log("hi from the searchBar");
    let searchTerm = $(`#searchBar`).val();
    searching(searchTerm);
})

$('.add').submit(function (event) {
    event.preventDefault();
    console.log("hi from the add bar");
    let added = $(`#add`).val();
    let addedNumber = $(`#addedNumber`).val();
    let measure = $('#measure').val();
    console.log(added + " from watcher")
    adding(added, addedNumber, measure);
})

$(window).on("load", getPantry());