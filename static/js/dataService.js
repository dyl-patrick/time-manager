import { displayValue, amPmConversion } from "/static/js/conversions.js";

export function login(username, password) {
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
            window.location.href = '/dashboard';
        } else if (data.error) {
            console.error('Login failed:', data.error);
            alert('Login failed: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
};

export function signUpValidation(email, username, password, valid) {
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

    return valid;
};

export function addPreferences(user_id, prep, shower, get_ready, fluff, date_created) {
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
        return true;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating preferences');
        return false;
    });
};

export function addUser(f_name, l_name, email, username, password) {
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
        window.location.href = '/login';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating user');
    });
};

export function wakeUpPOST(user_id, name, date, i_arrival, i_drive, o_prep, o_shower, o_get_ready, o_leave) {
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
};

export function getReadyPOST(user_id, name, date, i_arrival, i_drive, o_prep, o_get_ready, o_leave) {
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
};

export function drivePOST(user_id, name, date, i_arrival, i_drive, o_prep, o_leave) {
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
};

export function getEventHistory(userId) {
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
            eventsContainer.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching events:', error));
};

export function getUserPreferences(userId) {
    return fetch(`/get_preferences/${userId}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(preferences => {
        var fluff = preferences.fluff;
        var prep = preferences.prep;
        var shower = preferences.shower;
        var getReady = preferences.get_ready;
        console.log("getUserPreferences")
        return { fluff, prep, shower, getReady };
    })
    .catch(error => console.error('Error fetching preferences:', error));
};
