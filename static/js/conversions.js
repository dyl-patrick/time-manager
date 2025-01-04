export function hoursToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);

    const totalMinutes = (hours * 60) + minutes;
    return totalMinutes;
};

export function minutesToHour(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    let meridiem = "";

    if (hours > 12) {
        hours -= 12;
        meridiem = " PM"
    } else {
        meridiem = " AM"
    };

    // Leading zeros
    let paddedMinutes = String(remainingMinutes).padStart(2, '0');

    return `${hours}:${paddedMinutes}${meridiem}`;
};

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