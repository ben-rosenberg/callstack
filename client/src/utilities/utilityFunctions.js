const addLeadingZero = (num) => {
    return (num < 10) ? '0' + num.toString() : num.toString();
}

const getDefaultDateString = () => {
    const defaultDate = new Date(Date.now() + 3600000);
    const month = addLeadingZero(defaultDate.getMonth() + 1);
    const date = addLeadingZero(defaultDate.getDate());
    const hours = addLeadingZero(defaultDate.getHours());  
    const minutes = addLeadingZero(defaultDate.getMinutes());

    return `${defaultDate.getFullYear()}-${month}-${date}T${hours}:${minutes}`
}

module.exports = { addLeadingZero, getDefaultDateString };