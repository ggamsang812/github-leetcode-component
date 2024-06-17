import type { Meta, StoryObj } from "@storybook/react";
import { GetLeetCodeData } from "../../lib/main";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "GetLeetCodeData",
  component: GetLeetCodeData,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    username: { control: "text" },
    year: { control: "number" },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof GetLeetCodeData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutDates: Story = {
  args: {
    username: "ggamsang812"
  },
};

export const WithDates: Story = {
  args: {
    username: "ggamsang812",
    year: 2024
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
