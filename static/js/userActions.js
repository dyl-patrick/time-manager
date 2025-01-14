import { getDate, calculateWakeUp, calculateGetReady, calculateDrive, storeInput, displayOutput } from "/static/js/utilities.js";
import { wakeUpPOST, getReadyPOST, drivePOST, getEventHistory, getUserPreferences, logout, getUserID } from "/static/js/dataService.js"

export async function userActions() {
    const pref = await getUserPreferences();
    const user_id = await getUserID();

    var preferencesButton = document.getElementById('preferences');
    var logoutButton = document.getElementById('logout');
    var eventsContainer = document.getElementById('eventsContainer');
    var wakeUpButton = document.getElementById('wakeUp');
    var getReadyButton = document.getElementById('getReady');
    var driveButton = document.getElementById('drive');
    var todayDate = getDate();

    if (preferencesButton) {
        preferencesButton.addEventListener('click', function() {
            let prep = document.getElementById('prepLength').value;
            let shower = document.getElementById('showerLength').value;
            let get_ready = document.getElementById('getReadyLength').value;
            let fluff = document.getElementById('fluffLength').value;

            // Create UPDATE function on server and DataService!!!
            updatePreferences(user_id, prep, shower, get_ready, fluff);
        });
    }

    if (defaultLengthButton) {
        defaultButton();
    };

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            console.log('User Preferences:', pref.fluff, pref.prep, pref.shower, pref.getReady);
            logout();
        })
    }
    
    if (eventsContainer) {
        getEventHistory(user_id);
    };

    if (wakeUpButton) {
        eventDate.value = todayDate;

        wakeUpButton.addEventListener('click', function(event) {
            let userInput = storeInput();
            let result = calculateWakeUp(userInput, pref);
            displayOutput(userInput.taskName, result.tasks);


            event.preventDefault();

            wakeUpPOST(user_id, userInput.taskName, userInput.taskDate, userInput.arriveTime, userInput.driveTime, result.prepByFinal, result.showerByFinal, result.getReadyByFinal, result.leaveByFinal);
        });
    };
    
    if (getReadyButton) {
        getReadyButton.addEventListener('click', function(event) {
            let userInput = storeInput();
            let result = calculateGetReady(userInput, pref);
            displayOutput(userInput.taskName, result.tasks);

            event.preventDefault();
            
            getReadyPOST(user_id, userInput.taskName, userInput.taskDate, userInput.arriveTime, userInput.driveTime, result.prepByFinal, result.getReadyByFinal, result.leaveByFinal);
        });
    };
    
    if (driveButton) {
        driveButton.addEventListener('click', function(event) {
            let userInput = storeInput();
            let result = calculateDrive(userInput, pref);
            displayOutput(userInput.taskName, result.tasks);

            event.preventDefault();

            drivePOST(user_id, userInput.taskName, userInput.taskDate, userInput.arriveTime, userInput.driveTime, result.prepByFinal, result.leaveByFinal);
        });
    };
};