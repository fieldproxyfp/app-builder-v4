import { Meta, StoryObj } from '@storybook/react';

import { Typography } from './typography';

const meta: Meta<typeof Typography> = {
  component: Typography,
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="body">Body Text</Typography>
      <Typography variant="large">Large Text</Typography>
      <Typography variant="small">Small Text</Typography>
      <Typography variant="subHeading">Sub Heading</Typography>
      <Typography variant="button">Button Text</Typography>
      <Typography variant="buttonSmall">Button Small Text</Typography>
    </div>
  ),
};

export const WithCustomTag: Story = {
  args: {
    children: 'Hello World',
    variant: 'h1',
  },
};

export const WithCustomClassName: Story = {
  args: {
    children: 'Hello World',
    className: 'text-destructive',
  },
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="subHeading">Sub Heading</Typography>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="body">Default body text</Typography>
      <Typography variant="large">Large text</Typography>
      <Typography variant="small">Small text</Typography>
    </div>
  ),
};

export const ButtonText: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="button">Button Text</Typography>
      <Typography variant="buttonSmall">Button Small Text</Typography>
    </div>
  ),
};
