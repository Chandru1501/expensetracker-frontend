var totalAmount = document.querySelector('amount');
totalAmount.textContent = Number(0);
var Username = document.querySelector('name');

let list = document.querySelector("#items");

window.addEventListener("DOMContentLoaded",showOnscreen)
var username = document.querySelector('name');
username.textContent = localStorage.getItem('username');

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
  data.forEach(expense => {
   displayitems(expense);
    console.log(expense)
  });
  console.log(data);
}

async function getAllExpenses(){
  try{
    let token = localStorage.getItem("token");
    console.log(token);
  let response = await axios.get('http://localhost:8080/user/get-expenses',{ headers : { "authorization" : token } });
  console.log(response.data);
  return response.data;
  }
  catch(err){
    console.log(err);
  }
}

async function deleteExpense(expenseid){
  try{
  let token = localStorage.getItem("token");
  console.log(token);
  let response = await axios.get(`http://localhost:8080/user/delete-expense/${expenseid}`,{ headers : { "authorization" : token } });
  console.log(`${id} deleted`);
  }
  catch(err){
    console.log(err);
  }
}


