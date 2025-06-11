/*
 * Copyright (c) 2022, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses.
 * For specific language governing the permissions and limitations under
 * this license, please see the license as well as any agreement you've
 * entered into with WSO2 governing the purchase of this software and any
 * associated services.
 */ import { StoryFn } from '@storybook/react';
import IconsPreview from './IconsPreview';
import { Box } from '@mui/material'; // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Extras/Icons',
  component: IconsPreview,
  argTypes: {
    fontSize: {
      control: {
        type: 'select',
        options: ['medium', 'small', 'default', 'inherit', 'large'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: [
          'inherit',
          'disabled',
          'action',
          'primary',
          'secondary',
          'error',
        ],
      },
    },
  },
}; // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn = (args) => (
  <Box height={1} width={1} display="flex">
    <IconsPreview {...args} />
  </Box>
);
export const IconPreviewList = Template.bind({}) as StoryFn<
  typeof IconsPreview
>;
// More on args: https://storybook.js.org/docs/react/writing-stories/args
IconPreviewList.args = {};
