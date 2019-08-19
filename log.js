console.log("log.js loaded");

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

//Local storage
var save = window.localStorage;

window.setInterval(function(){
  var taskName = document.getElementById("taskname");
  var taskDescription = document.getElementById("description");
  var taskDate = document.getElementById("duedate");

  save.taskName = taskName.value;
  save.taskDescription=taskDescription.value;
  save.taskDate=taskDate.value;
},5000);

window.calllocalValues = function() {
  var taskName = document.getElementById("taskname");
  var taskDescription = document.getElementById("description");
  var taskDate = document.getElementById("duedate");

  if(save!=undefined){
  taskName.value= save.taskName;
  taskDescription.value=save.taskDescription;
  taskDate.value= save.taskDate;}
} 

//Geolocation
window.callgetLocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log("geolocation called");
  }
  else{
    console.log("geo location not working");
  }
} 

window.showPosition = function(position) {
    var lat = position.coords.latitude; 
    var lon = position.coords.longitude;
    if( lat <= 40 && lat >= 33 && lon <= 141 && lon >= 132 ){
        window.location.replace("http://localhost:4444/index-jap.html");
    }
}


window.start = function(){ 
  callIndexedDB();
  calllocalValues();
  callgetLocation();
}


// window.setTimeout(calllocalValues,400);
// window.setTimeout(callgetLocation,800);