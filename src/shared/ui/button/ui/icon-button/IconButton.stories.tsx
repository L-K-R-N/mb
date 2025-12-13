import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsIcon } from "../../../icon";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
   title: "Button/IconButton",
   component: IconButton,
   tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
   args: {
      variant: "secondary",
      children: <SettingsIcon width={20} height={20} color="var(--color-text-link)" />,
   },
};
