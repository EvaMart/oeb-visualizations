## Data 

Data is provided to the component as an array of objects through the `dataItems` prop. Each object represents an access to the server. The object must have the following keys: `access_time`, `date` and `code`. 
- `access_time`: time it took to access the server in ms.  
-  `date`: date of the access. Should not be null.
- `code`: HTTP code returned by the server. If `null` the bar will be colored with the color specified in the `colorNA` prop. If the code is an error code the bar will be colored with the color specified in the `colorOffline` prop. If the code is 200 the bar will be colored with the color specified in the `colorOnline` prop. 

Example:

```json
[
	{
		"date": "2022-10-23T07:54:06.716122Z",
		"code": 200,
		"access_time": 51
	},
	{
		"date": "2022-10-24T07:58:50.609475Z",
		"code": 200,
		"access_time": 67
	},
	{
		"date": "2022-10-25T07:51:53.841140Z",
		"code": 200,
		"access_time": 55
	}
]
```

## Props

| Name | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
|dataItems | Array | Array of objects  with keys `access_time`, `date` and `code`. <br> More details in "Data" section | | true |
| height | Number | Height of the plot in pixels. | 400 | false |
| width | Number | Width of the plot in pixels. | 700 | false |
| colorNA | String | Color of bars for which there is no monitoring information (`code`=`null`). RGB format: `"<R>, <G>, <B>"` | 204, 204, 204 | false |
| colorOffline | String | Color of bars for which the server was offline (`code` is an error code). RGB format: `"<R>, <G>, <B>"` | 255, 153, 145 | false |
| colorOnline | String | Color of bars for which the server was online (`code` is 200). RGB format: `"<R>, <G>, <B>"` | 111, 176, 129 | false |
| yaxisTitle | String | Title of the y axis. | Access time (ms) | false |
| xaxisTitle | String | Title of the x axis. | Date | false |
| dtick | String | Tick interval for the x axis in unix epoch. Ignored if "sixMonths" is `true` | 86400000 | false |
| week | Boolean | If `true` the x axis axis will contain the day of the week (Monday, Tuesday, ...). | false | false |
| sixMonths | Boolean | If `true` the x axis will be divided in 6 months intervals. | false | false |

## Usage 

### In Vue applications

Import the `accessibilityPlot` in your Vue component and add it to the `components` section. Then use the component in the template.

```html
<template>
    <div>
        <accessibilityPlot :dataItems="data" />
    </div>
</template> 

<script>
import { accessibilityPlot } from '@inb/oeb_visualizations'

export default {
  components: {
    accessibilityPlot
  },
  data(){
    return {
      data: [
        {
          "date": "2022-10-23T07:54:06.716122Z",
          "code": 200,
          "access_time": 51
        },
        {
          "date": "2022-10-24T07:58:50.609475Z",
          "code": 200,
          "access_time": 67
        },
        {
          "date": "2022-10-25T07:51:53.841140Z",
          "code": 200,
          "access_time": 55
        }
      ]
    }
  }
}
</script>
```

### In HTML pages 

Import the `oeb_visualizations` and its dependencies (Vue and Plotly) in your HTML file. 

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script src="https://cdn.jsdelivr.net/npm/@inb/oeb_visualizations/dist/oeb-visualizations.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    </head>
    <body>
        <div id="app">
            <accessibility-plot :data-items="dataToPlot" ></accessibility-plot>
        </div>
    </body>
    <script>
        const data = [
            {
                "date": "2022-10-23T07:54:06.716122Z",
                "code": 200,
                "access_time": 51
            },
            {
                "date": "2022-10-24T07:58:50.609475Z",
                "code": 200,
                "access_time": 67
            },
            {
                "date": "2022-10-25T07:51:53.841140Z",
                "code": 200,
                "access_time": 55
            }
        ]

        Vue.component('accessibility-plot', 'oeb_visualizations'.accessibilityPlot)

        let app = new Vue(
            { 
                el: '#app', 
                data: { 
                    dataToPlot: data 
                    }  
            })

    </script>
</html>
``` 
