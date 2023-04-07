var type = document.querySelector('#type');
console.log(type.textContent);

if(type.textContent==="SignUp") {

//................................... SIGN-UP ....................................................

let username = document.querySelector('#username');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let signup = document.querySelector('#btn');
let userNotFound = document.querySelector('#userNotFound');

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
 let response = await axios.post("http://localhost:8080/admin/add-user",myObj);
 console.log(response.data.duplicate===true);
 if(response.data.duplicate===true){
    userNotFound.style.display="block";
 }
 else{
    location.replace("/Login.html")
 }
}

}

else if (type.textContent==="Login"){

//........................................... LOGIN ................................................................

let userEmail = document.querySelector('#emailLogin');
let userPassword = document.querySelector('#passwordLogin');


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
    let response = await axios.post('http://localhost:8080/admin/login',myLogin);
    console.log(response);
}
}