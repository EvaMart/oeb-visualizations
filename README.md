# OpenEBench Visualizations

Collection of Vue components for data visualization in OpenEBench. 

- Go to the [demo](https://inab.github.io/oeb-visualizations-demo/) to see the components in action.
- This package is available through [npmjs](https://www.npmjs.com/package/@inb/oeb-visualizations).


## Installation

To install the package run: 

```bash
npm install @inb/oeb-visualizations
``` 

## Components

### accessibilityPlot 


#### Data 

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

#### Props

| Name | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
|dataItems | Array | Array of objects  with keys `access_time`, `date` and `code`. <br> More details in "Data" section | | true |
| height | Number | Height of the plot in pixels. | 400 | false |
| colorNA | String | Color of bars for which there is no monitoring information (`code`=`null`). RGB format: `"<R>, <G>, <B>"` | 204, 204, 204 | false |
| colorOffline | String | Color of bars for which the server was offline (`code` is an error code). RGB format: `"<R>, <G>, <B>"` | 255, 153, 145 | false |
| colorOnline | String | Color of bars for which the server was online (`code` is 200). RGB format: `"<R>, <G>, <B>"` | 111, 176, 129 | false |
| yaxisTitle | String | Title of the y axis. | Access time (ms) | false |
| xaxisTitle | String | Title of the x axis. | Date | false |
| dtick | String | Tick interval for the x axis in unix epoch. | 86400000 | false |   

#### Usage 

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

### citationsPlot 

#### Data

Data is provided to the component as an array of objects through the `dataTraces` prop. Each object corresponds to a publication and will be represented as a trace in the resulting plot. They have the following keys: `data`, `id`, `label`, `title`, `year` and `url`.
- `data`:  array of objects. Each object has the following keys: `count` and `year`. `count` is the number of citations of the publication in the year `year`. Exmple
```
[
  {
    "count": 1,
    "year": 2019
  },
  {
    "count": 1,
    "year": 2020
  },
  {
    "count": 1,
    "year": 2021
  }
]

```

- `id`: string. Identifier of the publication.
- `label`: string. Label of the publication.
- `title`: string. Title of the publication.
- `year`: number. Year of the publication.
- `url`: string. URL of the publication.

#### Props

| Name | Type | Description | Default | Required |
| --- | --- | --- | --- | --- |
|dataTraces | Array | Array of objects  with keys `data`, `id`, `label`, `title`, `year` and `url`. <br> More details in "Data" section | | true |
| stack | Boolean | If true, the traces will be stacked. | false | false |
| colors | Array | Array of colors for the traces. HEX format |  | false |
| height | Number | Height of the plot in pixels. | 400 | false |
| showlegend | Boolean | If true, the legend will be shown. | true | false |
| title | String | Title of the plot. | | false |
| xaxisTitle | String | Title of the x axis. | Year | false |
| yaxisTitle | String | Title of the y axis. | Number of citations | false |
| dark | Boolean | If true, the plot will be displayed in dark mode. | false | false |

#### Usage

Import the `citationsPlot` in your Vue component and add it to the `components` section. Then use the component in the template.

```html
<template>
    <div>
        <citationsPlot :dataTraces="data" />
    </div>
</template>
<script>
import citationsPlotPage from '../components/citationsPlotPage.vue'

export default {
  name: 'IndexPage',
  components: {
    citationsPlotPage
  },
  data(){
    return {
      data: [
        {
          "data": [
            {
              "count": 1,
              "year": 2019
            },
            {
              "count": 1,
              "year": 2020
            },
            {
              "count": 1,
              "year": 2021
            }
          ],
          "id": "paper1",
          "label": "OEB paper",
          "title": "OpenEBench: a web platform for transparent and reproducible biomedical benchmarking",
          "year": 2020,
          "url": ""
        },
        {
          "data": [
            {
              "count": 1,
              "year": 2019
            },
            {
              "count": 1,
              "year": 2020
            },
            {
              "count": 1,
              "year": 2021
            }
          ],
          "id": "paper2",
          "label": "OEB paper 2",
          "title": "OpenEBench 2: an update of the web platform for transparent and reproducible biomedical benchmarking",
          "year": 2020,
          "url": ""
        }
      ]
    }
  }
}
</script>
```
