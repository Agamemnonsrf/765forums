// Decides how long ago a thread or reply was made.
function decideTime(time: string) {
    const date = adjustTZ(new Date(time), -1, 0);

    let now = new Date().getTime();
    let timeAdjusted = adjustTZ(date, 1, 3);
    console.log(timeAdjusted);
    let timeBetween = now - timeAdjusted.getTime();
    let seconds = Math.floor(timeBetween / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    const total = { seconds, minutes, hours, days };
    console.log(total);
    if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (seconds > 0) {
        return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    } else {
        return "just now";
    }
}

//how to create a type which either takes the value 1 or -1
type operation = 1 | -1;
type constTime = 3 | 0;

// Adjusts the timezone of the date object depending on timezone of the user.
// The server is in UTC+3, so we need to adjust it.
function adjustTZ(
    date: Date,
    operation: operation = 1,
    constTime: constTime = 3
): Date {
    const timeZoneSign = date.getTimezoneOffset() > 0 ? 1 : -1;
    date.setTime(
        date.getTime() +
            operation *
                ((date.getTimezoneOffset() / (60 * timeZoneSign) + constTime) *
                    60 *
                    60 *
                    1000)
    );

    return date;
}

// Completes the id of the thread or reply to 8 digits.
function completeId(id: number) {
    let newId = "";
    const length = id.toString().length;
    for (let i = 0; i < 8 - length; i++) {
        newId += "0";
    }
    return newId + id;
}

export { decideTime, completeId, adjustTZ };
