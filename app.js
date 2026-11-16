const ADMIN_ID = "8996484843";
const tg = window.Telegram?.WebApp;
tg?.ready(); tg?.expand();
const demoUser = tg?.initDataUnsafe?.user || {id: "demo-user", first_name: "Guest"};
const uid = String(demoUser.id);
const $ = id => document.getElementById(id);
$("user").textContent = demoUser.first_name || "Telegram User";
$("welcome").textContent = `স্বাগতম, ${demoUser.first_name || "User"}!`;
$("profileName").textContent = `নাম: ${demoUser.first_name || "Guest"}`;
$("profileId").textContent = `Telegram ID: ${uid}`;
const storeKey = "tr_earning_demo_v1";
let state = JSON.parse(localStorage.getItem(storeKey) || "null") || {
 balance: 0, tasks: [{title:"৫০ টাকার কাজ", reward:50}], history: []
};
function save(){localStorage.setItem(storeKey,JSON.stringify(state));render()}
function page(name){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));$(name)?.classList.add("active");render()}
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>page(b.dataset.go)));
function row(title,sub,action){const d=document.createElement("div");d.className="item";const s=document.createElement("div");s.innerHTML=`<b>${escapeHtml(title)}</b><small>${escapeHtml(sub)}</small>`;d.append(s);if(action)d.append(action);return d}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(){
 $("balance").textContent=state.balance;
 $("taskList").replaceChildren();$("homeTasks").replaceChildren();$("adminTasks").replaceChildren();
 state.tasks.forEach((t,i)=>{const btn=document.createElement("button");btn.textContent="Submit for review";btn.onclick=()=>{state.history.unshift({type:"Task",amount:t.reward,status:"Pending review"});save();alert("Task review request জমা হয়েছে।")};const r=row(t.title,`Reward ৳${t.reward}`,btn);$("taskList").append(r);$("homeTasks").append(row(t.title,`Reward ৳${t.reward}`));if(uid===ADMIN_ID){const del=document.createElement("button");del.textContent="Remove";del.onclick=()=>{state.tasks.splice(i,1);save()};$("adminTasks").append(row(t.title,`৳${t.reward}`,del))}});
 $("historyList").replaceChildren();state.history.forEach(h=>$("historyList").append(row(h.type,`৳${h.amount} • ${h.status}`)));
 $("admin").style.display = uid===ADMIN_ID ? "" : "none";
 $("refLink").textContent=`https://t.me/TREarningHubBot?start=${uid}`;
}
$("copyRef").onclick=async()=>{try{await navigator.clipboard.writeText($("refLink").textContent);alert("লিংক কপি হয়েছে")}catch{alert($("refLink").textContent)}};
$("sendDeposit").onclick=()=>{const amount=Number($("depAmount").value);if(!(amount>0))return alert("সঠিক পরিমাণ লিখুন");state.history.unshift({type:"Deposit",amount,status:"Demo request only"});save();alert("ডেমো রিকোয়েস্ট যোগ হয়েছে। বাস্তব টাকা পাঠাবেন না।");page("history")};
$("sendWithdraw").onclick=()=>{const amount=Number($("wdAmount").value);if(amount<150||!$("number").value.trim())return alert("সর্বনিম্ন ৳150 এবং নম্বর দিন");state.history.unshift({type:`Withdraw (${ $("method").value })`,amount,status:"Pending (demo)"});save();alert("ডেমো রিকোয়েস্ট যোগ হয়েছে; কোনো টাকা পাঠানো হয়নি।");page("history")};
$("addTask").onclick=()=>{if(uid!==ADMIN_ID)return alert("Admin only");const title=$("newTask").value.trim(),reward=Number($("newReward").value);if(!title||!(reward>0))return alert("Task ও reward দিন");state.tasks.push({title,reward});$("newTask").value="";$("newReward").value="";save()};
if(uid===ADMIN_ID){const b=document.createElement("button");b.textContent="⚙ Admin";b.onclick=()=>page("admin");document.querySelector("nav").append(b)}
render();