# vue-simple-context-menu
Thanks to  [@johndatserakis](https://github.com/johndatserakis). This package is a forked from johndatserakis/vue-simple-context-menu

Simple context-menu component built for Vue. Works well with both left and right clicks. Nothing too fancy, just works and is simple to use.

## Vue 3 Support

Vue 3 is supported from `v4.0.0` and beyond (current `master`). To use `vue-simple-context-menu` with Vue 2, use `v3.4.2`.

## Install

```
yarn add vue-simple-context-menu
```

## About

Just a simple little menu to be shown where a click happens - closes after use automatically by clicking an option or outside of the menu. Multiple menus are supported - just make sure to use a unique string as your `element-id` prop value.

A nice feature that comes baked in is the menu placement after a click - it sits just ever so slightly under your click location - so that any hover style you had on the item that was clicked gets removed nicely. I modeled it after the macOS right click menu.

## Usage

GLOBAL Usage
```js
import { createApp } from 'vue';
import VueSimpleContextMenu from 'vue-simple-context-menu';
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css';

const app = createApp(App);

app.component('vue-simple-context-menu', VueSimpleContextMenu);
```

```html
<!-- This is a basic use case where you have an array of items that you want
to allow to be clicked. In this case, `items` is an array of objects.
Each item has a click event that ties to a function. See the demo for a full example (with multiple menus as well). -->
<div class="item-wrapper">
  <div
    v-for="item in items"
    @click.prevent.stop="handleClick($event, item)"
    class="item-wrapper__item"
  >
    {{item.name}}
  </div>
</div>

<!-- Make sure you add the `ref` attribute, as that is what gives you the ability
to open the menu. -->
<vue-simple-context-menu
  element-id="myUniqueId"
  :options="options"
  ref="vueSimpleContextMenu"
  @option-clicked="optionClicked"
/>
```

```js
handleClick (event, item) {
  this.$refs.vueSimpleContextMenu.showMenu(event, item)
}


optionClicked (event) {
  window.alert(JSON.stringify(event))
}
```

Note - you must pass the click event-info variable to the `showMenu()` function because that's how we know where to show the menu.

Note - make sure to use `@click.prevent.stop` (or `@contextmenu.prevent.stop` for right click) when setting up the click handler.

## Props

| prop            | type   | description                                                                                  | required |
| --------------- | ------ | -------------------------------------------------------------------------------------------- | -------- |
| `elementId`     | String | Unique String that acts as the id of your menu.                                              | Yes      |
| `options`       | Array  | Array of menu options to show. Component will use the `name` parameter as the label.         | Yes      |
| `options.name`  | String | Label for the option.                                                                        | Yes      |
| `options.class` | String | A custom class that will be applied to the option.                                           | No       |
| `options.type`  | String | Only one possible value at the moment - `divider`. Pass this to set the object as a divider. | No       |
| `ref`           | String | Unique String that allows you to show the menu on command.                                   | Yes      |

## Methods

| method     | parameters                        | description                                                          |
| ---------- | --------------------------------- | -------------------------------------------------------------------- |
| `showMenu` | event (MouseEvent), item (Object) | Used to show the menu. Make sure to pass a MouseEvent and an Object. |

## Events

| event            | value  | description                                                                                                                                                                                          |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `option-clicked` | Object | When a menu item is clicked the component will emit an event with a value containing the clicked item and the menu option that was clicked. Register for this event to capture the selection result. |
| `menu-closed`    |        | Emitted when the menu is closed                                                                                                                                                                      |

## SASS Structure

```scss
.vue-simple-context-menu {
  &--active {
  }

  &__item {
    &:hover {
    }
  }

  &__divider {
  }
}
```

## Development

```bash
# Install dependencies
yarn

# Serve with hot reload
yarn dev

# Run the tests
yarn test

# Build demo page
yarn build:example

# Build library
yarn build:library

# Build everything and run tests
yarn build
```

## Other

Go ahead and fork the project! Submit an issue if needed. Have fun!

## License

[MIT](http://opensource.org/licenses/MIT)
