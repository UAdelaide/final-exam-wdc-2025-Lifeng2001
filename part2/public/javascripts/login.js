function login(){

    let user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            const response = JSON.parse(this.responseText);
            alert("Welcome "+response.user.username);
            if(response.user.role ==='owner') {
                window.location.href = '/owner-dashboard.html';
            } else if (response.user.role ==='walker'){
                window.location.href = '/walker-dashboard.html';

            }
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login failed");
        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/api/users/login", true);
    xmlhttp.withCredentials = true;// 
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));

}