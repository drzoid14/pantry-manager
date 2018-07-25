$('form').submit(function(event){
    event.preventDefault();
    let username=$('#username').val();
    let password=$('#psw').val();
    let firstName=$('#firstName').val();
    console.log(username, password, firstName)

    signUp(username,password,firstName);
});

$('#member').click(function(){
    console.log('You already exist...neat');
    window.location.assign('./login.html');
})

function signUp(username,password,firstName){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/pantry/users",
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "9c8e8789-d771-90ac-ca2f-47b3116a9539"
        },
        "processData": false,
        "data": JSON.stringify({
            username: username,
            password: password,
            firstName: firstName
        })
    }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        localStorage.authToken=response.authToken ;
        window.location.assign('./login.html');
         });
}