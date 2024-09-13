import { Meta, StoryObj } from '@storybook/react';

import { ErrorBlock } from './errorBlock';

const meta: Meta<typeof ErrorBlock> = {
  component: ErrorBlock,
};

export default meta;

type Story = StoryObj<typeof ErrorBlock>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: 'An error occurred while processing your request.',
  },
};
