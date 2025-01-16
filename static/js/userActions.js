import { getDate, calculateWindDown, calculateBedtime, calculateWakeUp, calculateGetReady, calculateDrive, storeInput, displayOutput, convertToNumber, defaultButton, collapsibleEvent, toggleButton } from "/static/js/utilities.js";
import { windDownPOST, bedtimePOST, wakeUpPOST, getReadyPOST, drivePOST, getEventHistory, getUserPreferences, logout, getUserID, updatePreferences, eventsByDate, updateEvent, deleteEvent } from "/static/js/dataService.js"

export async function userActions() {
    const pref = await getUserPreferences();
    const user_id = await getUserID();

    var eventEntries = document.getElementById('eventEntries');
    var editButton = document.getElementById('edit');
    var preferencesButton = document.getElementById('preferences');
    var defaultLengthButton = document.getElementById('defaultLength');
    var logoutButton = document.getElementById('logout');
    var eventsContainer = document.getElementById('eventsContainer');
    var windDownButton = document.getElementById('windDown');
    var sleepButton = document.getElementById('bedtime');
    var wakeUpButton = document.getElementById('wakeUp');
    var getReadyButton = document.getElementById('getReady');
    var driveButton = document.getElementById('drive');
    var eventDate = document.getElementById('eventDate');
    var todayDate = getDate();

    if (eventEntries) {        
        eventEntries.addEventListener('click', function(event) {
            let target = event.target;
            if (target.classList.contains('submitChanges')) {
                let eventId = target.dataset.eventId;
                let resultElement = document.querySelector(`input[name='outcome-${eventId}']:checked`);
                let result = resultElement.value;
                let notes = document.getElementById(`editNotes-${eventId}`);
                updateEvent(eventId, result, notes.value);
            } else if (target.classList.contains('deleteEvent')) {
                let eventId = target.dataset.eventId;
                deleteEvent(eventId);
            }
        });
    };

    if (preferencesButton) {
        document.getElementById('windDownLength').value = pref.windDown;
        document.getElementById('sleepLength').value = pref.sleep;
        document.getElementById('prepLength').value = pref.prep;
        document.getElementById('showerLength').value = pref.shower;
        document.getElementById('getReadyLength').value = pref.getReady;
        document.getElementById('fluffLength').value = pref.fluff;

        preferencesButton.addEventListener('click', function() {
            let windDown = convertToNumber(document.getElementById('windDownLength').value);
            let sleep = convertToNumber(document.getElementById('sleepLength').value);
            let prep = convertToNumber(document.getElementById('prepLength').value);
            let shower = convertToNumber(document.getElementById('showerLength').value);
            let getReady = convertToNumber(document.getElementById('getReadyLength').value);
            let fluff = convertToNumber(document.getElementById('fluffLength').value);

            updatePreferences(user_id, windDown, sleep, prep, shower, getReady, fluff);
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
        // TO DO:
        // Remove below and collapsibles only work AFTER clicking request dates button
        // Both collapsible sections don't work at the same time???
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

    if (windDownButton) {
        eventDate.value = todayDate;

        windDownButton.addEventListener('click', function(event) {
            let userInput = storeInput();
            let result = calculateWindDown(userInput, pref);
            displayOutput(userInput.taskName, result.tasks);


            event.preventDefault();

            windDownPOST(user_id, userInput.taskName, userInput.taskDate, userInput.arriveTime, userInput.driveTime, result.windDownByFinal, result.sleepByFinal, result.prepByFinal, result.showerByFinal, result.getReadyByFinal, result.leaveByFinal);
        });
    };

    if (sleepButton) {
        eventDate.value = todayDate;

        sleepButton.addEventListener('click', function(event) {
            let userInput = storeInput();
            let result = calculateBedtime(userInput, pref);
            displayOutput(userInput.taskName, result.tasks);


            event.preventDefault();

            bedtimePOST(user_id, userInput.taskName, userInput.taskDate, userInput.arriveTime, userInput.driveTime, result.sleepByFinal, result.prepByFinal, result.showerByFinal, result.getReadyByFinal, result.leaveByFinal);
        });
    };

    if (wakeUpButton) {

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