# jQuery DrawSVG

This plugin uses the jQuery built-in animation engine to transition the `stroke` on every `<path>` inside the selected `<svg>` element, using `stroke-dasharray` and `stroke-dashoffset` properties.

* Weights less than 2KB minified and 800 bytes gzipped.
* Easy to use.
* Easing and stagger support.
* Free!

## Usage

Include jQuery DrawSVG after jQuery

```html
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="jquery.drawsvg.js"></script>
```

Initialize the plugin on the <svg> element you want to animate and store in a variable

```js
var mySVG = $('#my_svg_element').drawsvg();
```

Run the animation

```js
mySVG.drawsvg('animate');
```

Look at the demos for more advanced usages.

## Options

| Option     | Type     | Default         | Description                                                                                                                                                  |
| ---------- | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `duration` | Integer  | `1000`          | The time to complete the animation of each path.                                                                                                             |
| `stagger`  | Integer  | `200`           | Delay to start animating each individual path.                                                                                                               |
| `easing`   | String   | `swing`         | Which easing function each path will use to transition. <br> Use [jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/) for different easing functions. |
| `reverse`  | Boolean  | `false`         | Direction that the line will be drawn.                                                                                                                       |
| `callback` | Function | `function() {}` | A function to call once the animation has been completed. |

## Demos

[Simple usage](http://codepen.io/lcdsantos/pen/zvGXbr/)

[Draw on scroll](http://codepen.io/lcdsantos/pen/zvGQYB/)

[Callback example](http://codepen.io/lcdsantos/pen/vNNXrm/)

[Animate mask path](http://codepen.io/lcdsantos/pen/xwwEJw/)

