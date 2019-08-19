import '../css/html5.css'; 

console.log("html5App.js loaded");


window.db = null;


window.callIndexedDB = function() {
        var dbReq = indexedDB.open('todolist', 1);
        dbReq.onupgradeneeded = function(event) {
                db = event.target.result;
                var notes = db.createObjectStore('todolist', { keypath: "id", autoIncrement: true });
            }
            //success
        dbReq.onsuccess = function(event) {
                db = event.target.result;
                
            }
            //error
        dbReq.onerror = function(event) {
            alert('error opening database ' + event.target.errorCode);
        }


    }
    //funtion to add 
    window.addtask = function(e) {
        e.preventDefault();
        console.log("addtask");
        var name = document.getElementById("taskname").value;
        var description = document.getElementById("description").value;
        var date = document.getElementById("duedate").value;
        console.log(name);
        var transaction = db.transaction("todolist", "readwrite");
        var store = transaction.objectStore("todolist");

        var note = {
            name: name,
            description: description,
            date: date

        }
    
        var request = store.add(note);
        removeElement();
        request.onsuccess = function() {
            alert('added');
           
        }
    };
    
    setTimeout(function(){
        showData();

    },(200));

        
 
    
       
    
window.showData = function() {
    console.log("showDatacalled");
    var trasaction1 = db.transaction(["todolist"], "readonly");
    const pNotes = trasaction1.objectStore("todolist");
    const request = pNotes.openCursor();
    request.onsuccess = e => {
        const cursor = e.target.result
        if (cursor) {

            document.getElementById("list").innerHTML += '<li><span class="items">' + '</span><span class="items">' + cursor.value.name + '</span>' + '<span class="items">' + cursor.value.description + '</span>' + '<span class="items">' + cursor.value.date + '</span>' + '</li>';
            cursor.continue();

        }
    }
}

function removeElement() {
    // Removes an element from the document
    var container =document.getElementById('dynamic')
    var element = document.getElementById('list');
    element.parentNode.removeChild(element);
    var newElement = document.createElement('ol');
    newElement.setAttribute('id','list');

    container.appendChild(newElement);
    showData();
    }