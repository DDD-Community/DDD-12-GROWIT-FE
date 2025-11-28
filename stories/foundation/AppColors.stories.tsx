import type { Meta, StoryObj } from '@storybook/react';

type TokenItem = {
  name: string;
  utility: string;
  cssVar: string;
  sampleType?: 'text' | 'bg';
};

const tokenGroups: { title: string; description: string; tokens: TokenItem[]; sampleType?: TokenItem['sampleType'] }[] =
  [
    {
      title: 'Text Tokens',
      description: 'Tailwind: text-text-*. 텍스트 컬러가 어떻게 보이는지 확인하세요.',
      sampleType: 'text',
      tokens: [
        { name: 'Text Brand', utility: 'text-text-brand', cssVar: '--color-text-brand' },
        { name: 'Text Primary', utility: 'text-text-primary', cssVar: '--color-text-primary' },
        { name: 'Text Secondary', utility: 'text-text-secondary', cssVar: '--color-text-secondary' },
        { name: 'Text Tertiary', utility: 'text-text-tertiary', cssVar: '--color-text-tertiary' },
        { name: 'Text Strong', utility: 'text-text-strong', cssVar: '--color-text-strong' },
        { name: 'Text Inverse', utility: 'text-text-inverse', cssVar: '--color-text-inverse' },
        { name: 'Text Danger', utility: 'text-text-danger', cssVar: '--color-text-danger' },
        { name: 'Text Warning', utility: 'text-text-warning', cssVar: '--color-text-warning' },
        { name: 'Text Success', utility: 'text-text-success', cssVar: '--color-text-success' },
      ],
    },
    {
      title: 'Icon Tokens',
      description: 'Tailwind: text-icon-*. 아이콘/심볼 컬러에 사용합니다.',
      sampleType: 'text',
      tokens: [
        { name: 'Icon Brand', utility: 'text-icon-brand', cssVar: '--color-icon-brand' },
        { name: 'Icon Primary', utility: 'text-icon-primary', cssVar: '--color-icon-primary' },
        { name: 'Icon Secondary', utility: 'text-icon-secondary', cssVar: '--color-icon-secondary' },
        { name: 'Icon Tertiary', utility: 'text-icon-tertiary', cssVar: '--color-icon-tertiary' },
        { name: 'Icon Strong', utility: 'text-icon-strong', cssVar: '--color-icon-strong' },
      ],
    },
    {
      title: 'Border Tokens',
      description: 'Tailwind: border-border-*. 테두리/구분선 색상입니다.',
      tokens: [
        { name: 'Border Brand', utility: 'border-border-brand', cssVar: '--color-border-brand' },
        { name: 'Border Primary', utility: 'border-border-primary', cssVar: '--color-border-primary' },
        { name: 'Border Secondary', utility: 'border-border-secondary', cssVar: '--color-border-secondary' },
      ],
    },
    {
      title: 'Fill Tokens',
      description: 'Tailwind: bg-fill-*. 버튼/배지 등 면 색상입니다.',
      tokens: [
        { name: 'Fill Brand', utility: 'bg-fill-brand', cssVar: '--color-fill-brand' },
        { name: 'Fill Primary', utility: 'bg-fill-primary', cssVar: '--color-fill-primary' },
        { name: 'Fill Secondary', utility: 'bg-fill-secondary', cssVar: '--color-fill-secondary' },
        { name: 'Fill Tertiary', utility: 'bg-fill-tertiary', cssVar: '--color-fill-tertiary' },
        { name: 'Fill Inverse', utility: 'bg-fill-inverse', cssVar: '--color-fill-inverse' },
        { name: 'Fill Success', utility: 'bg-fill-success', cssVar: '--color-fill-success' },
        { name: 'Fill Warning', utility: 'bg-fill-warning', cssVar: '--color-fill-warning' },
        { name: 'Fill Danger', utility: 'bg-fill-danger', cssVar: '--color-fill-danger' },
      ],
    },
    {
      title: 'Background Tokens',
      description: 'Tailwind: bg-bg-*. 페이지/카드 배경에 사용합니다.',
      tokens: [
        { name: 'Background Default', utility: 'bg-bg-default', cssVar: '--color-bg-default' },
        { name: 'Background Elevated', utility: 'bg-bg-elevated', cssVar: '--color-bg-elevated' },
      ],
    },
  ];

const TokenCard = ({ token, sampleType = 'bg' }: { token: TokenItem; sampleType?: 'text' | 'bg' }) => (
  <div className="flex items-center gap-4 rounded-xl border border-border-secondary bg-bg-elevated p-4">
    {sampleType === 'text' ? (
      <div className="flex-1 rounded-md bg-bg-default px-3 py-2">
        <p className="text-xs text-text-tertiary mb-1">{token.name}</p>
        <p className="font-semibold" style={{ color: `var(${token.cssVar})` }}>
          Sample Text
        </p>
      </div>
    ) : (
      <div
        className="h-16 w-16 rounded-md border border-border-primary"
        style={{ backgroundColor: `var(${token.cssVar})` }}
      />
    )}
    <div className="flex flex-col text-sm text-text-secondary">
      <span className="font-semibold text-text-primary">{token.utility}</span>
      <code className="text-xs text-text-tertiary">css: var({token.cssVar})</code>
    </div>
  </div>
);

const TokenSection = ({
  title,
  description,
  tokens,
  sampleType,
}: {
  title: string;
  description: string;
  tokens: TokenItem[];
  sampleType?: 'text' | 'bg';
}) => (
  <section className="flex flex-col gap-4">
    <div>
      <h2 className="text-2xl font-semibold text-text-strong">{title}</h2>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
    <div className="grid gap-3 md:grid-cols-2">
      {tokens.map(token => (
        <TokenCard key={token.utility} token={token} sampleType={sampleType} />
      ))}
    </div>
  </section>
);

const meta: Meta = {
  title: 'Foundation/App Colors',
};

export default meta;

type Story = StoryObj;

export const AllTokens: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div className="flex flex-col gap-8 bg-bg-default p-4 text-text-primary">
      {tokenGroups.map(group => (
        <TokenSection key={group.title} {...group} />
      ))}
    </div>
  ),
};
