console.log("offline.js loaded");

window.updateOnlineStatus = function() {
    window.alert("Online");
}

window.updateOfflineStatus = function() {
    window.alert("Offline");
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOfflineStatus);
