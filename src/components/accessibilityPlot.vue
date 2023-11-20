<template>
    <div>
        Hello Word! 🫶🏻
        <div id="plot">
        </div>
    </div>
</template>
<script>

import Plotly from 'plotly.js-dist'

export default {
    name: 'accessibilityPlot',
    data () {
        return{
            trace : {
                x: [1, 2, 3, 4],
                y: [10, 15, 13, 17],
                mode: 'markers',
                type: 'scatter'
            }
        }
    },
    mounted() {
        const dat = [this.trace]

        Plotly.newPlot('plot', dat);

    }
}

</script>