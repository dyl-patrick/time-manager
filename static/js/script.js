const prepLength = 45;
const showerLength = 30;
const getReadyLength = 30;
const fluff = 15;


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('wakeUp').addEventListener('click', function() {

        let userInput = storeInput();
        calculateWakeUp(userInput);

        function calculateWakeUp({ taskName, arriveTime, driveTime }) {
                
            // Turn Arrive Time to Minutes
            arriveTime = hoursToMinutes(arriveTime);
            let arriveTimeFinal = minutesToHour(arriveTime);
    
            // Leave By (15 Minute Fluff Added)
            let leaveBy = arriveTime - driveTime - fluff;
            let leaveByFinal = minutesToHour(leaveBy);
    
            // Get Ready By
            let getReadyBy = leaveBy - getReadyLength;
            let getReadyByFinal = minutesToHour(getReadyBy);
    
            // Shower By
            let showerBy = getReadyBy - showerLength;
            let showerByFinal = minutesToHour(showerBy);
    
            // Prep By
            let prepBy = showerBy - prepLength;
            let prepByFinal = minutesToHour(prepBy);

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
                            <tr>
                                <td>Prep At</td>
                                <td>${prepByFinal}</td>
                            </tr>
                            <tr>
                                <td>Shower At</td>
                                <td>${showerByFinal}</td>
                            </tr>
                            <tr>
                                <td>Get Ready At</td>
                                <td>${getReadyByFinal}</td>
                            </tr>
                            <tr>
                                <td>Leave At</td>
                                <td>${leaveByFinal}</td>
                            </tr>
                            <tr>
                                <td>Arrive At</td>
                                <td>${arriveTimeFinal}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            `;
            
            // Insert into element
            let parentElement = document.getElementById("output");
            parentElement.innerHTML = htmlContent;
        };
    
    });

    document.getElementById('getReady').addEventListener('click', function() {

        let userInput = storeInput();
        calculateGetReady(userInput);

        function calculateGetReady({ taskName, arriveTime, driveTime }) {
    
            // Turn Arrive Time to Minutes
            arriveTime = hoursToMinutes(arriveTime);
            let arriveTimeFinal = minutesToHour(arriveTime);
    
            // Leave By (15 Minute Fluff Added)
            let leaveBy = arriveTime - driveTime - fluff;
            let leaveByFinal = minutesToHour(leaveBy);
    
            // Get Ready By
            let getReadyBy = leaveBy - getReadyLength;
            let getReadyByFinal = minutesToHour(getReadyBy);
    
            // Prep By
            let prepBy = getReadyBy - prepLength;
            let prepByFinal = minutesToHour(prepBy);

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
                            <tr>
                                <td>Prep At</td>
                                <td>${prepByFinal}</td>
                            </tr>
                            <tr>
                                <td>Get Ready At</td>
                                <td>${getReadyByFinal}</td>
                            </tr>
                            <tr>
                                <td>Leave At</td>
                                <td>${leaveByFinal}</td>
                            </tr>
                            <tr>
                                <td>Arrive At</td>
                                <td>${arriveTimeFinal}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            `;
            
            // Insert into element
            let parentElement = document.getElementById("output");
            parentElement.innerHTML = htmlContent;    
        };
    
    });

    document.getElementById('drive').addEventListener('click', function() {

        let userInput = storeInput();
        calculateDrive(userInput);

        function calculateDrive({ taskName, arriveTime, driveTime }) {
    
            // Turn Arrive Time to Minutes
            arriveTime = hoursToMinutes(arriveTime);
            let arriveTimeFinal = minutesToHour(arriveTime);
    
            // Leave By (15 Minute Fluff Added)
            let leaveBy = arriveTime - driveTime - fluff;
            let leaveByFinal = minutesToHour(leaveBy);
    
            // Prep By
            let prepBy = leaveBy - prepLength;
            let prepByFinal = minutesToHour(prepBy);
    
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
                            <tr>
                                <td>Prep At</td>
                                <td>${prepByFinal}</td>
                            </tr>
                            <tr>
                                <td>Leave At</td>
                                <td>${leaveByFinal}</td>
                            </tr>
                            <tr>
                                <td>Arrive At</td>
                                <td>${arriveTimeFinal}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            `;
            
            // Insert into element
            let parentElement = document.getElementById("output");
            parentElement.innerHTML = htmlContent;
        };
    
    });

    function storeInput() {
        let taskName = document.getElementById('taskName').value;
        let arriveTime = document.getElementById('arriveTime').value;
        let driveTime = document.getElementById('driveTime').value;
        driveTime = convertToNumber(driveTime);

        return { taskName, arriveTime, driveTime }
    }

    function hoursToMinutes(time) {
        // Split Hours and Minutes
        const [hours, minutes] = time.split(':').map(Number);

        const totalMinutes = (hours * 60) + minutes;
        return totalMinutes;
    };

    function minutesToHour(minutes) {
        let hours = Math.floor(minutes / 60);
        let remainingMinutes = minutes % 60;
        let meridiem = "";

        if (hours > 12) {
            hours -= 12;
            meridiem = " PM"
        } else {
            meridiem = " AM"
        };

        // Pad with leading zeros
        let paddedMinutes = String(remainingMinutes).padStart(2, '0');

        return `${hours}:${paddedMinutes}${meridiem}`;
    };

    function convertToNumber(string) {
        number = Number(string);
        return number;
    };
});
