import { Meta, StoryObj } from '@storybook/react';

import { Loader } from './loader';

const meta: Meta<typeof Loader> = {
  component: Loader,
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    label: 'Loading...',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Loading...',
    description: 'Please wait while we process your request.',
  },
};

export const WithCustomSpinner: Story = {
  args: {
    label: 'Loading...',
    description: 'Please wait while we process your request.',
    spinnerClassName: 'w-20 h-20 text-accentOrange',
  },
};
