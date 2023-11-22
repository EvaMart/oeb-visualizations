// Generates mock data to test the component "accessibilityPlot".
// 30 days of data are generated, with a random number of uptime between 20 and 100.
// The status is set to "up" if the uptime is between 30 and 90, "down" if it is below 30, and "NA" if it is above 90.

const moment = require('moment');

const dates = [];
for (let i = 0; i < 30; i++) {
    const date = moment().add(i, 'days').format('YYYY-MM-DD');
    dates.push(date);
    }
dates.sort((a, b) => a.localeCompare(b));
console.log(dates)
const numbers = [];
const status = [];
for (let i = 0; i < 30; i++) {
    var number = Math.floor(Math.random() * 81) + 20;
    if(number>30 && number<90){
        status.push('up')
    }else if(number>=90){
        status.push('NA')
        number = null
    }else{
        status.push('down')
        number = null
    }
    numbers.push(number);
}

const data = {
    date: dates,
    uptime: numbers,
    status: status
}

export { data }