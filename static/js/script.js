import { hoursToMinutes, convertToStandardTime, convertToNumber, getDate } from "/static/js/conversions.js";
import { login, signUpValidation, addUser, addPreferences, wakeUpPOST, getReadyPOST, drivePOST, getEventHistory, getUserPreferences } from "/static/js/dataService.js"

const user_id = 1;
const pref = loadPreferences(user_id);
var fluff = pref.fluff;
var prep = pref.prep;
var shower = pref.shower;
var getReady = pref.getReady;

console.log("DOMContentLoaded")

console.log('User Preferences:', fluff, prep, shower, getReady);

const prepLength0 = 45;
const showerLength0 = 30;
const getReadyLength0 = 30;
const fluff0 = 15;

document.addEventListener('DOMContentLoaded', function() {
    var eventsContainer = document.getElementById('eventsContainer');
    var defaultLengthButton = document.getElementById('defaultLength');
    var signUpButton = document.getElementById('signUp');
    var wakeUpButton = document.getElementById('wakeUp');
    var getReadyButton = document.getElementById('getReady');
    var driveButton = document.getElementById('drive');
    var todayDate = getDate();
    var loginButton = document.getElementById('login');

    if (loginButton) {
        loginButton.addEventListener('click', function(event) {
            event.preventDefault();

            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;

            login(username, password);
        });
    };

    // Display Event History from Database
    if (eventsContainer) {
        getEventHistory(user_id);
    };
    
    // defaultLengthButton function must be above signUpButton function
    if (defaultLengthButton) {
        defaultLengthButton.addEventListener('click', function() {
            document.getElementById('prepLength').value = 45;
            document.getElementById('showerLength').value = 30;
            document.getElementById('getReadyLength').value = 30;
            document.getElementById('fluffLength').value = 15;
        });
    };

    if (signUpButton) {
        signUpButton.addEventListener('click', function(event) {
            let valid = true;
            let f_name = document.getElementById('f_name').value;
            let l_name = document.getElementById('l_name').value
            let email = document.getElementById('email').value
            let username = document.getElementById('username').value
            let password = document.getElementById('password').value

            let prep = document.getElementById('prepLength').value;
            let shower = document.getElementById('showerLength').value;
            let get_ready = document.getElementById('getReadyLength').value;
            let fluff = document.getElementById('fluffLength').value;
            let date_created = todayDate;
            
            valid = signUpValidation(email, username, password, valid);
            
            if (!valid) {
                event.preventDefault();
            };

            // Store in Database
            if (valid) {
                valid = addPreferences(user_id, prep, shower, get_ready, fluff, date_created);
                if (valid) {
                    addUser(f_name, l_name, email, username, password);
                }
            };
        });
    };

    if (wakeUpButton) {
        eventDate.value = todayDate;

        wakeUpButton.addEventListener('click', function(event) {
            let userInput = storeInput();
            let result = calculateWakeUp(userInput);
            displayOutput(userInput.taskName, result.tasks);

            event.preventDefault();

            // Store in Database
            wakeUpPOST(user_id, userInput.taskName, userInput.taskDate, userInput.arriveTime, userInput.driveTime, result.prepByFinal, result.showerByFinal, result.getReadyByFinal, result.leaveByFinal);
        });
    };
    
    if (getReadyButton) {
        getReadyButton.addEventListener('click', function(event) {
            let userInput = storeInput();
            let result = calculateGetReady(userInput);
            displayOutput(userInput.taskName, result.tasks);

            event.preventDefault();
            
            // Store in Database
            getReadyPOST(user_id, userInput.taskName, userInput.taskDate, userInput.arriveTime, userInput.driveTime, result.prepByFinal, result.getReadyByFinal, result.leaveByFinal);
        });
    };
    
    if (driveButton) {
        driveButton.addEventListener('click', function(event) {
            let userInput = storeInput();
            let result = calculateDrive(userInput);
            displayOutput(userInput.taskName, result.tasks);

            event.preventDefault();

            // Store in Database
            drivePOST(user_id, userInput.taskName, userInput.taskDate, userInput.arriveTime, userInput.driveTime, result.prepByFinal, result.leaveByFinal);
        });
    };
});

function calculateWakeUp({ arriveTime, driveTime }) {
    arriveTime = hoursToMinutes(arriveTime);
    let arriveTimeFinal = convertToStandardTime(arriveTime);
    
    let leaveBy = arriveTime - driveTime - fluff0;
    let leaveByFinal = convertToStandardTime(leaveBy);
    
    let getReadyBy = leaveBy - getReadyLength0;
    let getReadyByFinal = convertToStandardTime(getReadyBy);
    
    let showerBy = getReadyBy - showerLength0;
    let showerByFinal = convertToStandardTime(showerBy);
    
    let prepBy = showerBy - prepLength0;
    let prepByFinal = convertToStandardTime(prepBy);

    return {
        tasks: [
            { name: "Prep At", time: prepByFinal },
            { name: "Shower At", time: showerByFinal },
            { name: "Get Ready At", time: getReadyByFinal },
            { name: "Leave At", time: leaveByFinal },
            { name: "Arrive At", time: arriveTimeFinal }
        ],
        prepByFinal, showerByFinal, getReadyByFinal, leaveByFinal, arriveTimeFinal
    };

};

function calculateGetReady({arriveTime, driveTime }) {
    
    arriveTime = hoursToMinutes(arriveTime);
    let arriveTimeFinal = convertToStandardTime(arriveTime);

    let leaveBy = arriveTime - driveTime - fluff0;
    let leaveByFinal = convertToStandardTime(leaveBy);

    let getReadyBy = leaveBy - getReadyLength0;
    let getReadyByFinal = convertToStandardTime(getReadyBy);

    let prepBy = getReadyBy - prepLength0;
    let prepByFinal = convertToStandardTime(prepBy);

    return {
        tasks: [
            { name: "Prep At", time: prepByFinal },
            { name: "Get Ready At", time: getReadyByFinal },
            { name: "Leave At", time: leaveByFinal },
            { name: "Arrive At", time: arriveTimeFinal }
        ],
    prepByFinal, getReadyByFinal, leaveByFinal, arriveTimeFinal
    };
};

function calculateDrive({arriveTime, driveTime }) {

    arriveTime = hoursToMinutes(arriveTime);
    let arriveTimeFinal = convertToStandardTime(arriveTime);

    let leaveBy = arriveTime - driveTime - fluff0;
    let leaveByFinal = convertToStandardTime(leaveBy);

    let prepBy = leaveBy - prepLength0;
    let prepByFinal = convertToStandardTime(prepBy);

    return {
        tasks: [
            { name: "Prep At", time: prepByFinal },
            { name: "Leave At", time: leaveByFinal },
            { name: "Arrive At", time: arriveTimeFinal }
        ],
        prepByFinal, leaveByFinal, arriveTimeFinal
    };
};

function storeInput() {
    let taskName = document.getElementById('taskName').value;
    let taskDate = document.getElementById('eventDate').value;
    let arriveTime = document.getElementById('arriveTime').value;
    let driveTime = document.getElementById('driveTime').value;
    driveTime = convertToNumber(driveTime);

    return { taskName, arriveTime, driveTime, taskDate };
}

function displayOutput(taskName, tasks) {
    const tableRows = tasks.map(task => `<tr><td>${task.name}</td><td>${task.time}</td></tr>`).join('');

    const htmlContent = `
        <section>
            <h2>${taskName}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </section>
    `;

    let parentElement = document.getElementById("output");
    parentElement.innerHTML = htmlContent;
};

async function loadPreferences(user_id) {
    try {
        const pref = await getUserPreferences(user_id);
        var fluff = pref.fluff;
        var prep = pref.prep;
        var shower = pref.shower;
        var getReady = pref.getReady;

        console.log("loadPreferences")

        return { fluff, prep, shower, getReady }
    } catch (error) {
        console.error('Error handling preferences:', error);
    }
};
