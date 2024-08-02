let username = document.getElementById("username");
let password= document.getElementById("password")
let form = document.getElementById("loginform")
let usernamep = document.getElementById('usernamep')
let passwordp = document.getElementById("passwordp");
form.addEventListener("submit", function (e) { 
    let sumbitbol = true;
    if (!username.value) {
        usernamep.innerHTML="Please enter something"
        username.style.outline = "2px solid red"
        sumbitbol = false;
    }else if (username.value.length<3) {
       usernamep.innerHTML = "Username is too short";
       username.style.outline = "2px solid red";
       sumbitbol = false;   
    } else {
        usernamep.innerHTML = "";
        username.style.outline = "none";
    }
    if (!password.value) {
        password.style.outline='2px solid red'
        passwordp.innerHTML = "Enter something"
        sumbitbol = false;
    }else if (password.value.length<8) {
          password.style.outline = "2px solid red";
          passwordp.innerHTML = "password is too short ";
          sumbitbol = false;   
    } else {
             password.style.outline = "none";
             passwordp.innerHTML = "";
           
    }
    if (!sumbitbol) {
        e.preventDefault();
    }
})