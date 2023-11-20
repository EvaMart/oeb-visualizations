// Generates mock data to test the components.

const moment = require('moment');

const dates = [];
for (let i = 0; i < 30; i++) {
    const date = moment().add(i, 'days').format('YYYY-MM-DD');
    dates.push(date);
    }
dates.sort((a, b) => a.localeCompare(b));

const numbers = [];
const status = [];
for (let i = 0; i < 30; i++) {
    const number = Math.floor(Math.random() * 81) + 20;
    numbers.push(number);
    if(number>40){
        status.push('up')
    }else if(number>100){
        status.push('NA')
    }else{
        status.push('down')
    }
}

const data = {
    date: dates,
    uptime: numbers,
    status: status
}

export { data }