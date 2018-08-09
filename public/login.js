'use strict'

function login(username,password){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/login",
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "67fbc76e-b14f-8457-72a6-c7631fd30d92"
        },
        "processData": false,
        "data": JSON.stringify({
            username: username,
            password: password
        })
      }
      
      $.ajax(settings).done(function (response) {
          console.log(response);
          localStorage.user=username;
        localStorage.authToken=response.authToken;
        console.log(localStorage.authToken);
        window.location.assign('./home.html');
      });
}


$('form').submit(function (event) {
    event.preventDefault();
    let username = $('#usn').val();
    let password = $('#psw').val();

    login(username, password);
})

$('.create').click(function(){
    window.location.assign('./signup.html')
})