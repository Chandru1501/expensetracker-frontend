var type = document.querySelector('#type');
console.log(type.textContent);

if(type.textContent==="SignUp") {

//................................... SIGN-UP ....................................................

let username = document.querySelector('#username');
let email = document.querySelector('#email');
let btn = document.querySelector('#btn');
let password = document.querySelector('#password');
let userFound = document.querySelector('#userFound');

btn.addEventListener('click',()=>{
userFound.style.display="none";
})
function addUser(event){
    event.preventDefault();
let myObj = {
    username : username.value,
    email : email.value,
    password : password.value
}

console.log(myObj);
postUser(myObj);
}

async function postUser(myObj){
 axios.post("http://localhost:8080/user/add-user",myObj)
 .then((response)=>{
    console.log(response);
    location.replace("/Login.html");
 })
 .catch((err)=>{
  console.log(err.response.status);
  if(err.response.status==409){
     userFound.style.display="block";
  }
 })
 
}

}

else if (type.textContent==="Login"){

//........................................... LOGIN ................................................................

let userEmail = document.querySelector('#emailLogin');
let userPassword = document.querySelector('#passwordLogin');
let Loginbtn = document.querySelector('#Loginbtn');
let WrongPwd = document.querySelector('#wrongpassword');
let UserNotFound = document.querySelector('#userNotFound');

Loginbtn.addEventListener('click',()=>{
    WrongPwd.style.display="none";
    UserNotFound.style.display="none";
})

function login(event){
    event.preventDefault();
  let myLogin = {
    email : userEmail.value,
    password : userPassword.value 
  }
console.log(myLogin);
 userLogin(myLogin);
}

async function userLogin(myLogin){
axios.post('http://localhost:8080/user/login',myLogin)
.then((response)=>{
    if(response.data.status=="login Successfull"){
        location.replace('./expenses/expense.html')
    }
    // if(response.data)
})
.catch((err)=>{
    if(err.response.status==404){
        console.log("404 : true");
        UserNotFound.style.display="block";
    }
    if(err.response.status==401){
        console.log("401 : true");
        WrongPwd.style.display="block";
    }
  })
}

}