const prepLength = 45;
const showerLength = 30;
const getReadyLength = 30;
const fluff = 15;


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('wakeUp').addEventListener('click', function() {

        let finalTimes = calculateTimes();

        displayOutput(finalTimes);

        function calculateTimes() {
            // Store User Input
            let taskName = document.getElementById('taskName').value;
            let arriveTime = document.getElementById('arriveTime').value;
            let driveTime = document.getElementById('driveTime').value;
            driveTime = convertToNumber(driveTime);
    
            // Turn Arrive Time to Minutes for Calculations
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
            
            // Display Output
            console.log('Prep By:', prepByFinal);
            console.log('Shower By:', showerByFinal);
            console.log('Get Ready By:', getReadyByFinal);
            console.log('Leave By:', leaveByFinal);
            console.log('Arrival Time:', arriveTimeFinal);
    
            return { taskName, arriveTimeFinal, leaveByFinal, getReadyByFinal, showerByFinal, prepByFinal };            
        };
        
        function displayOutput({ taskName, arriveTimeFinal, leaveByFinal, getReadyByFinal, showerByFinal, prepByFinal }) {
            const htmlContent = `
                <section class="my-6 card">
                    <h2 class="text-2xl py-4">${taskName}</h2>
                    <table class="min-w-full md:min-w-0 md:w-1/2 lg:w-1/3 xl:w-1/4 divide-y divide-gray-200 border border-gray-400 ">
                        <thead class="bg-primary-600">
                            <tr>
                                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400">Task</th>
                                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400">Time</th>
                            </tr>
                        </thead>
                        <tbody class="bg-primary-400 divide-y divide-gray-200">
                            <tr>
                                <td class="px-3 py-2 whitespace-nowrap border border-gray-400">Prep At</td>
                                <td class="px-3 py-2 whitespace-nowrap border border-gray-400">${prepByFinal}</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 whitespace-nowrap border border-gray-400">Shower At</td>
                                <td class="px-3 py-2 whitespace-nowrap border border-gray-400">${showerByFinal}</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 whitespace-nowrap border border-gray-400">Get Ready At</td>
                                <td class="px-3 py-2 whitespace-nowrap border border-gray-400">${getReadyByFinal}</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 whitespace-nowrap border border-gray-400">Leave At</td>
                                <td class="px-3 py-2 whitespace-nowrap border border-gray-400">${leaveByFinal}</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 whitespace-nowrap border border-gray-400">Arrive At</td>
                                <td class="px-3 py-2 whitespace-nowrap border border-gray-400">${arriveTimeFinal}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            `;
            
            // Insert into element
            let parentElement = document.getElementById("output");
            parentElement.innerHTML = htmlContent;
    
            /*
            let h2 = document.createElement("h2");
            h2.innerText = "Output";
            document.body.appendChild(h2);
            */
    
    
        };
    
    });


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
