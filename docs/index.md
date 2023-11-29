# Overview

OEB Visualizations is a collection of Vue components for data visualization in OpenEBench. 

## Installation

To install the package run: 

```sh
npm install @inb/oeb_visualizations
``` 


## Usage

### In Vue applications
> :bulb: You can find more complete examples in the documentation of each component.

Import the `citationsPlot` in your Vue component and add it to the `components` section. Then use the component in the template.

```html
<template>
    <div>
        <citationsPlot :dataTraces="data" />
    </div>
</template>
<script>
import citationsPlot from '@inb/oeb_visualizations'

export default {
  name: 'IndexPage',
  components: {
    citationsPlot
  },
    data(){
        return {
            data: [
                // Your data for the plot
            ]
        }
    }
}
</script>

``` 

### In HTML pages 
> :bulb: You can find a complete example [here](https://github.com/inab/oeb-visualizations/tree/main/examples/html). 
> Also available as a [Code Pen](https://codepen.io/Eva-Mart-n-Del-Pico/pen/MWLBjPX).


`oeb_visualization` components can be embedded in any page.To do so:

- Include oeb_visualizations and its dependencies (Vue and Plotly) in your HTML file. 
    ```html
    <script src="https://cdn.jsdelivr.net/npm/@inb/oeb_visualizations/dist/oeb-visualizations.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    ```
- Create a Vue instance and register the oeb_visualizations component you are going to use (`citationsPlot` in this example).
    ```html
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                // Other data available to the Vue instance goes here
                dataPlot: {
                    // Your data for the plot
                }
            }
        })

        Vue.component('citations-plot', 'oeb_visualizations'.citationsPlot)
    </script>
    ```
- Finally, create a div where Vue will be active (id=`#app`) and add your components under it (not necessarily as direct child). 
    ```html
    <div id="app">
        <citations-plot :dataTraces="dataPlot"></citations-plot>
    </div>
    ```

