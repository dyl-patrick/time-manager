import { hoursToMinutes, convertToStandardTime, convertToNumber, getDate, displayValue, amPmConversion } from "/static/js/conversions.js";

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
    var loginLink = document.getElementById('login-link');
    var signUpLink = document.getElementById('signUp-link');

    if (loginLink) {
        loginLink.addEventListener('click', function() {
            window.location.href = '/login.html';
        });
    };

    if (signUpLink) {
        signUpLink.addEventListener('click', function() {
            window.location.href = '/signUp.html';
        });
    };

    if (loginButton) {
        loginButton.addEventListener('click', function(event) {
            event.preventDefault();

            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;

            fetch('/login-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    console.log('Login successful:', data.message);
                    // Redirect user to another page or update the UI to show logged in state
                    window.location.href = '/dashboard'; // Redirect to the dashboard page if login is successful
                } else if (data.error) {
                    console.error('Login failed:', data.error);
                    alert('Login failed: ' + data.error); // Show error to the user
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    };

    if (eventsContainer) {
        console.log('eventsContainer');
        fetchEventHistory(1);
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

            // Change User_ID
            let user_id = 1;
            let prep = document.getElementById('prepLength').value;
            let shower = document.getElementById('showerLength').value;
            let get_ready = document.getElementById('getReadyLength').value;
            let fluff = document.getElementById('fluffLength').value;
            let date_created = todayDate;
            
            // Validation
            if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
                alert('Please enter a valid email address.');
                valid = false;
            };

            if (username.length < 8) {
                alert('Please enter a valid username.');
                valid = false;
            };
            
            if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
                alert('Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long.');
                valid = false;
            };
            
            if (!valid) {
                event.preventDefault();
            };

    
            console.log(f_name, l_name, email, username, password);
            
            // Send to Server
            fetch('/add_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    f_name: f_name,
                    l_name: l_name,
                    email: email,
                    username: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('User created successfully!');
                console.log(data);
                window.location.href = '/login.html';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error creating user');
            });

            fetch('/add_preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    prep: prep,
                    shower: shower,
                    get_ready: get_ready,
                    fluff: fluff,
                    date_created: date_created
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('Preferences created successfully!');
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error creating preferences');
            });
        });
    };

    if (wakeUpButton) {
        eventDate.value = todayDate;

        wakeUpButton.addEventListener('click', function(event) {
            let userInput = storeInput();
            let result = calculateWakeUp(userInput);
            displayOutput(userInput.taskName, result.tasks);
            
            // Send to Server
            event.preventDefault();
    
            // Change User_ID
            let user_id = 1
            let name = userInput.taskName
            let date = userInput.taskDate
            let i_arrival = userInput.arriveTime
            let i_drive = userInput.driveTime
            let o_prep = result.prepByFinal
            let o_shower = result.showerByFinal
            let o_get_ready = result.getReadyByFinal
            let o_leave = result.leaveByFinal
            
            fetch('/add_event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    name: name,
                    date: date,
                    i_arrival: i_arrival,
                    i_drive: i_drive,
                    o_prep: o_prep,
                    o_shower: o_shower,
                    o_get_ready: o_get_ready,
                    o_leave: o_leave,
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('Event created successfully!');
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error creating event');
            });
        });
    };
    
    if (getReadyButton) {
        getReadyButton.addEventListener('click', function(event) {
            let userInput = storeInput();
            let result = calculateGetReady(userInput);
            displayOutput(userInput.taskName, result.tasks);

            // Send to Server
            event.preventDefault();
    
            let user_id = 1
            let name = userInput.taskName
            let date = userInput.taskDate
            let i_arrival = userInput.arriveTime
            let i_drive = userInput.driveTime
            let o_prep = result.prepByFinal
            let o_get_ready = result.getReadyByFinal
            let o_leave = result.leaveByFinal
            
            fetch('/add_event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    name: name,
                    date: date,
                    i_arrival: i_arrival,
                    i_drive: i_drive,
                    o_prep: o_prep,
                    o_get_ready: o_get_ready,
                    o_leave: o_leave,
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('Post created successfully!');
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error creating post');
            });
        });
    };
    
    if (driveButton) {
        driveButton.addEventListener('click', function(event) {
            let userInput = storeInput();
            let result = calculateDrive(userInput);
            displayOutput(userInput.taskName, result.tasks);

            // Send to Server
            event.preventDefault();
    
            let user_id = 1
            let name = userInput.taskName
            let date = userInput.taskDate
            let i_arrival = userInput.arriveTime
            let i_drive = userInput.driveTime
            let o_prep = result.prepByFinal
            let o_leave = result.leaveByFinal
            
            fetch('/add_event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    name: name,
                    date: date,
                    i_arrival: i_arrival,
                    i_drive: i_drive,
                    o_prep: o_prep,
                    o_leave: o_leave,
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('Post created successfully!');
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error creating post');
            });
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

    return { taskName, arriveTime, driveTime, taskDate }
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

function fetchEventHistory(userId) {
    fetch(`/event_history/user/${userId}`)
    .then(response => response.json())
    .then(events => {
        const eventsContainer = document.getElementById('eventsContainer');
        eventsContainer.innerHTML = '';

        events.forEach(event => {

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${event.date}</td>
                <td>${event.name}</td>
                <td>${event.o_prep}</td>
                <td>${displayValue(event.o_shower)}</td>
                <td>${displayValue(event.o_get_ready)}</td>
                <td>${event.o_leave}</td>
                <td>${event.i_drive}</td>
                <td>${amPmConversion(event.i_arrival)}</td>
                <td>${displayValue(event.result)}</td>
                <td>${displayValue(event.notes)}</td>
            `;
            // console.log('name: ', event.name, 'date: ', event.date, 'arrival: ', event.i_arrival, 'drive: ', event.i_drive, 'prep: ', event.o_prep, 'shower: ', event.o_shower, 'get ready: ', event.o_get_ready, 'leave: ', event.o_leave, 'result: ', event.result, 'notes: ', event.notes);
            eventsContainer.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching events:', error));
};
