/**
 *
 * Stories for Dropdown
 *
 *
 */

import React from 'react';
import { Dropdown } from './index';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/New/Dropdown',
  component: Dropdown,
  decorators: [Story => <Story />],
};

const Template = args => <Dropdown {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  placeholder: 'Search Evaluator',
  options: [
    { label: 'Test 0', value: '1' },
    { label: 'Test 1', value: '2' },
    { label: 'Test 3', value: '3' },
  ],
  labelKey: 'label',
  primaryKey: 'value',
};
