var amount = document.querySelector("#amount");
var description = document.querySelector("#descriptioninput");
var category = document.querySelector("#categoryinput");

let list = document.querySelector("#items");

var descriptionChoose = document.querySelector("#description");
var categoryChoose = document.querySelector("#category");

const addexpense = document.getElementById("submiting");

descriptionChoose.addEventListener("change",() =>{
var descriptionval = descriptionChoose.options[descriptionChoose.selectedIndex].textContent;
description.value=descriptionval;
})

categoryChoose.addEventListener("change",() =>{
  var categoryval = categoryChoose.options[categoryChoose.selectedIndex].textContent;
  category.value= categoryval;
})

var username = document.querySelector('name');
username.textContent = localStorage.getItem('username');


function additem(event){
  event.preventDefault();
myObj = {
    amount: amount.value,
    description: description.value,
    category: category.value,
}
  postexpense(myObj);
  setTimeout(()=>{
    location.replace('./expense-table.html');
  },600)
}


async function postexpense(myObj){
  try{
    let token = localStorage.getItem('token');
    console.log(token);
  let response = await axios.post('http://localhost:8080/user/add-expense',myObj,{ headers : {"authorization" : token } })
  console.log("posted");
  }
  catch(err){
    console.log(err);
  }
}
