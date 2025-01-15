import { getDate, calculateWakeUp, calculateGetReady, calculateDrive, storeInput, displayOutput, convertToNumber, defaultButton, collapsibleEvent, toggleButton } from "/static/js/utilities.js";
import { wakeUpPOST, getReadyPOST, drivePOST, getEventHistory, getUserPreferences, logout, getUserID, updatePreferences, eventsByDate } from "/static/js/dataService.js"

export async function userActions() {
    const pref = await getUserPreferences();
    const user_id = await getUserID();

    var editButton = document.getElementById('edit');
    var preferencesButton = document.getElementById('preferences');
    var defaultLengthButton = document.getElementById('defaultLength');
    var logoutButton = document.getElementById('logout');
    var eventsContainer = document.getElementById('eventsContainer');
    var wakeUpButton = document.getElementById('wakeUp');
    var getReadyButton = document.getElementById('getReady');
    var driveButton = document.getElementById('drive');
    var todayDate = getDate();

    if (editButton) {
        
    };

    if (preferencesButton) {
        preferencesButton.addEventListener('click', function() {
            let prep = convertToNumber(document.getElementById('prepLength').value);
            let shower = convertToNumber(document.getElementById('showerLength').value);
            let getReady = convertToNumber(document.getElementById('getReadyLength').value);
            let fluff = convertToNumber(document.getElementById('fluffLength').value);

            updatePreferences(user_id, prep, shower, getReady, fluff);
        });
    }

    if (defaultLengthButton) {
        defaultButton();
    };

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            console.log('User Preferences:', pref.fluff, pref.prep, pref.shower, pref.getReady);
            logout();
        });
    };
    
    if (eventsContainer) {
        let eventHistory = await getEventHistory(user_id);
        collapsibleEvent();

        editButton.addEventListener('click', function() {
            toggleButton();
        });

        document.getElementById('requestDates').addEventListener('click', async function() {
            let date = document.getElementById('selectDate').value;
            let events = await eventsByDate(user_id, date);
            collapsibleEvent();
        });
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