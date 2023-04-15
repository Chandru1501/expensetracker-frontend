var totalAmount = document.querySelector('amount');
totalAmount.textContent = Number(0);
var Username = document.querySelector('name');

var UserTotalExpensesData;

let list = document.querySelector("#items");

window.addEventListener("DOMContentLoaded",showOnscreen)
var username = document.querySelector('name');
username.textContent = localStorage.getItem('username');

function displayitems(myObj) {

totalAmount.textContent= Number(totalAmount.textContent) + Number(myObj.amount);
var mydata ={
  date : myObj.date,
  income : myObj.income,
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
//   console.log(data);
  data.expense.forEach(expense => {
   displayitems(expense);
    // console.log(expense);
  });

}

async function getAllExpenses(){
  try{
    let token = localStorage.getItem("token");
    console.log(token);
  let response = await axios.get('http://localhost:8080/user/get-expenses',{ headers : { "authorization" : token } });
  verify(response.data.headers);
  UserTotalExpensesData = response.data.expense;
//   InitializeData(UserTotalExpenses);
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

//..........................................date basis.............................



// async function InitializeData(data){
//     UserTotalExpensesData = data;
//     console.log(UserTotalExpensesData);
// }





let tablediv = document.querySelector('.showBydateBasis');
let counting=0;
let open=0;
let ShowByDateBTN = document.querySelector('#showbydateBtn');
ShowByDateBTN.addEventListener('click',()=>{
    console.log(UserTotalExpensesData);
   if(counting==0){
       ShowByDateBTN.textContent="HIDE MONTHLY BASIS"
       tablediv.style.display="block";
       counting=1;

   }
   else{
    ShowByDateBTN.textContent="SHOW BY MONTHLY BASIS"
    tablediv.style.display="none";
    counting=0;  
   }

if(open==0){ 
    open++;
    let Data = [];
    console.log(Data[0]==null)
let count =0;
UserTotalExpensesData.forEach(data=>{
    let datearr = data.date.split('/').reverse();
    let date = data.date
    let added = false;

        if(Data[0]==null && added==false) {
          Data.push({
            [datearr[0]] : {
                [datearr[1]] : {
                    [date] : data
                }
             }
          })
          added=true;
        }
        else{
            for(let i=0;i<Data.length;i++)  {
                var obj = Data[i];
                var year = Object.keys(obj);
                // console.log(year[0])

     if(year[0]==datearr[0]){
        if(Data[i][datearr[0]][datearr[1]]==undefined && added==false){
              Data[i][datearr[0]][datearr[1]] = { [date] : data } 
              added=true;
            }
            else if(Data[i][datearr[0]][datearr[1]] !=undefined && Data[i][datearr[0]][datearr[1]][date] ==undefined &&  added==false){
                    Data[i][datearr[0]][datearr[1]][date] = data;
                    added=true;
             }
          }
       }
    }
    if(added==false){
         Data.push({
            [datearr[0]] : {
                [datearr[1]] : {
                    [date] : data
                }
             }
          })
        }


})

Data.sort((a,b)=> Object.keys(a) - Object.keys(b))
console.log(Data);

Data.forEach(year=>{
    showYearlyBasis(year);
})
}
 })



async function showYearlyBasis(year){
    for(let yer in year){
        let month = year[yer]
       let count=0;
        for(let ye in month){
            oneMonth =month[ye];
            Monthly(oneMonth);
            count++;
        }
    }
    
}



async function Monthly(Monthlydata){
    let keys = Object.keys(Monthlydata);
    let date  = keys[0].split('/');
    let ThisYear = date[2];
    let ThisMonth = date[1]
    console.log(ThisYear);
    console.log(ThisMonth);
    console.log(Monthlydata);
    
    let Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    
    let monthTitle = document.createElement('h2');
    monthTitle.id = "monthBasis";
    monthTitle.className = "text-info";
    monthTitle.textContent = `${Months[ThisMonth-1]} : ${ThisYear}`;
    let monthlyTable_headings = ["Date","Income","Expense","Description","Category"];
    let Monthlytable = document.createElement('table');
    Monthlytable.className = "table";
    let Monthlytr = document.createElement('tr');
    
    for(let i=0;i<5;i++){
        let th = document.createElement('th');
        th.textContent = monthlyTable_headings[i];
        Monthlytr.appendChild(th);
    }
    Monthlytable.appendChild(Monthlytr);
    tablediv.appendChild(monthTitle);
    tablediv.appendChild(Monthlytable);
    

    for(data in Monthlydata){
        console.log(Monthlydata[data]);
        let oneData = Monthlydata[data]
        let Thisobj = {
            date : oneData.date,
            income : oneData.income,
            expense : oneData.amount,
            description : oneData.description,
            category : oneData.category,
        }
        console.log(Thisobj);


    let TR = document.createElement('tr');
    for(data in Thisobj){
        let td = document.createElement('td');
        td.textContent=Thisobj[data];
        TR.appendChild(td);
    }
    Monthlytable.appendChild(TR);
    
}
}




// let yearlyDiv = document.createElement('div');
// yearlyDiv.className="Yearly_report";

// let YearlyTabletitle = document.createElement('h2');
// YearlyTabletitle.className = "text-info";
// YearlyTabletitle.textContent="YEARLY REPORT : YEAR";

// YearlyTable_headings = ["Month","Income","Expense","Savings"]
// let Yearlytable = document.createElement('table');
// Yearlytable.className = "table";
// let Yearlytr = document.createElement('tr');
// for(let i=0;i<4;i++){
//     let th = document.createElement('th');
//     th.textContent = YearlyTable_headings[i];
//     Yearlytr.appendChild(th);
// }
// Yearlytable.appendChild(Yearlytr);
// yearlyDiv.appendChild(YearlyTabletitle);
// yearlyDiv.appendChild(Yearlytable);
// tablediv.appendChild(yearlyDiv);


