import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "./Select";

const meta: Meta<typeof Select> = {
   title: "Fields/Select",
   component: Select,
   tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
   args: {
      options: [{ label: "a", value: "1" }],
   },
};
