import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://lead-tracker-app-71e91-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const refereenceInDB = ref(database, "leads")

// console.log(firebaseConfig.databaseURL);

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(refereenceInDB, function(snapshot) {
    const snapshopDoesExist = snapshot.exists()
    if (snapshopDoesExist) {
        const snapshotValues =  snapshot.val();
        const leads = Object.values(snapshotValues)
        render(leads);
    }
})


deleteBtn.addEventListener("dblclick", function() {
    remove(refereenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(refereenceInDB, inputEl.value)
    inputEl.value = ""
})