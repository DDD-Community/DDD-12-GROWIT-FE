import type { Meta, StoryObj } from '@storybook/react';

const colorStories = [
  {
    title: 'Static',
    description: 'Light, Dark 테마에 상관없이 변하지 않는 고정색입니다.',
    colors: [
      { className: 'bg-static-white', label: 'Static White' },
      { className: 'bg-static-black', label: 'Static Black' },
    ],
  },
  {
    title: 'Primary',
    description: '가장 중요한 요소를 강조할 때 사용합니다.',
    colors: [
      { className: 'bg-primary-normal', label: 'Primary Normal' },
      { className: 'bg-primary-strong', label: 'Primary Strong' },
      { className: 'bg-primary-heavy', label: 'Primary Heavy' },
    ],
  },
  {
    title: 'Label',
    description: '텍스트, 라벨 등 정보 전달에 사용되는 색상입니다.',
    colors: [
      { className: 'bg-label-normal', label: 'Label Normal' },
      { className: 'bg-label-neutral', label: 'Label Neutral' },
      { className: 'bg-label-alternative', label: 'Label Alternative' },
      { className: 'bg-label-assistive', label: 'Label Assistive' },
      { className: 'bg-label-disable', label: 'Label Disable' },
    ],
  },
  {
    title: 'Background',
    description: '앱의 배경, 카드, 컴포넌트 등 다양한 배경에 사용되는 색상입니다.',
    colors: [
      { className: 'bg-normal', label: 'BG Normal' },
      { className: 'bg-elevated-normal', label: 'BG Elevated Normal' },
      { className: 'bg-normal-alternative', label: 'BG Normal Alternative' },
      { className: 'bg-elevated-alternative', label: 'BG Elevated Alternative' },
    ],
  },
  {
    title: 'Status',
    description: '성공, 경고, 오류 등 상태를 나타내는 색상입니다.',
    colors: [
      { className: 'bg-status-positive', label: 'Status Positive' },
      { className: 'bg-status-cautionary', label: 'Status Cautionary' },
      { className: 'bg-status-negative', label: 'Status Negative' },
    ],
  },
  {
    title: 'Accent',
    description: '강조, 포인트, 그래프 등 다양한 강조 요소에 사용되는 색상입니다.',
    colors: [
      { className: 'bg-accent-red-orange', label: 'Accent Red Orange' },
      { className: 'bg-accent-lime', label: 'Accent Lime' },
      { className: 'bg-accent-cyan', label: 'Accent Cyan' },
      { className: 'bg-accent-light-blue', label: 'Accent Light Blue' },
      { className: 'bg-accent-violet', label: 'Accent Violet' },
      { className: 'bg-accent-purple', label: 'Accent Purple' },
      { className: 'bg-accent-pink', label: 'Accent Pink' },
    ],
  },
];

const ColorSection = ({ title, description, colors }: (typeof colorStories)[number]) => (
  <section className="mb-8 flex flex-col gap-4">
    <h2 className="text-5xl text-primary-normal">{title}</h2>
    <div className="text-lg text-label-neutral">
      {description} <br />
      <span className="text-base text-label-normal">(컬러 토큰 앞에 text-, bg- 등을 붙여 사용합니다)</span>
    </div>
    <div className="flex flex-col gap-4">
      {colors.map(color => (
        <div key={color.label} className="flex gap-4 items-center">
          <div className={`w-20 h-20 rounded border border-gray-200 mb-2 ${color.className}`} />
          <div className="text-md text-label-normal font-semibold">
            <span className="text-gray-400 font-base">className: </span>
            {color.className}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const meta: Meta = {
  title: 'Foundation/Colors',
};
export default meta;

type Story = StoryObj;

export const Static: Story = {
  globals: {
    backgrounds: 'dark',
  },
  render: () => <ColorSection {...colorStories[0]} />,
};
export const Primary: Story = {
  globals: {
    backgrounds: 'dark',
  },
  render: () => <ColorSection {...colorStories[1]} />,
};
export const Label: Story = {
  globals: {
    backgrounds: 'dark',
  },
  render: () => <ColorSection {...colorStories[2]} />,
};
export const Background: Story = {
  globals: {
    backgrounds: 'dark',
  },
  render: () => <ColorSection {...colorStories[3]} />,
};
export const Status: Story = {
  globals: {
    backgrounds: 'dark',
  },
  render: () => <ColorSection {...colorStories[4]} />,
};
export const Accent: Story = {
  globals: {
    backgrounds: 'dark',
  },
  render: () => <ColorSection {...colorStories[5]} />,
};
