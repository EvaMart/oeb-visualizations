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
| colorNA | String | Color of bars for which there is no monitoring information (`code`=`null`). RGB format: `"<R>, <G>, <B>"` | 204, 204, 204 | false |
| colorOffline | String | Color of bars for which the server was offline (`code` is an error code). RGB format: `"<R>, <G>, <B>"` | 255, 153, 145 | false |
| colorOnline | String | Color of bars for which the server was online (`code` is 200). RGB format: `"<R>, <G>, <B>"` | 111, 176, 129 | false |
| yaxisTitle | String | Title of the y axis. | Access time (ms) | false |
| xaxisTitle | String | Title of the x axis. | Date | false |
| dtick | String | Tick interval for the x axis in unix epoch. | 86400000 | false |   

## Usage 

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