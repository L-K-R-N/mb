import type { Meta, StoryObj } from "@storybook/react-vite";

import { CodeInput } from "./CodeInput";

const meta: Meta<typeof CodeInput> = {
   title: "Fields/CodeInput",
   component: CodeInput,
   tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CodeInput>;

export const Default: Story = {
   args: {},
};
