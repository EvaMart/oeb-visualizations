<template>
    <div  :id="divId">
    </div>
</template>
<script>
import Plotly from 'plotly.js-dist'
import { randstr } from '../utils';


export default {

    name: 'ScatterPlot',
    props: {
        x: {
            type: Array,
            required: true
        },
        y: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            divId: randstr('scatter_plot_'),
        }
    },
}

</script>