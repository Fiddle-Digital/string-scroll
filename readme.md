## Installation

using a package manager:
```sh
npm i @fiddle.digital/string-scroll
```
```sh
import StringScroll from '@fiddle.digital/string-scroll'
```

## Usage
The use of scroll is only possible with an existing window object.
```sh
const stringScroll = StringScroll.getInstance()
```
## Params
Additional HTML attributes help control some aspects of element behavior.
| HTML attribute  | Description |
| ------------- |:-------------|
| data-scroll-global-progress      | The global scroll attribute. It does not involve unnecessary checks and shows the scroll value of the element relative to the viewport. If there are no fine adjustments to the element in the scroll. It is recommended to use this attribute if you need to implement a simple scroll effect.     |
| data-scroll-progress      | This attribute is used in conjunction with other scroll setting parameters. It is suitable for more complex scroll effects.     |
| data-scroll-sticky-progress      | Suitable for scrolling effects with elements that have a sticky position on the viewport.     |
| data-lerp      | An attribute that adds the ability to track lerp values in an element.     |
| data-scroll-repeat      | When the element appears on the screen, the class -inview is added to it, and the data-repeat value removes it when the element goes beyond the screen bounds.     |
| data-scroll-offset      | It accepts values in the format of "100px 100px" or "20% 30%" which will denote the offset from the top and bottom of the screen     |
| data-scroll-id      | The value of the element identifier by which you can track updates in JavaScript     |

Adding one of the HTML attributes, the element will start automatically updating CSS variables for its scroll values.
| HTML attribute  | CSS variable |
| ------------- |:-------------|
| data-scroll-global-progress      | --scroll-global-progress     |
| data-scroll-progress      | --scroll-progress     |
| data-scroll-sticky-progress      | --scroll-sticky-progress     |
| data-lerp      | --scroll-lerp     |

## Functions
| Function  | Description |
| ------------- |:-------------|
| enable      | Enables the smooth scroll effect. |
| disable      | Disables the smooth scroll effect, leaving all CSS variable effects.     |
| setSpeed      | Sets the value of scroll speed. |
| setScrollFactor      | Sets the value of the scroll speed factor coefficient. |
| addStickyEvent      | Adds the ability to track the progress value of a separate element in a sticky group. |
| addGlobalEvent      | Adds the ability to track the progress value of a separate element in a global group. |
| addProgressEvent      | Adds the ability to track the progress value of a separate element in a progress group. |
| on      | Event handler. Available scroll event, which tracks the scroll value of the page. |