import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChartSkeleton } from "./ChartSkeleton";

const meta: Meta<typeof ChartSkeleton> = {
   title: "Loaders/ChartSkeleton",
   component: ChartSkeleton,
   tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ChartSkeleton>;

export const Default: Story = {
   args: {
      // children: <div></div>
   },
};
