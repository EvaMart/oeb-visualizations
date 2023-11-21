// Generates mock data to test the component "accessibilityPlot".

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