import type { Meta, StoryObj } from "@storybook/react";
import { CombinationCalendar } from "../../lib/main";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "CombinationCalendar",
  component: CombinationCalendar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    github_username: { control: "text" },
    leetcode_username: { control: "text" },
    year: { control: "text" },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof CombinationCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutDates: Story = {
  args: {
    github_username: "ggamsang812",
    leetcode_username: "ggamsang812",
  },
};

export const WithDates: Story = {
  args: {
    github_username: "ggamsang812",
    leetcode_username: "ggamsang812",
    year: "2023-01-01",
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
