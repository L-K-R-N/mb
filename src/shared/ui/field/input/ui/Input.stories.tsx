import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
   title: "Fields/Input",
   component: Input,
   tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
   args: {
      value: "",
      // placeholder: "Найти артикул...",
      // leftIcon: <AttachIcon />,
      // rightIcon: <SelectDownIcon />,
      counter: 5,
   },
};
