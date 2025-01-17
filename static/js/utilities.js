function hoursToMinutes(time) {
    let [hours, minutes] = time.split(':').map(Number);

    return (hours * 60) + minutes;
};

function convertToStandardTime(minutes) {
    const totalMinutesInDay = 1440;
    let normalizedMinutes = (minutes + totalMinutesInDay) % totalMinutesInDay;
    let hours = Math.floor(normalizedMinutes / 60);
    let remainingMinutes = normalizedMinutes % 60;
    let period = hours >= 12 && hours < 24 ? 'PM' : 'AM';
    let standardHour = hours % 12 || 12;
    let formattedMinutes = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;

    return `${standardHour}:${formattedMinutes} ${period}`;
}

export function convertToNumber(string) {
    let number = Number(string);
    return number;
};

export function getDate() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var currentDate = `${yyyy}-${mm}-${dd}`;
    return currentDate;
};

export function displayValue(value) {
    return value === null ? '' : value;
};

export function amPmConversion(time) {
    let htm = hoursToMinutes(time);
    let conversion = convertToStandardTime(htm);
    return conversion;
};

export function toggleButton() {
    var divs = document.getElementsByClassName('toggleDiv');
    for (let div of divs) {  // Loop elements with class 'toggleDiv'
        if (div.style.display === 'none') {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    }
};

export function collapsibleEvent() {
    var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    };
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

export function defaultButton() {
    document.getElementById('defaultLength').addEventListener('click', function() {
        document.getElementById('windDownLength').value = 90;
        document.getElementById('sleepLength').value = 480;
        document.getElementById('prepLength').value = 45;
        document.getElementById('showerLength').value = 30;
        document.getElementById('getReadyLength').value = 30;
        document.getElementById('fluffLength').value = 15;
    });
}

export function calculateWindDown({ arriveTime, driveTime }, { fluff, prep, shower, getReady, sleep, windDown }) {
    console.log(fluff, getReady, shower, prep, sleep, windDown)
    
    arriveTime = hoursToMinutes(arriveTime);
    let arriveTimeFinal = convertToStandardTime(arriveTime);
    
    let leaveBy = arriveTime - driveTime - fluff;
    let leaveByFinal = convertToStandardTime(leaveBy);
    
    let getReadyBy = leaveBy - getReady;
    let getReadyByFinal = convertToStandardTime(getReadyBy);
    
    let showerBy = getReadyBy - shower;
    let showerByFinal = convertToStandardTime(showerBy);
    
    let prepBy = showerBy - prep;
    let prepByFinal = convertToStandardTime(prepBy);
    
    let sleepBy = prepBy - sleep;
    let sleepByFinal = convertToStandardTime(sleepBy);
    
    let windDownBy = sleepBy - windDown;
    let windDownByFinal = convertToStandardTime(windDownBy);

    return {
        tasks: [
            { name: "Wind Down At", time: windDownByFinal },
            { name: "Sleep At", time: sleepByFinal },
            { name: "Prep At", time: prepByFinal },
            { name: "Shower At", time: showerByFinal },
            { name: "Get Ready At", time: getReadyByFinal },
            { name: "Leave At", time: leaveByFinal },
            { name: "Arrive At", time: arriveTimeFinal }
        ],
        windDownByFinal, sleepByFinal, prepByFinal, showerByFinal, getReadyByFinal, leaveByFinal, arriveTimeFinal
    };

};

export function calculateBedtime({ arriveTime, driveTime }, { fluff, prep, shower, getReady, sleep }) {
    console.log(fluff, getReady, shower, prep, sleep)
    
    arriveTime = hoursToMinutes(arriveTime);
    let arriveTimeFinal = convertToStandardTime(arriveTime);
    
    let leaveBy = arriveTime - driveTime - fluff;
    let leaveByFinal = convertToStandardTime(leaveBy);
    
    let getReadyBy = leaveBy - getReady;
    let getReadyByFinal = convertToStandardTime(getReadyBy);
    
    let showerBy = getReadyBy - shower;
    let showerByFinal = convertToStandardTime(showerBy);
    
    let prepBy = showerBy - prep;
    let prepByFinal = convertToStandardTime(prepBy);
    
    let sleepBy = prepBy - sleep;
    let sleepByFinal = convertToStandardTime(sleepBy);

    return {
        tasks: [
            { name: "Sleep At", time: sleepByFinal },
            { name: "Prep At", time: prepByFinal },
            { name: "Shower At", time: showerByFinal },
            { name: "Get Ready At", time: getReadyByFinal },
            { name: "Leave At", time: leaveByFinal },
            { name: "Arrive At", time: arriveTimeFinal }
        ],
        sleepByFinal, prepByFinal, showerByFinal, getReadyByFinal, leaveByFinal, arriveTimeFinal
    };

};

export function calculateWakeUp({ arriveTime, driveTime }, { fluff, prep, shower, getReady }) {
    console.log(fluff, getReady, shower, prep)
    
    arriveTime = hoursToMinutes(arriveTime);
    let arriveTimeFinal = convertToStandardTime(arriveTime);
    
    let leaveBy = arriveTime - driveTime - fluff;
    let leaveByFinal = convertToStandardTime(leaveBy);
    
    let getReadyBy = leaveBy - getReady;
    let getReadyByFinal = convertToStandardTime(getReadyBy);
    
    let showerBy = getReadyBy - shower;
    let showerByFinal = convertToStandardTime(showerBy);
    
    let prepBy = showerBy - prep;
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

export function calculateGetReady({ arriveTime, driveTime }, { fluff, prep, getReady }) {
    arriveTime = hoursToMinutes(arriveTime);
    let arriveTimeFinal = convertToStandardTime(arriveTime);

    let leaveBy = arriveTime - driveTime - fluff;
    let leaveByFinal = convertToStandardTime(leaveBy);

    let getReadyBy = leaveBy - getReady;
    let getReadyByFinal = convertToStandardTime(getReadyBy);

    let prepBy = getReadyBy - prep;
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

export function calculateDrive({ arriveTime, driveTime }, { fluff, prep }) {
    arriveTime = hoursToMinutes(arriveTime);
    let arriveTimeFinal = convertToStandardTime(arriveTime);

    let leaveBy = arriveTime - driveTime - fluff;
    let leaveByFinal = convertToStandardTime(leaveBy);

    let prepBy = leaveBy - prep;
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

export function storeInput() {
    let taskName = document.getElementById('taskName').value;
    let taskDate = document.getElementById('eventDate').value;
    let arriveTime = document.getElementById('arriveTime').value;
    let driveTime = document.getElementById('driveTime').value;
    driveTime = convertToNumber(driveTime);

    return { taskName, arriveTime, driveTime, taskDate };
}

export function displayOutput(taskName, tasks) {
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