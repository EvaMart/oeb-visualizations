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
        var trace = {
                // x is an arrary of 30 dates
                x: data.date,
                y: data.uptime,
                mode: 'lines',
                type: 'scatter',
                line:{
                    color: 'black',
                    width: 1
                },
                marker: {
                    
                },
            };
            
        var bars = {
            x: data.date,
            y: Array(30).fill(120),
            marker:{
                color: this.generateColor(data.status, 0.2)
            },
            type:"bar",
        };

        var barsShort = {
            x: data.date,
            y: Array(30).fill(2),
            marker:{
                color: this.generateColor(data.status, 0.8)
            },
            type:"bar",
        };


        const dat = [trace, barsShort, bars];
        const layout = {
            bargap : 0.0,
            barmode: 'stack',
            showlegend: false,
            height: 350,
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
                title: 'Time (ms)',
                titlefont: {
                    size: 10
                },
                tickfont: {
                    size: 8
                }
            },
            template: 'plotly_white'
        }

        Plotly.newPlot('plot', dat, layout);

    },
    methods: {
        generateColor(values, transparency){
            let colors = []
            for(let i =0; i<30; i++){
                switch (values[i]){
                    case "up":
                        colors.push(`rgba(218, 247, 223,${transparency})`)
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
        }
    }
}

</script>