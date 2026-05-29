/* ========= DATA ========= */

let income=
Number(
localStorage.getItem("income")
) || 10000;

let expenses=
JSON.parse(
localStorage.getItem("expenses")
) || [];

let goals=
JSON.parse(
localStorage.getItem("goals")
)
||
[
{
id:1,
name:"Emergency Fund",
target:10000,
saved:0
}
];


/* ========= BUDGETS ========= */

const budgets={

Food:3000,
Transport:2000,
Travel:4000,
Shopping:3000,
Investments:2000,
Bills:1500,
Rent:5000,
Groceries:2500,
Entertainment:1500

};


/* ========= SELECTORS ========= */

const navBtns=
document.querySelectorAll(".nav-item");

const sections=
document.querySelectorAll(".page-section");

const balanceEl=
document.querySelector("#total-balance");

const incomeEl=
document.querySelector("#income-display");

const expenseEl=
document.querySelector("#expense-display");

const savingEl=
document.querySelector("#savings-rate");

const transactionList=
document.querySelector("#transaction-list");

const budgetGrid=
document.querySelector("#budget-grid");

const insightGrid=
document.querySelector("#insight-grid");

const goalsGrid=
document.querySelector("#goals-grid");

const addGoalBtn=
document.querySelector("#add-goal-btn");

const addBtn=
document.querySelector("#add-expense-btn");

const modal=
document.querySelector("#modal-overlay");

const closeBtn=
document.querySelector("#close-modal");

const form=
document.querySelector("#expense-form");

const toast=
document.querySelector("#toast");

const searchInput=
document.querySelector("#search-input");

const filterBtns=
document.querySelectorAll(".filter-btn");

const incomeInput=
document.querySelector("#income-input");

const saveIncomeBtn=
document.querySelector("#save-income-btn");

const exportBtn=
document.querySelector("#export-btn");

const resetBtn=
document.querySelector("#reset-btn");

const quickBtns=
document.querySelectorAll(".quick-action");

const liveDate=
document.querySelector("#live-date");

const liveTime=
document.querySelector("#live-time");

const healthScore=
document.querySelector("#health-score");

const healthFill=
document.querySelector("#health-fill");

const healthMsg=
document.querySelector("#health-message");

const themeBtns=[
document.querySelector("#theme-toggle"),
document.querySelector("#theme-btn")
];


/* ========= UTIL ========= */

const money=n=>
`₹${n.toLocaleString()}`;

const totalExpenses=()=>
expenses.reduce((a,b)=>a+b.amount,0);

const balance=()=>
income-totalExpenses();

const savingRate=()=>
income===0
?
0
:
Math.max(
0,
Math.floor((balance()/income)*100)
);

function saveData(){

localStorage.setItem(
"income",
income
);

localStorage.setItem(
"expenses",
JSON.stringify(expenses)
);

localStorage.setItem(
"goals",
JSON.stringify(goals)
);

}

function toastMsg(msg){

toast.innerText=msg;

toast.classList.add("show-toast");

setTimeout(()=>{

toast.classList.remove(
"show-toast"
);

},2500);

}


/* ========= NAV ========= */

navBtns.forEach(btn=>{

btn.onclick=()=>{

navBtns.forEach(b=>
b.classList.remove("active-nav")
);

btn.classList.add("active-nav");

sections.forEach(sec=>
sec.classList.remove("active-section")
);

document
.querySelector(
`#${btn.dataset.section}`
)
.classList.add("active-section");

};

});


/* ========= DATE ========= */

function updateDateTime(){

const now=new Date();

liveDate.innerText=
now.toLocaleDateString(
"en-IN",
{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
}
);

liveTime.innerText=
now.toLocaleTimeString(
"en-IN",
{
hour:"2-digit",
minute:"2-digit"
}
);

}

setInterval(updateDateTime,1000);

updateDateTime();


/* ========= SUMMARY ========= */

function renderSummary(){

balanceEl.innerText=
money(balance());

incomeEl.innerText=
money(income);

expenseEl.innerText=
money(totalExpenses());

savingEl.innerText=
`${savingRate()}%`;

renderHealth();

}


/* ========= HEALTH ========= */

function renderHealth(){

const score=savingRate();

healthScore.innerText=
`${score}%`;

healthFill.style.width=
`${score}%`;

if(score>=70){

healthMsg.innerText=
"Excellent saving habit";

}

else if(score>=40){

healthMsg.innerText=
"Balanced spending";

}

else{

healthMsg.innerText=
"Overspending warning";

}

}


/* ========= GOALS ========= */

function renderGoals(){

goalsGrid.innerHTML="";

goals.forEach(goal=>{

const percent=Math.min(
(goal.saved/goal.target)*100,
100
);

const done=
goal.saved>=goal.target;

const card=
document.createElement("div");

card.className=
done
?
"goal-item goal-complete"
:
"goal-item";

card.innerHTML=`

<div class="goal-top">

<div>

<h4>
${goal.name}
</h4>

<p>

${
done
?
"🎉 Completed"
:
"Keep Saving"
}

</p>

</div>


<div class="goal-actions">

<button
class="goal-action edit-goal"
data-id="${goal.id}"
>

<i class="ri-edit-line"></i>

</button>


<button
class="goal-action delete-goal"
data-id="${goal.id}"
>

<i class="ri-delete-bin-line"></i>

</button>

</div>

</div>


<div class="goal-progress">

<div
class="goal-fill"
style="width:${percent}%"
></div>

</div>


<div class="goal-bottom">

<span>
${money(goal.saved)}
</span>

<span>
${money(goal.target)}
</span>

</div>

`;

goalsGrid.appendChild(card);

});

goalActions();

}

function goalActions(){

document
.querySelectorAll(".delete-goal")
.forEach(btn=>{

btn.onclick=()=>{

const id=
Number(btn.dataset.id);

goals=
goals.filter(
g=>g.id!==id
);

updateUI();

toastMsg("Goal deleted");

};

});

document
.querySelectorAll(".edit-goal")
.forEach(btn=>{

btn.onclick=()=>{

const id=
Number(btn.dataset.id);

const goal=
goals.find(
g=>g.id===id
);

const name=
prompt(
"Goal name",
goal.name
);

if(!name)return;

const target=
Number(
prompt(
"Target amount",
goal.target
)
);

const saved=
Number(
prompt(
"Saved amount",
goal.saved
)
);

goal.name=name;
goal.target=target;
goal.saved=saved;

updateUI();

toastMsg("Goal updated");

};

});

}

addGoalBtn.onclick=()=>{

const name=
prompt("Goal name");

if(!name)return;

const target=
Number(
prompt("Target amount")
);

if(target<=0)return;

const saved=
Number(
prompt("Saved amount")
) || 0;

goals.push({

id:Date.now(),
name,
target,
saved

});

updateUI();

toastMsg("Goal added");

};


/* ========= TRANSACTIONS ========= */

function renderTransactions(data=expenses){

transactionList.innerHTML="";

if(data.length===0){

transactionList.innerHTML=`

<div class="empty-state">

<i class="ri-wallet-3-line"></i>

<h3>No expenses yet</h3>

<p>
Start tracking expenses
</p>

</div>

`;

return;

}

data
.slice()
.reverse()
.forEach(exp=>{

const card=
document.createElement("div");

card.className=
"transaction-card";

card.innerHTML=`

<div class="transaction-left">

<div class="transaction-icon">
${exp.emoji}
</div>

<div>

<h4>
${exp.title}
</h4>

<p>
${exp.category}
•
${exp.date}
</p>

</div>

</div>


<div class="transaction-right">

<div class="transaction-amount">

-${money(exp.amount)}

</div>


<div class="transaction-actions">

<button
class="action-btn edit-btn"
data-id="${exp.id}"
>

<i class="ri-edit-line"></i>

</button>


<button
class="action-btn delete-btn"
data-id="${exp.id}"
>

<i class="ri-delete-bin-line"></i>

</button>

</div>

</div>

`;

transactionList.appendChild(card);

});

attachActions();

}


/* ========= ACTIONS ========= */

function attachActions(){

document
.querySelectorAll(".delete-btn")
.forEach(btn=>{

btn.onclick=()=>{

const id=
Number(btn.dataset.id);

expenses=
expenses.filter(
e=>e.id!==id
);

updateUI();

toastMsg("Expense deleted");

};

});


document
.querySelectorAll(".edit-btn")
.forEach(btn=>{

btn.onclick=()=>{

const id=
Number(btn.dataset.id);

const target=
expenses.find(
e=>e.id===id
);

const title=
prompt(
"Edit title",
target.title
);

if(!title)return;

const amount=
Number(
prompt(
"Edit amount",
target.amount
)
);

if(amount<=0)return;

target.title=title;
target.amount=amount;

updateUI();

toastMsg("Expense updated");

};

});

}


/* ========= ADD EXPENSE ========= */

const emojiMap={

Food:"🍔",
Transport:"🚕",
Travel:"✈️",
Shopping:"🛍️",
Investments:"📈",
Bills:"💡",
Rent:"🏠",
Groceries:"🛒",
Entertainment:"🎬"

};

form.onsubmit=e=>{

e.preventDefault();

const title=
document
.querySelector("#expense-title")
.value.trim();

const amount=
Number(
document
.querySelector("#expense-amount")
.value
);

const category=
document
.querySelector("#expense-category")
.value;

const date=
document
.querySelector("#expense-date")
.value;

const note=
document
.querySelector("#expense-note")
.value;

if(title.length<2){

toastMsg("Invalid title");
return;

}

if(amount<=0){

toastMsg("Invalid amount");
return;

}

expenses.push({

id:Date.now(),
title,
amount,
category,
date,
note,
emoji:
emojiMap[category] || "💸"

});

form.reset();

closeModal();

updateUI();

toastMsg("Expense added");

};


/* ========= MODAL ========= */

function openModal(){

modal.style.display="flex";

}

function closeModal(){

modal.style.display="none";

}

addBtn.onclick=openModal;

closeBtn.onclick=closeModal;

modal.onclick=e=>{

if(e.target===modal){

closeModal();

}

};


/* ========= SEARCH ========= */

searchInput.oninput=()=>{

const value=
searchInput.value.toLowerCase();

const filtered=
expenses.filter(exp=>

exp.title
.toLowerCase()
.includes(value)

||

exp.category
.toLowerCase()
.includes(value)

||

String(exp.amount)
.includes(value)

);

renderTransactions(filtered);

};


/* ========= FILTERS ========= */

filterBtns.forEach(btn=>{

btn.onclick=()=>{

filterBtns.forEach(b=>
b.classList.remove(
"active-filter"
)
);

btn.classList.add(
"active-filter"
);

const category=
btn.innerText;

if(category==="All"){

renderTransactions();
return;

}

const filtered=
expenses.filter(
e=>e.category===category
);

renderTransactions(filtered);

};

});


/* ========= QUICK ========= */

quickBtns.forEach(btn=>{

btn.onclick=()=>{

document.querySelector(
"#expense-category"
).value=
btn.dataset.category;

openModal();

};

});


/* ========= BUDGETS ========= */

function renderBudgets(){

budgetGrid.innerHTML="";

Object.keys(budgets)
.forEach(category=>{

const limit=
budgets[category];

const spent=
expenses
.filter(
e=>e.category===category
)
.reduce(
(a,b)=>a+b.amount,
0
);

const percent=Math.min(
(spent/limit)*100,
100
);

const card=
document.createElement("div");

card.className=
"budget-card";

card.innerHTML=`

<div class="budget-card-top">

<h3>
${category}
</h3>

<strong>

${money(spent)}
/
${money(limit)}

</strong>

</div>


<div class="progress-bar">

<div
class="progress-fill"
style="width:${percent}%"
></div>

</div>


<p>

${
spent>limit

?

`Exceeded by ${money(spent-limit)}`

:

`${money(limit-spent)} left`
}

</p>

`;

budgetGrid.appendChild(card);

});

}


/* ========= INSIGHTS ========= */

function renderInsights(){

insightGrid.innerHTML="";

const highest=
[...expenses]
.sort((a,b)=>b.amount-a.amount)[0];

const insights=[

`Spent ${money(totalExpenses())} this month.`,

`Savings rate ${savingRate()}%.`,

highest
?
`${highest.title} is highest expense.`
:
"Start tracking expenses.",

balance()>0
?
`${money(balance())} remaining.`
:
"Budget exceeded."

];

insights.forEach(text=>{

const card=
document.createElement("div");

card.className=
"insight-card";

card.innerHTML=`

<p>
${text}
</p>

`;

insightGrid.appendChild(card);

});

}


/* ========= CHARTS ========= */

let expenseChart;
let trendChart;

function renderCharts(){

const categories={};
const dates={};

expenses.forEach(exp=>{

categories[exp.category]=
(categories[exp.category]||0)
+
exp.amount;

dates[exp.date]=
(dates[exp.date]||0)
+
exp.amount;

});

const donutCtx=
document.querySelector(
"#expenseChart"
);

if(expenseChart)
expenseChart.destroy();

expenseChart=
new Chart(donutCtx,{

type:"doughnut",

data:{

labels:
Object.keys(categories),

datasets:[{

data:
Object.values(categories),

borderWidth:0,
hoverOffset:8

}]

},

options:{

cutout:"72%",

plugins:{
legend:{
position:"bottom"
}
},

responsive:true

}

});


const trendCtx=
document.querySelector(
"#trendChart"
);

if(trendChart)
trendChart.destroy();

const gradient=
trendCtx
.getContext("2d")
.createLinearGradient(
0,
0,
0,
400
);

gradient.addColorStop(
0,
"rgba(15,157,122,0.35)"
);

gradient.addColorStop(
1,
"rgba(15,157,122,0)"
);

trendChart=
new Chart(trendCtx,{

type:"line",

data:{

labels:Object.keys(dates),

datasets:[{

data:Object.values(dates),

fill:true,

backgroundColor:
gradient,

tension:0.4,

borderWidth:3

}]

},

options:{

plugins:{
legend:{
display:false
}
},

scales:{
y:{
beginAtZero:true
}
},

responsive:true

}

});

}


/* ========= CALENDAR ========= */

function renderCalendar(){

const calendarEl=
document.querySelector(
"#expense-calendar"
);

calendarEl.innerHTML="";

const events=
expenses.map(exp=>({

title:`₹${exp.amount}`,
date:exp.date

}));

const calendar=
new FullCalendar.Calendar(
calendarEl,
{

initialView:"dayGridMonth",

height:"auto",

events,

eventColor:"#0F9D7A",

eventClick(info){

const dayExpenses=
expenses.filter(
e=>e.date===
info.event.startStr
);

let text=
`Expenses on ${info.event.startStr}\n\n`;

dayExpenses.forEach(e=>{

text+=
`${e.title} - ₹${e.amount}\n`;

});

alert(text);

}

});

calendar.render();

}


/* ========= INCOME ========= */

saveIncomeBtn.onclick=()=>{

const value=
Number(
incomeInput.value
);

if(value<=0){

toastMsg("Invalid income");
return;

}

income=value;

incomeInput.value="";

updateUI();

toastMsg("Income updated");

};


/* ========= EXPORT ========= */

exportBtn.onclick=()=>{

const data={

income,
expenses,
goals

};

const blob=
new Blob(

[
JSON.stringify(data,null,2)
],

{
type:"application/json"
}

);

const url=
URL.createObjectURL(blob);

const link=
document.createElement("a");

link.href=url;

link.download=
"spendless-backup.json";

link.click();

toastMsg("Backup exported");

};


/* ========= RESET ========= */

resetBtn.onclick=()=>{

const confirmReset=
confirm(
"Delete all app data?"
);

if(!confirmReset)return;

localStorage.clear();

location.reload();

};


/* ========= THEME ========= */

function toggleTheme(){

document.body.classList.toggle(
"dark-theme"
);

localStorage.setItem(

"theme",

document.body.classList.contains(
"dark-theme"
)

);

}

themeBtns.forEach(btn=>{

btn.onclick=toggleTheme;

});

if(
localStorage.getItem("theme")
==="true"
){

document.body.classList.add(
"dark-theme"
);

}


/* ========= UPDATE ========= */

function updateUI(){

saveData();

renderSummary();

renderGoals();

renderTransactions();

renderBudgets();

renderInsights();

renderCharts();

renderCalendar();

}


/* ========= INIT ========= */

updateUI();

console.log(
"SpendLess Loaded 🚀"
);