var amount = document.querySelector("#amount");
var description = document.querySelector("#descriptioninput")
var category = document.querySelector("#categoryinput")
var totalAmount = document.querySelector('amount');
totalAmount.textContent = Number(0);

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


addexpense.addEventListener("click",additem)
addexpense.addEventListener("click",()=>{
  setTimeout(()=>{
    location.reload();
  },600);
})


window.addEventListener("DOMContentLoaded",showOnscreen)

function additem(e){
    e.preventDefault();
myObj = {
    amount: amount.value,
    description: description.value,
    category: category.value,
}
  postexpense(myObj);
}

function displayitems(myObj) {

totalAmount.textContent= Number(totalAmount.textContent) + Number(myObj.amount);
var mydata ={
  amount : myObj.amount,
  description : myObj.description,
  category : myObj.category
}

var tr = document.createElement('tr');

for(item in mydata){
var td = document.createElement('td');
td.textContent = mydata[item];
tr.appendChild(td);
}

var deleteBtn = document.createElement('button');
var editbtn = document.createElement("button");

deleteBtn.className="btn btn-danger delete";
editbtn.className="btn btn-success edit";

deleteBtn.appendChild(document.createTextNode("Delete"));
editbtn.appendChild(document.createTextNode("Edit"));
tr.appendChild(deleteBtn);
tr.appendChild(editbtn);

list.appendChild(tr);

deleteBtn.onclick=() =>{
    if(confirm('Are You Sure can we delete that item ? ')){
      list.removeChild(tr);
      deleteExpense(myObj.id);
    }
  }
  deleteBtn.addEventListener("click",()=>{
    setTimeout(()=>{
      location.reload();
    },600);
  })

editbtn.onclick =() => {

}

}

async function showOnscreen(){
  let data = await getAllExpenses();
  if(data.length>0){
    list.style.visibility= "visible";
  }
  data.forEach(expense => {
    displayitems(expense);
  });
}

async function postexpense(myObj){
  try{
  let response = await axios.post('http://localhost:8080/user/add-expense',myObj)
  console.log("posted");
  }
  catch(err){
    console.log(err);
  }
}

async function getAllExpenses(){
  try{
  let response = await axios.get('http://localhost:8080/user/get-expenses');
  console.log(response.data);
  return response.data;
  }
  catch(err){
    console.log(err);
  }
}

async function deleteExpense(id){
  try{
  let response = await axios.post(`http://localhost:8080/user/delete-expense/${id}`);
  console.log(`${id} deleted`);
  }
  catch(err){
    console.log(err);
  }
}

