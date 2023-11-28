<template>
    <div  :id="divId">
    </div>
</template>
<script>

import Plotly from 'plotly.js-dist'
import { randstr } from '../utils';


export default {
    name: 'accessibilityPlot',
    data: () => ({
        divId: randstr('acc_plot')
    }),
    props: {
        dtick: {
            /*
            dtick is the interval between ticks on the x axis in ms.
            */
            type: Number,
            required: false,
            default: 86400000.0
        },
        xaxisTitle: {
            /*
            xaxisTitle is the title of the x axis.
            */
            type: String,
            required: false,
            default: 'Date'
        },
        yaxisTitle: {
            /*
            yaxisTitle is the title of the y axis.
            */
            type: String,
            required: false,
            default: 'Access time (ms)'
        },
        colorOnline: {
            /*
            colorOnline is the color of the online line.
            format: "<R>, <G>, <B>"
            */
            type: String,
            required: false,
            default: '111, 176, 129'
        },
        colorOffline: {
            /*
            colorOffline is the color of the offline bars.
            format: "<R>, <G>, <B>"
            */
            type: String,
            required: false,
            default: '255, 153, 145'
        },
        colorNA: {
            /*
            colorNA is the color of the NA bars.
            format: "<R>, <G>, <B>"
            */
            type: String,
            required: false,
            default: '204,204,204'
        },
        height: {
            /*
            height is the height of the plot in px.
            */
            type: Number,
            required: false,
            default: 350
        },
        dataItems: {
            /*
            dataItems is an array of objects with keys "access_time", "date" and "code".
                - access_time is the time it took to access the server in ms.
                - date is the date of the access.
                - code is the HTTP code returned by the server.
            Each object represents an access to the server.
            */
            type: Array,
            required: true,
            validator: function (value) {
                /*
                This function validates the dataItems prop. It throws a console error if the prop is not valid.
                TODO: apply vue-types to define the prop. 
                https://github.com/dwightjack/vue-types
                */
                for(let i=0; i<value.length; i++){
                    // The value must be an array of objects with keys "access_time", "date" and "code"
                    if(!value[i].hasOwnProperty('access_time')){
                        console.error(`[oeb-visualizations warn] access_time key is missing in dataItems prop item (at position ${i})`)
                    }else if(!value[i].hasOwnProperty('date')){
                        console.error(`[oeb-visualizations warn] date key is missing in dataItems prop item (at position ${i})`)
                    }else if(!value[i].hasOwnProperty('code')){
                        console.error(`[oeb-visualizations warn] code key is missing in dataItems prop item (at position ${i})`)
                    }
                    // Access time must be null or a number
                    if(value[i].access_time !== null && typeof value[i].access_time !== 'number'){
                        console.error(`[oeb-visualizations warn] access_time must be null or a number in dataItems prop item (at position ${i})`)
                    }
                    // Code must be null or a number
                    if(value[i].code !== null && typeof value[i].code !== 'number'){
                        console.error(`[oeb-visualizations warn] code must be null or a number in dataItems prop item (at position ${i})`)
                    }
                    // Date must be a string containing a date
                    if(typeof value[i].date !== 'string' || isNaN(Date.parse(value[i].date))){
                        console.error(`[oeb-visualizations warn] date must be a string containing a date in dataItems prop item (at position ${i})`)
                    }

                    // And date cannot be null
                    if(value[i].date === null){
                        console.error(`[oeb-visualizations warn] date cannot be null in dataItems prop item (at position ${i})`)
                    }
                }
                return true
            }
        }
    },
    mounted() {
         
        var traces = this.buildOnlineTraces(this.dataItems) // generate line traces
        
        traces = traces.concat(this.buildOfflineNATraces(this.dataItems))//  generate bar traces
    
        const layout = {
            bargap : 0.0,
            barmode: 'stack',
            showlegend: true,
            autosize: true,
            height: this.height,
            margin: {
                l: 50,
                r: 50,
                b: 70,
                t: 70,
                pad: 4
            },
            xaxis: {
                type: 'date',
                title: this.xaxisTitle,
                font: {
                    size: 10
                },
                tickfont: {
                        size: 10
                    },
                tickmode: 'linear',
                tick0: this.dataItems[0].date,
                dtick: this.dtick,
                tickangle: 45,
                tickformat: "%d %b",
            },
            yaxis: {
                title: this.yaxisTitle,
                titlefont: {
                    size: 10
                },
                tickfont: {
                    size: 10
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
            hoverlabel: { bgcolor: "#FFF" },
            hovermode: 'closest',
        }

        Plotly.newPlot(this.divId, traces, layout);
        
    },
    methods: {
        generateColor(values, transparency){
            /*
            Parameters:
                - values: array of values. Values must be in ["up", "down", "NA"]
                - transparency: float between 0 and 1

            Returns an array of colors in the form "rgba(255, 153, 145,0.8)"
            */
            let colors = []
            for(let i =0; i<30; i++){
                switch (values[i]){
                    case "up":
                        colors.push(`rgba(${this.colorOnline},0)`)
                        break
                    case "down":
                        colors.push(`rgba(${this.colorOffline},${transparency})`)
                        break
                    case "NA":
                        colors.push(`rgba(${this.colorNA},${transparency})`)
                }
            }
            return colors
        },

        extractSubarraysBetweenNullValues(data) {
            /*
            This function extracts subarrays of access_time between null values. 
            This is, consecutive access_time values that are not null and separated by null values.
            It also creates the subarrays of dates for those access_time values.
            It also computes the average access time of the whole data.

            Parameters:
                - data: array of objects with keys "access_time" and "date". access_time can be null

            Returns an object with keys:
                - access_time: array of arrays of access_time values
                - date: array of arrays of dates
                - average_access_time: average access time of the whole data
            */
            
            var subarrays = {
                access_time: [],
                date: [],
                average_access_time: 0
            };

            var subarrayTime = [];
            var subarrayDate = [];

            var sum = 0;
            var nonNullValues = 0;

            for(let i=0; i<data.length; i++){
                if(data[i].access_time !== null){
                    // keep adding to subarray
                    subarrayTime.push(data[i].access_time);
                    subarrayDate.push(data[i].date);
                    sum += data[i].access_time;
                    nonNullValues += 1;

                }else{
                    // Push subarray to subarrays and reset subarray
                    if(subarrayTime.length>0){
                        subarrays.access_time.push(subarrayTime);
                        subarrays.date.push(subarrayDate);
                        subarrayTime = [];
                        subarrayDate = [];
                    }
                }                
            }
            // push last subarray
            subarrays.access_time.push(subarrayTime);
            subarrays.date.push(subarrayDate);

            // compute average access time
            subarrays.average_access_time = sum / nonNullValues;

            return subarrays;
        },

        buildAccessTimeTraces(subarrays){
            /*
            This function builds the line traces of access time between null values. 
            
            Arguments:
                - subarrays: object with keys "access_time" and "date". 
                    - access_time is an array of arrays of access_time values. 
                    - date is an array of arrays of dates.
            Returns an array of line traces
            */

            var traces = []; // stores resulting traces

            // iterate over subarrays and build line traces
            for (let i = 0; i < subarrays.access_time.length; i++) {
                
                const subarray = subarrays.access_time[i];
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
                    fillcolor: `rgba(${this.colorOnline},.2)`,
                    connectgaps: false,
                    line:{
                        color: `rgba(${this.colorOnline},.8)`,
                        width: 1.5
                    },
                    marker: {
                        size: 5
                    },
                    hovertemplate: '<b>Online</b><br>%{x|%d %b %Y}<br>%{y} ms <extra></extra>',
                    hoveron: 'points+fills'
                };
                traces.push(trace);
            }

            return traces

        },

        buildAvgAccessTimeTrace(avgAccessTime){
            /*
            This function builds the line trace of the average access time of the whole data. 
            The trace is an horizontal line at y=average access time.

            Arguments:
                - avgAccessTime: average access time of the whole data

            Returns a line trace
            */
            
            // set start and end dates so that the line spands the whole plot
            const firstDate = new Date(this.dataItems[0].date)
            firstDate.setDate(firstDate.getDate() - 1) // one day before the first date in data

            const lastDate = new Date(this.dataItems[this.dataItems.length - 1].date)
            lastDate.setDate(lastDate.getDate() + 1) // one day after the last date in data

            const trace = {
                x: [firstDate, lastDate],
                y: [avgAccessTime, avgAccessTime],
                name: 'Average access time',
                showlegend: true,
                mode: 'lines',
                type: 'scatter',
                line:{
                    color: `rgba(${this.colorOnline},.6)`,
                    width: 1.5,
                    dash: '4px'
                },
                marker: {
                    size: 5
                },
                // avg access time with 2 decimals
                hovertemplate: '<b>Average access time</b><br>%{y:.2f} ms <extra></extra>', 
            };

            return trace

        },
         
        buildOnlineTraces(data){
            /* 
            This function builds one trace per subarray of access_time between null values.
            It also builds the trace of the average access time of the whole data.
            [i] Why not just one trace for access_time? 
            [i] Because if we do that, the area under null values is filled too.
            Arguments:
                - data: array of objects with keys "access_time" and "date". access_time can be null
            Returns an array of traces
            */ 

            const subarrays = this.extractSubarraysBetweenNullValues(data);
            
            var traces = this.buildAccessTimeTraces(subarrays);

            traces.push(this.buildAvgAccessTimeTrace(subarrays.average_access_time));

            return traces;
        },

        extractOfflineNADates(data) {
            /*
            This function extracts dates with access_time null. 
            Depending on the code, the server is offline or NA on those dates.

            Arguments:
                - data: array of objects with keys "access_time", "date" and "code". access_time and code can be null
            
            Returns an object with keys:
                - NA: array of dates with access_time null and code null
                - down: array of dates with access_time null and code in errorCodes
            */
            const errorCodes = [404, 500, 502, 503, 504];
            
            const resultNA = [];
            const resultOffline = [];

            for (let i = 0; i < data.length; i++) {
                // if the access_time is null and the code is null, it means that the monitoring was down
                if (data[i].access_time === null && data[i].code === null) {
                    resultNA.push(data[i].date);
                // if the access_time is null and the code is in errorCodes, it means that the server is offline
                }else if(data[i].access_time === null && errorCodes.includes(data[i].code)){
                    resultOffline.push(data[i].date);
                }
            }
            return {
                NA: resultNA,
                down: resultOffline
            };
        },

        barTrace(data, name, showlegend, hoverinfo, hovertemplate){
            /*
            This function builds a bar trace.
            Arguments:
                - data: object with keys "dates" and "access_times"
                    - dates: array of dates
                    - access_times: array of access_times
                    - colors: array of colors in rgba format (eg:"rgba(255, 153, 145,0.8)")
                - name: name of the trace
            */
            const trace = {
                x: data.dates,
                y: data.access_times,
                marker:{
                    color: data.colors
                },
                name: name,
                type:"bar",
                legendgroup: name,
                showlegend: showlegend,
                hoverinfo: hoverinfo,
                hovertemplate: hovertemplate,
            };

            return trace;
        },

        buildBarTraces(dates, color, label){
            /*
            This function builds the series used to display the offline/NA bars.
            For each date, two columns are created: one very short and one tall. 
            These columns cover the whole plot height. 
            The tall column is colored with colorStrong and the short one with colorLight.

            Arguments:
                - dates: array of dates
                - color: color of the bars

            Returns array with offline and NA traces

            */

            const colorStrong = `rgba(${color},.8)`
            const colorLight = `rgba(${color},.2)`

            const dataShort = {
                dates: dates,
                access_times: Array(dates.length).fill(2),
                colors: Array(dates.length).fill(colorStrong)
            }
            const dataTall = {
                dates: dates,
                access_times: Array(dates.length).fill(120),
                colors: Array(dates.length).fill(colorLight)
            }
            const hovertemplate = `<b>${label}</b><br>%{x|%d %b %Y}<br>%{y} ms <extra></extra>`

            const traceShort = this.barTrace(dataShort, label, false, 'skip', '')
            const traceTall = this.barTrace(dataTall, label, true, 'all', hovertemplate)

            return [traceShort, traceTall]
            
        },

        buildOfflineNATraces(data){
            /*
            This function builds the bar traces of offline and NA values.

            Arguments:
            - data: array of objects with keys "access_time", "date" and "code". access_time and code can be null
            
            Returns an array of bar traces
            */

            var traces = [];
            const arrays = this.extractOfflineNADates(data);

            // Down arrays
            traces = traces.concat(this.buildBarTraces(arrays.down, this.colorOffline, 'Offline'))
                        
            // NA arrays
            traces = traces.concat(this.buildBarTraces(arrays.NA, this.colorNA, 'No information available'))

            return traces;
        }
    }
}

</script>