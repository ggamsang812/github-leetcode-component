import type { Meta, StoryObj } from "@storybook/react";
import { GitHubCalendar } from "../../lib/main";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "GitHubCalendar",
  component: GitHubCalendar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    username: { control: "text" },
    date: { control: "text" },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof GitHubCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutDate: Story = {
  args: {
    username: "ggamsang812",
  },
};

export const WithDate: Story = {
  args: {
    username: "ggamsang812",
    date: "2024-01-01",
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
