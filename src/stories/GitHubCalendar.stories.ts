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
    year: { control: "text" },
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

export const JanSecond2024: Story = {
  args: {
    username: "ggamsang812",
    year: "2024-12121212",
  },
};

export const JanFirst2024: Story = {
  args: {
    username: "ggamsang812",
    year: "2024-01-01",
  },
};

export const Mar12th2023: Story = {
  args: {
    username: "ggamsang812",
    year: "2023-03-12",
  },
};

export const Mar12th2022: Story = {
  args: {
    username: "ggamsang812",
    year: "2022-03-12",
  },
};

export const Year2024: Story = {
  args: {
    username: "ggamsang812",
    year: "2024asdf",
  },
};

export const Year2023: Story = {
  args: {
    username: "ggamsang812",
    year: "2023asdf",
  },
};

export const ShortYear: Story = {
  args: {
    username: "ggamsang812",
    year: "135",
  },
};

export const RandomYear: Story = {
  args: {
    username: "ggamsang812",
    year: "20asdf",
  },
};

export const OverYear: Story = {
  args: {
    username: "ggamsang812",
    year: "2222asdf",
  },
};

export const LessYear: Story = {
  args: {
    username: "ggamsang812",
    year: "1235",
  },
};
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
