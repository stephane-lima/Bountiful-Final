const lastDate = document.getElementById("last-update");
const year = document.getElementById("current-year");

const date = new Date().toLocaleString();
lastDate.innerHTML = date;

year.innerHTML = new Date().getFullYear();