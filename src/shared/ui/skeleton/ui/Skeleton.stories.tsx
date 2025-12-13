import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
   title: "Loaders/Skeleton",
   component: Skeleton,
   tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
   args: {
      width: 200,
      height: 100,
      variant: "semicircle",
      // children: <div></div>
   },
};
