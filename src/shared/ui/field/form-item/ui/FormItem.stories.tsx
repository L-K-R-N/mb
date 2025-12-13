import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "../../input";
import { FormItem } from "./FormItem";

const meta: Meta<typeof FormItem> = {
   title: "Fields/FormItem",
   component: FormItem,
   tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof FormItem>;

export const Default: Story = {
   args: {
      link: {
         onClick: () => {},
         text: "Забыли пароль?",
      },
      children: <Input variant="secondary" size="large" value="aa" />,
   },
};
