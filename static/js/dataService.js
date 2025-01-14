import { displayValue, amPmConversion } from "/static/js/utilities.js";

export async function login(username, password) {
    return fetch('/login-request', {
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

export async function addPreferences(user_id, prep, shower, get_ready, fluff, date_created) {
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
        window.location.href = '/login';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating preferences');
    });
};

export async function addUser(f_name, l_name, email, username, password) {
    try {
        const response = await fetch('/add_user', {
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
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create user');
        }
        alert('User created successfully!');
        console.log(data);
        return { valid: true, user_id: data.user_id };
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating user');
        return { valid: false, user_id: null };
    };
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
        alert('Event created successfully!');
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

export async function getUserPreferences() {
    try {
        const response = await fetch('/get_preferences')
        if (!response.ok) {
            throw new Error('Failed to fetch preferences');
        }
        const data = await response.json();
        const { fluff, prep, shower, get_ready: getReady } = data;
        console.log("Preferences retrieved:", { fluff, prep, shower, getReady });

        return { fluff, prep, shower, getReady };

    } catch (error) {
        console.error('Error fetching preferences:', error);
        return { error: error.message };
    }
};

export async function logout() {
    const response = await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    window.location.href = '/';
}

export async function getUserID() {
    try {
        const response = await fetch('/get_user_id')
        if (!response.ok) {
            throw new Error('Failed to fetch User ID');
        }
        const data = await response.json();;
        console.log(data, typeof(data));

        return data;

    } catch (error) {
        console.error('Error fetching preferences:', error);
        return { error: error.message };
    }
};