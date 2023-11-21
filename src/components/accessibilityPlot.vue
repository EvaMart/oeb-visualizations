<template>
    <div id="plot">
    </div>
</template>
<script>

import Plotly from 'plotly.js-dist'

import {data} from '../data/dateTime'

export default {
    name: 'accessibilityPlot',
    mounted() {
        var traces = this.buildTimeTraces(data)
        // add in the bar traces at beginning
        traces = traces.concat(this.buildBarTraces(data))
        
        // average time without null values
        const nonNullValues = data.uptime.filter(value => value !== null);
        const sum = nonNullValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const averageUptime = sum / nonNullValues.length;
        const firstDate = new Date(data.date[0])
        firstDate.setDate(firstDate.getDate() - 1)

        const lastDate = new Date(data.date[data.date.length - 1])
        lastDate.setDate(lastDate.getDate() + 1)

        console.log(averageUptime)
        const avgUptimeTrace = {
            x: [firstDate, lastDate],
            y: [averageUptime, averageUptime],
            name: 'Average access time',
            showlegend: true,
            mode: 'lines',
            type: 'scatter',
            line:{
                color: 'rgba(111, 176, 129,.6)',
                width: 1.5,
                dash: '4px'
            },
            marker: {
                size: 5
            },
        };

        traces.push(avgUptimeTrace);

        const layout = {
            bargap : 0.0,
            barmode: 'stack',
            showlegend: true,
            autosize: true,
            height: 400,
            margin: {
                l: 50,
                r: 50,
                b: 70,
                t: 70,
                pad: 4
            },
            xaxis: {
                type: 'date',
                font: {
                    size: 8
                },
                tickfont: {
                        size: 8
                    },
                tickmode: 'linear',
                tick0: Math.min(data.x),
                dtick: 259200000.0,
                tickangle: 45,
                tickformat: "%d %b",
                ticklabelmode: "period"
            },
            yaxis: {
                title: 'Access time (ms)',
                titlefont: {
                    size: 10
                },
                tickfont: {
                    size: 8
                }
            },
            template: 'plotly_white',
            legend: {
                orientation: 'h',
                yanchor: 'bottom',
                y: 1.02,
                xanchor: 'right',
                x: 1,
                font: {
                    size: 8
                }
            },
        }

        Plotly.newPlot('plot', traces, layout);

    },
    methods: {
        generateColor(values, transparency){
            let colors = []
            for(let i =0; i<30; i++){
                switch (values[i]){
                    case "up":
                        colors.push(`rgba(218, 247, 223,0)`)
                        break
                    case "down":
                        colors.push(`rgba(255, 153, 145,${transparency})`)
                        break
                    case "NA":
                        colors.push(`rgba(204,204,204,${transparency})`)
                }
            }
            console.log(colors)
            return colors
        },
        extractSubarraysBetweenNullValues(data) {
            const resultUptime = [];
            const resultDate = [];
            let subarray = [];
            let subarrayDate = [];

            for (let i = 0; i < data.uptime.length; i++) {
                if (data.uptime[i] === null) {
                    if (subarray.length > 0) {
                        resultUptime.push(subarray);
                        resultDate.push(subarrayDate);
                        subarray = [];
                        subarrayDate = []
                    }
                } else {
                    subarray.push(data.uptime[i]);
                    subarrayDate.push(data.date[i])
                }
            }

            if (subarray.length > 0) {
                resultUptime.push(subarray);
                resultDate.push(subarrayDate);
            }

            return { uptime:  resultUptime, date: resultDate};
        },

        buildTimeTraces(data){
            const subarrays = this.extractSubarraysBetweenNullValues(data);

            // iterate over subarrays and build traces
            const traces = [];
            for (let i = 0; i < subarrays.uptime.length; i++) {
                const subarray = subarrays.uptime[i];
                const subarrayDate = subarrays.date[i];
                const showlegend = i === 0 ? true : false;
                const trace = {
                    x: subarrayDate,
                    y: subarray,
                    name: 'Online',
                    legendgroup:'up',
                    showlegend: showlegend,
                    mode: 'markers+lines',
                    type: 'scatter',
                    fill: 'tozeroy',
                    fillcolor: 'rgba(218, 247, 223,.4)',
                    connectgaps: false,
                    line:{
                        color: 'rgba(111, 176, 129,.8)',
                        width: 1.5
                    },
                    marker: {
                        size: 5
                    },
                };
                traces.push(trace);
            }
            return traces;
        },

        extractSubarraysOfNullValues(data, status) {
            const result = [];
            for (let i = 0; i < data.uptime.length; i++) {
                if (data.uptime[i] === null && data.status[i] === status) {
                    result.push(data.date[i]);
                }
            }
            return result;
        },

        buildBarTraces(data){
            const traces = [];
            // Down arrays
            var datesDown = this.extractSubarraysOfNullValues(data, 'down');
            console.log(datesDown)
            const uptimesDown = Array(datesDown.length).fill(2).concat(Array(datesDown.length).fill(120))
            const colorsDown = Array(datesDown.length).fill('rgba(255, 153, 145,.8)').concat(Array(datesDown.length).fill('rgba(255, 153, 145,.2)'))
            datesDown = datesDown.concat(datesDown)
            // NA arrays
            var datesNA = this.extractSubarraysOfNullValues(data, 'NA');
            
            const uptimesNA = Array(datesNA.length).fill(2).concat(Array(datesNA.length).fill(120))
            const colorsNA = Array(datesNA.length).fill('rgba(204,204,204,.8)').concat(Array(datesNA.length).fill('rgba(204,204,204,.2)'))
            datesNA = datesNA.concat(datesNA)

            // build one trace per status
            
            const traceDown = {
                x: datesDown,
                y: uptimesDown,
                marker:{
                    color: colorsDown
                },
                name: 'Offline',
                type:"bar",
            };
            traces.push(traceDown);
            

            const traceNA = {
                x: datesNA,
                y: uptimesNA,
                marker:{
                    color: colorsNA
                },
                name: 'No information captured',
                type:"bar",
            };
            traces.push(traceNA);
        
            return traces;
        }
    }
}

</script>