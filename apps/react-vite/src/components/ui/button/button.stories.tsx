import { Meta, StoryObj } from '@storybook/react';
import 'material-icons/iconfont/round.css';

import {} from 'lucide-react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col w-full gap-4">
      <Button variant="default" size="default">
        Default
      </Button>
      <Button variant="destructive" size="default">
        Destructive
      </Button>
      <Button variant="outline" size="default">
        Outline
      </Button>
      <Button variant="secondary" size="default">
        Secondary
      </Button>
      <Button variant="ghost" size="default">
        Ghost
      </Button>
      <Button variant="link" size="default">
        Link
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button size="icon" icon="edit" />
      <Button size="sm">Small Size</Button>
      <Button size="default">Default Size</Button>
      <Button size="lg">Large Size</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: 'With Icon',
    icon: 'edit',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading',
    isLoading: true,
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
    children: <a href="https://example.com">Link Button</a>,
  },
};
