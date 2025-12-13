import type { Meta, StoryObj } from "@storybook/react-vite";

import { FileUploadButton } from "./FileUploadButton";

const meta: Meta<typeof FileUploadButton> = {
   title: "Button/FileUploadButton",
   component: FileUploadButton,
   tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof FileUploadButton>;

export const Default: Story = {
   args: {
      variant: "primary",
      children: "Отправить",
   },
};
