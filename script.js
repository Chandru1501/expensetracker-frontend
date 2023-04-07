let username = document.querySelector('#username');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let signup = document.querySelector('#btn');
let userNotFound = document.querySelector('#userNotFound');

signup.addEventListener('click',addUser);

function addUser(){
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