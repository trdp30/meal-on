/**
 *
 * Stories for SearchableDropdown
 *
 *
 */

import React from 'react';
import SearchableDropdown from './index';
import { defaultProps, search, items } from './tests/mocks';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/SearchableDropdown',
  component: SearchableDropdown,
  decorators: [Story => <Story />],
};

const Template = args => <SearchableDropdown {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  ...defaultProps,
  search,
  setSelected: () => true,
  selectedItems: [],
  searchFn: (searchText, callback) => callback(items),
};
