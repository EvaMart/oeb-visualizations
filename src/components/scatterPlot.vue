<template>
    <div  :id="divId">
    </div>
</template>
<script>
import Plotly, { A } from 'plotly.js-dist'
import { randstr } from '../utils';


export default {

    name: 'scatterPlot',
    props: {
        data: {
            type: Array,
            required: true
        },
        pareto: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            divId: randstr('scatter_plot_'),
            traces: []
        }
    },
    mounted() {

        // We need to add mode and type to each trace
        console.log(this.data);

        this.traces = this.data.map((trace) => {
            return {
                x: trace.x,
                y: trace.y,
                error_x: trace.error_x,
                error_y: trace.error_y,
                mode: 'markers',
                type: 'scatter',
                name: trace.name
            }
        });
        
        console.log(this.traces);
        // Add pareto trace
        if (this.pareto) {
            // build x and y arrays
            const x = [];
            const y = [];
            for (let i = 0; i < this.pareto.length; i++) {
                x.push(this.pareto[i][0]);
                y.push(this.pareto[i][1]);
            }
            console.log(x)
            console.log(y)
            this.traces.push({
                x: x,
                y: y,
                mode: 'lines',
                type: 'scatter',
                name: 'Pareto'
            });
        }

    
        const layout = {
            xaxis: {
                title: 'X Axis',
            },
            yaxis: {
                title: 'Y Axis',
            }
        };

        Plotly.newPlot(this.divId, this.traces, layout);
    }
}

</script>