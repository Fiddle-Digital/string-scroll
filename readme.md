
![Alpha](https://img.shields.io/badge/Status-Alpha-red)
[![Alpha](https://img.shields.io/badge/gzip-4.1kB-brightgreen
)](https://bundlephobia.com/package/@fiddle-digital/string-scroll@0.1.4)
  
## Overview
StringScroll is a JavaScript library designed for sophisticated scrolling and animation control on web pages. It provides advanced capabilities for managing parallax effects, scroll-based animations, and more, offering a comprehensive solution for creating interactive and visually appealing web experiences.

## Installation
using a package manager:

```sh

npm  i  @fiddle-digital/string-scroll

```

```sh

import  {  StringScroll  }  from  '@fiddle-digital/string-scroll'

```

  

## Usage

The use of scroll is only possible with an existing window object.

```sh

const  scroll =  StringScroll.getInstance()

```

## Params

Additional HTML attributes help control some aspects of element behavior.

| HTML attribute | Description  |
|--|--|
| ``data-string-progress`` | This attribute is used in conjunction with other scrolling customization options. It is suitable for more complex scrolling effects. Adds the css variable ``--string-progress``. |
| ``data-string-parallax`` | The attribute takes a parallax value and applies a parallax effect without any extra actions. |
| ``data-string-offset`` | It accepts values in the format of "100px 100px" or "20% 30%" which will denote the offset from the top and bottom of the screen |
| ``data-string-start`` | It accepts values in the format of "top top", "top bottom","bottom top","bottom bottom". |
| ``data-string-end`` | It accepts values in the format of "top top", "top bottom","bottom top","bottom bottom". |
| ``data-string-id`` | The value of the element identifier by which you can track updates in JavaScript and ``data-string-connect`` |
| ``data-string-repeat`` | When the element appears on the screen, the class ``-inview`` is added to it, and the data-repeat value removes it when the element goes beyond the screen bounds. |
| ``data-string-lerp`` | An attribute that adds the ability to track lerp values in an element. Adds the css variable ``--scroll-lerp`` |
| ``data-string-connect`` | The attribute accepts the scroll string from another element and duplicates its progress value. |

**data-string-progress**

This example demonstrates how to animate an element that responds to scroll progress. The element scrolls horizontally depending on the page scrolling progress.

***HTML***
```xml
<div class="example" data-string data-string-progress></div>
```
***CSS***
```css
.example{
	transform: translate(calc(100% * var(--string-progress));
}
```
When the user scrolls the page, the element with class example is smoothly shifted in the horizontal direction. The speed and amount of displacement depends on the speed and level of page scrolling. This effect is particularly useful for creating dynamic visual effects that respond to user actions.

**data-string-parallax**

This example demonstrates how to apply a parallax effect to an element using the data-string-parallax attribute. The element will move at different speeds relative to the scrolling speed of the page, creating the illusion of depth.

***HTML***
```xml
<div class="example" data-string data-string-parallax="0.3"></div>
```
In this example, an element with class example will move with a parallax effect when scrolling the page. The ``data-string-parallax`` attribute with a value of 0.3 determines the intensity of the parallax effect. A value of 0.3 means that the element will move at a speed equal to 30% of the page scroll speed.

  ## Events
  
The "on" method is used to register event handlers for certain types of scrolling or interaction events. This can include scroll, scroll-progress, element intersection, and scroll-progress events. The method allows you to define callback functions that are executed when the corresponding event occurs.

```javascript
on(eventType: string, callback: Function, id?: string): void
```

-   `eventType` (string): The type of event to respond to. Possible values include "scroll", "progress", "intersection", "scroll-progress".
-   `callback` (Function): The function that will be called when the specified event occurs. The arguments passed to this function depend on the event type.
-   `id` (string, опціонально): An identifier that can be used to identify a specific item or group of items for which the event should be tracked.

**Track scroll events:**
```javascript
scroll.on("scroll",  function(scrollPos) {
	console.log("Current scroll position:", scrollPos);
});
```
In this example, with each scroll offset, the current scroll position is output.

**Track the scrolling progress of an item:**
```javascript
scroll.on("progress", function(progress) {
  console.log("Scroll progress of element:", progress);
}, "elementId");
```
Here, the callback function is executed with the scroll progress value for the element with the specified ID.

## Functions

| Function  | Description  |
|--|--|
| `setMobileMode(mode)` | Sets the scroll mode for mobile devices. |
| `setDesktopMode(mode)` | Sets the scroll mode for desktop devices. |
| `disableScroll()` | Disables scrolling functionality. |
| `enableScroll()` | Enables scrolling functionality. |
| `setSpeedAccelerate(speed)` | Sets the acceleration rate for scrolling animations. |
| `setSpeedDecelerate(speed)` | Sets the deceleration rate for scrolling animations. |
| `setScrollFactor(factor)` | Sets the scroll factor. |
| `setSafariFactor(safariFactor)` | Sets the scroll factor specific to the Safari browser. |
| `setScrollMode(mode)` | Sets the general scroll mode. |
| `enableById(id)` | Activates the element by the specified ID. |
| `disableById(id)` | Deactivates the element by the given ID. |
| `setProgressStatus(status)` | Sets the activity status of the scroll progress. |
| `setParallaxStatus(status)` | Sets the activity status of the parallax effect. |
| `forceUpdateParallax()` | Force refreshes parallax effects. |
| `overflowHidden()` | Activates the "overflow hidden" mode. |
| `overflowAuto()` | Disables the "overflow hidden" mode and sets the "overflow auto" behavior. |
