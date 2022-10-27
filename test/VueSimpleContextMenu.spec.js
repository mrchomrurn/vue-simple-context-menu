import { shallowMount } from '@vue/test-utils';
import Vue3ContextMenu from '@/vue3-context-menu.vue';

describe('Vue3ContextMenu.vue', () => {
  it('Sets props correctly', async () => {
    let initialPropsData = {
      elementId: 'myPanel1',
      options: [
        {
          name: 'Duplicate',
          slug: 'duplicate',
        },
        {
          name: 'Edit',
          slug: 'edit',
        },
        {
          name: 'Delete',
          slug: 'delete',
        },
      ],
    };

    const wrapper = shallowMount(Vue3ContextMenu, {
      props: {
        elementId: initialPropsData.elementId,
        options: initialPropsData.options,
      },
    });

    expect(wrapper.vm.elementId).toBe(initialPropsData.elementId);
    expect(wrapper.vm.options).toEqual(initialPropsData.options);
  });
});
