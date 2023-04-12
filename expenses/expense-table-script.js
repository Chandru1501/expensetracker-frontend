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
  let isour = data.headers.isour;
  // verify(isour);
  data.expense.forEach(expense => {
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
  verify(response.data.headers);
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

let openCount=0;
let leaderboardBtn = document.querySelector('#Leaderboardbtn');
let leaderboardTable = document.querySelector('#Leaderboard');
let leaderboaedText = document.querySelector('.text-info');
let premiumFeature = document.querySelector('#premium_feature');
let HideOrView = document.querySelector("#HideOrView");

leaderboardBtn.addEventListener('click',showORhideLeaderBoard);

async function showORhideLeaderBoard(){

  if(HideOrView.style.display=="none"){
    HideOrView.style.display="block";
    leaderboardBtn.textContent="Hide Leaderboard";
    if(openCount>0){
      return;
    }
    let token = localStorage.getItem("token");
    console.log(token);
    let response = await axios.get('http://localhost:8080/premium/get-leaderboard',{headers : { "authorization" : token }})
    console.log(response.data);

    response.data.forEach((data)=>{
      showLeaderBoard(data);
    })

  }
  else{
    HideOrView.style.display="none";
    leaderboardBtn.textContent="Show Leaderboard"; 
  }
}

async function verify(isour) {
  console.log(isour.isour);
  if(isour.isour==="true"){
    premiumFeature.style.display="block";
  }
  else{
    premiumFeature.style.display="none";

    return;
  }
}

function showLeaderBoard(data){
openCount++;
  let tr = document.createElement('tr');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  td1.textContent=data.Username;
  td2.textContent=data.TotalExpense;
  tr.appendChild(td1);
  tr.appendChild(td2);
  leaderboardTable.appendChild(tr);

}


