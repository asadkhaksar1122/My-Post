let form = document.getElementById("signup-form");


 let email = document.getElementById("email");
 let emailp = document.getElementsByClassName("nonvalid-email")[0];
 let username = document.getElementById("username");
let userp = document.getElementsByClassName("userp")[0];
 let password= document.getElementById("password")
let passwordp = document.getElementById("passwordp")
let firstname = document.getElementById("firstname");
let firstnamep= document.getElementById("firstnamep")
let secondname=document.getElementById("secondname")
let secondnamep = document.getElementById("secondnamep")
let dateofbirth = document.getElementById("dateofbirth");
let dateofbirthp = document.getElementById("dateofbirthp");
let confirmpassword=document.getElementById("confirmpassword")
let confirmpasswordp= document.getElementById("confirmpasswordp")

console.log(dateofbirth.value)

form.addEventListener("submit", (e) => {
  let sumbitbol = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailcheck = emailRegex.test(email.value);
  if (!dateofbirth.value) {
    dateofbirth.style.outline="2px solid red"
    dateofbirthp.innerHTML = "Date of birth can't be empty";
    sumbitbol = false;
  } else {
      dateofbirth.style.outline = "none";
      dateofbirthp.innerHTML = "";
      
  }
   if (!email.value) {
     emailp.innerHTML = "Email can't be empty";
     email.style.outline = "2px solid red";
     sumbitbol = false;
   } else if (!emailcheck) {
     emailp.innerHTML = "Invalid email";
     email.style.outline="2px solid red"
     sumbitbol = false;
   } else {
     emailp.innerHTML = "";
      email.style.outline = "none";
   }
   if (!firstname.value) {
     firstnamep.innerHTML = "firstname can't be empty";
     firstname.style.outline = "2px solid red";
     sumbitbol = false;
   } else if (firstname.value.length<3) {
     firstnamep.innerHTML = "Too short first name";
     firstname.style.outline="2px solid red"
     sumbitbol = false;
   } else {
     firstnamep.innerHTML = "";
      firstname.style.outline = "none";
   }
   if (!secondname.value) {
     secondnamep.innerHTML = "second name can't be empty";
     secondname.style.outline = "2px solid red";
     sumbitbol = false;
   } else if (firstname.value.length<3) {
     secondnamep.innerHTML = "Too short second name";
     secondname.style.outline="2px solid red"
     sumbitbol = false;
   } else {
     secondnamep.innerHTML = "";
      secondname.style.outline = "none";
   }
  if (!username.value) {
    userp.innerHTML = "Username can't be empty";
     username.style.outline = "2px solid red";
    sumbitbol = false;
  } else if (username.value.length < 3) {
    userp.innerHTML = "Username must be at least 3 characters";
     username.style.outline = "2px solid red";
    sumbitbol = false;
  } else {
    userp.innerHTML = "";
     username.style.outline = "none";
    }
if (!password.value) {
  passwordp.innerHTML = "Enter the password"
  sumbitbol = false;
   password.style.outline = "2px solid red";
} else if (password.value.length < 8) {
    passwordp.innerHTML="The password should be minimum eight character long"
 password.style.outline = "2px solid red";
     sumbitbol = false;
} else {
  passwordp.innerHTML = "";
  password.style.outline = "none";
}   
if (!confirmpassword.value) {
  confirmpassword.style.outline="2px solid red"
  confirmpasswordp.innerHTML = "Confirm password can't be empty"
  sumbitbol = false;
} else if (password.value != confirmpassword.value) {
  confirmpassword.style.outline = "2px solid red"
  confirmpasswordp.innerHTML="The password does not match"
  sumbitbol = false;
} else {
   confirmpassword.style.outline = "none";
   confirmpasswordp.innerHTML = "";
}
  if (!sumbitbol) {
    e.preventDefault();
  }
});
let profile = document.getElementById("profile");
console.log(profile)
let profilepreview=document.getElementById("profilepreview")
profile.addEventListener("change", (e) => {
  if (profile.files.length) {
      file = profile.files[0];
      profilepreview.src = URL.createObjectURL(file);
  } else {
    profilepreview.src="/profile/profile.jpg"
    
  }
})
function changetype(input,eye) {
  if (input.type=="password") {
    input.type = "text";
    eye.classList.replace("fa-eye-slash","fa-eye");
  } else {
        input.type = "password";
        eye.classList.replace("fa-eye", "fa-eye-slash");
  }
}
let passwordeye = document.getElementById("passwordeye")
let confirmpasswordeye=document.getElementById("confirmpasswordeye")
passwordeye.onclick = function () {
  changetype(password, passwordeye);
};
confirmpasswordeye.onclick = function () {
  changetype(confirmpassword, confirmpasswordeye);
};