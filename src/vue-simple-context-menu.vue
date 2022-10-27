<template>
  <div>
    <ul :id="elementId" class="vue-simple-context-menu" v-click-outside="onClickOutside">
      <li
        v-for="(option, index) in options"
        :key="index"
        @click.stop="optionClicked(option)"
        class="vue-simple-context-menu__item"
        :class="[option.class, option.type === 'divider' ? 'vue-simple-context-menu__divider' : '']"
      >
        <span v-html="option.name" />
      </li>
    </ul>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, onUnmounted, ref, watch } from 'vue';
import vClickOutside from 'click-outside-vue3';

export default {
  name: 'VueSimpleContextMenu',
  props: {
    modelValue: Boolean,
    elementId: {
      type: String,
      default: () => {
        return `simple-context-menu__${getCurrentInstance().uid}`
      }
    },
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ['menu-closed', 'option-clicked'],
  directives: {
    'click-outside': vClickOutside.directive,
  },
  setup(props, { emit }) {
    const item = ref(null)
    const menuHeight = ref(null)
    const menuWidth = ref(null)

    onMounted(() => {
      document.body.addEventListener('keyup', onEscKeyRelease);
    })

    onUnmounted(() => {
      document.removeEventListener('keyup', onEscKeyRelease);
    })

    const showMenu = (event, item) => {
      item.value = item;

      const menu = document.getElementById(props.elementId);
      if (!menu) {
        return;
      }

      if (!menuWidth.value || !menuHeight.value) {
        menu.style.visibility = 'hidden';
        menu.style.display = 'block';
        menuWidth.value = menu.offsetWidth;
        menuHeight.value = menu.offsetHeight;
        menu.removeAttribute('style');
      }

      if (menuWidth.value + event.pageX >= window.innerWidth) {
        menu.style.left = event.pageX - menuWidth.value + 2 + 'px';
      } else {
        menu.style.left = event.pageX - 2 + 'px';
      }

      if (menuHeight.value + event.pageY >= window.innerHeight) {
        menu.style.top = event.pageY - menuHeight.value + 2 + 'px';
      } else {
        menu.style.top = event.pageY - 2 + 'px';
      }

      menu.classList.add('vue-simple-context-menu--active');
    }

    const hideContextMenu = () => {
      const element = document.getElementById(props.elementId);
      if (element) {
        element.classList.remove('vue-simple-context-menu--active');
        emit('menu-closed');
      }
    }

    const onClickOutside = () => {
      hideContextMenu();
    }

    const optionClicked = (option) => {
      hideContextMenu();
      emit('option-clicked', {
        item: item.value,
        option: option,
      });
    }

    const onEscKeyRelease = (event) => {
      if (event.keyCode === 27) {
        hideContextMenu()
      }
    }

    return {
      item,
      menuHeight,
      menuWidth,
      showMenu,
      hideContextMenu,
      onClickOutside,
      optionClicked,
      onEscKeyRelease,
    }
  },
};
</script>

<style lang="scss">
$light-grey: #ecf0f1;
$grey: darken($light-grey, 15%);
$blue: #007aff;
$white: #fff;
$black: #333;

.vue-simple-context-menu {
  background-color: $light-grey;
  border-bottom-width: 0px;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 rgba($black, 0.2);
  display: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  left: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  z-index: 1000000;

  &--active {
    display: block;
  }

  &__item {
    align-items: center;
    color: $black;
    cursor: pointer;
    display: flex;
    padding: 5px 15px;

    &:hover {
      background-color: $blue;
      color: $white;
    }
  }

  &__divider {
    background-clip: content-box;
    background-color: $grey;
    box-sizing: content-box;
    height: 2px;
    padding: 4px 0;
    pointer-events: none;
  }

  // Have to use the element so we can make use of `first-of-type` and `last-of-type`
  li {
    &:first-of-type {
      margin-top: 4px;
    }

    &:last-of-type {
      margin-bottom: 4px;
    }
  }
}
</style>
