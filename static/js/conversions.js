export function hoursToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);

    const totalMinutes = (hours * 60) + minutes;
    return totalMinutes;
};

export function convertToStandardTime(newMinutes) {
    const hours = Math.floor(newMinutes / 60);
    const newerMinutes = newMinutes % 60;

    // Determine AM or PM suffix
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hour to 12-hour format
    const standardHour = hours % 12 || 12; // This handles "0" hour as "12" for 12 AM

    // Format minutes to always appear as two digits
    const formattedMinutes = newerMinutes < 10 ? '0' + newerMinutes : newerMinutes;

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