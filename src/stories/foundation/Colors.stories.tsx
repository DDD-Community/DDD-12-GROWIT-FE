import type { Meta, StoryObj } from '@storybook/react';

const ColorShowcase = ({ colorType }: { colorType: string }) => {
  const colorGroups = {
    backgrounds: [
      { name: 'bg-primary-normal', class: 'bg-primary-normal', description: '기본 색상' },
      { name: 'bg-primary-strong', class: 'bg-primary-strong', description: '강한 기본 배경색' },
      { name: 'bg-primary-heavy', class: 'bg-primary-heavy', description: '진한 기본 배경색' },
      { name: 'bg-static-white', class: 'bg-static-white', description: '정적 흰색 배경' },
      { name: 'bg-static-black', class: 'bg-static-black', description: '정적 검은색 배경' },
      { name: 'bg-normal', class: 'bg-normal', description: '기본 배경색' },
      { name: 'bg-normal-alternative', class: 'bg-normal-alternative', description: '대체 배경색' },
      { name: 'bg-elevated-normal', class: 'bg-elevated-normal', description: '상승된 배경색' },
      { name: 'bg-elevated-alternative', class: 'bg-elevated-alternative', description: '상승된 대체 배경색' },
      { name: 'bg-component-fill-normal', class: 'bg-component-fill-normal', description: '컴포넌트 일반 채우기' },
      { name: 'bg-component-fill-strong', class: 'bg-component-fill-strong', description: '컴포넌트 강조 채우기' },
      {
        name: 'bg-component-fill-alternative',
        class: 'bg-component-fill-alternative',
        description: '컴포넌트 대체 채우기',
      },
      { name: 'bg-component-material-dimmer', class: 'bg-component-material-dimmer', description: '컴포넌트 딤 배경' },
      { name: 'bg-interaction-inactive', class: 'bg-interaction-inactive', description: '비활성 상호작용 배경' },
      { name: 'bg-interaction-disable', class: 'bg-interaction-disable', description: '비활성화 상호작용 배경' },
      { name: 'bg-inverse-primary', class: 'bg-inverse-primary', description: '역방향 기본 배경' },
    ],
    statusBackgrounds: [
      { name: 'bg-status-positive', class: 'bg-status-positive', description: '성공 상태 배경색' },
      { name: 'bg-status-cautionary', class: 'bg-status-cautionary', description: '주의 상태 배경색' },
      { name: 'bg-status-negative', class: 'bg-status-negative', description: '오류 상태 배경색' },
    ],
    accentBackgrounds: [
      { name: 'bg-accent-red-orange', class: 'bg-accent-red-orange', description: '적색 오렌지 강조 배경' },
      { name: 'bg-accent-lime', class: 'bg-accent-lime', description: '라임 강조 배경' },
      { name: 'bg-accent-cyan', class: 'bg-accent-cyan', description: '청록 강조 배경' },
      { name: 'bg-accent-light-blue', class: 'bg-accent-light-blue', description: '연한 파랑 강조 배경' },
      { name: 'bg-accent-violet', class: 'bg-accent-violet', description: '보라 강조 배경' },
      { name: 'bg-accent-purple', class: 'bg-accent-purple', description: '자주 강조 배경' },
      { name: 'bg-accent-pink', class: 'bg-accent-pink', description: '분홍 강조 배경' },
    ],
    textColors: [
      { name: 'text-primary-normal', class: 'text-primary-normal', description: '기본 색상 텍스트' },
      { name: 'text-primary-strong', class: 'text-primary-strong', description: '강한 기본 텍스트' },
      { name: 'text-primary-heavy', class: 'text-primary-heavy', description: '진한 기본 텍스트' },
      { name: 'text-static-white', class: 'text-static-white', description: '정적 흰색 텍스트' },
      { name: 'text-static-black', class: 'text-static-black', description: '정적 검은색 텍스트' },
      { name: 'text-label-normal', class: 'text-label-normal', description: '기본 텍스트 색상' },
      { name: 'text-label-neutral', class: 'text-label-neutral', description: '중성 텍스트 색상' },
      { name: 'text-label-alternative', class: 'text-label-alternative', description: '대체 텍스트 색상' },
      { name: 'text-label-assistive', class: 'text-label-assistive', description: '보조 텍스트 색상' },
      { name: 'text-label-disable', class: 'text-label-disable', description: '비활성 텍스트 색상' },
      { name: 'text-interaction-inactive', class: 'text-interaction-inactive', description: '비활성 상호작용 텍스트' },
      { name: 'text-interaction-disable', class: 'text-interaction-disable', description: '비활성화 상호작용 텍스트' },
      { name: 'text-inverse-primary', class: 'text-inverse-primary', description: '역방향 기본 텍스트' },
      { name: 'text-inverse-label', class: 'text-inverse-label', description: '역방향 라벨 텍스트' },
    ],
    buttonTextColors: [
      { name: 'text-label-button-normal', class: 'text-label-button-normal', description: '버튼 기본 텍스트' },
      { name: 'text-label-button-strong', class: 'text-label-button-strong', description: '버튼 강조 텍스트' },
      { name: 'text-label-button-neutral', class: 'text-label-button-neutral', description: '버튼 중성 텍스트' },
      {
        name: 'text-label-button-alternative',
        class: 'text-label-button-alternative',
        description: '버튼 대체 텍스트',
      },
      { name: 'text-label-button-assistive', class: 'text-label-button-assistive', description: '버튼 보조 텍스트' },
      { name: 'text-label-button-disable', class: 'text-label-button-disable', description: '버튼 비활성 텍스트' },
    ],
    statusColors: [
      { name: 'text-status-positive', class: 'text-status-positive', description: '성공 상태 색상' },
      { name: 'text-status-cautionary', class: 'text-status-cautionary', description: '주의 상태 색상' },
      { name: 'text-status-negative', class: 'text-status-negative', description: '오류 상태 색상' },
    ],
    accentColors: [
      { name: 'text-accent-red-orange', class: 'text-accent-red-orange', description: '적색 오렌지 강조색' },
      { name: 'text-accent-lime', class: 'text-accent-lime', description: '라임 강조색' },
      { name: 'text-accent-cyan', class: 'text-accent-cyan', description: '청록 강조색' },
      { name: 'text-accent-light-blue', class: 'text-accent-light-blue', description: '연한 파랑 강조색' },
      { name: 'text-accent-violet', class: 'text-accent-violet', description: '보라 강조색' },
      { name: 'text-accent-purple', class: 'text-accent-purple', description: '자주 강조색' },
      { name: 'text-accent-pink', class: 'text-accent-pink', description: '분홍 강조색' },
    ],
    accentForegroundColors: [
      { name: 'text-accent-fg-red', class: 'text-accent-fg-red', description: '적색 전경 강조색' },
      { name: 'text-accent-fg-red-orange', class: 'text-accent-fg-red-orange', description: '적색 오렌지 전경 강조색' },
      { name: 'text-accent-fg-orange', class: 'text-accent-fg-orange', description: '오렌지 전경 강조색' },
      { name: 'text-accent-fg-lime', class: 'text-accent-fg-lime', description: '라임 전경 강조색' },
      { name: 'text-accent-fg-green', class: 'text-accent-fg-green', description: '녹색 전경 강조색' },
      { name: 'text-accent-fg-cyan', class: 'text-accent-fg-cyan', description: '청록 전경 강조색' },
      { name: 'text-accent-fg-light-blue', class: 'text-accent-fg-light-blue', description: '연한 파랑 전경 강조색' },
      { name: 'text-accent-fg-blue', class: 'text-accent-fg-blue', description: '파랑 전경 강조색' },
      { name: 'text-accent-fg-violet', class: 'text-accent-fg-violet', description: '보라 전경 강조색' },
      { name: 'text-accent-fg-purple', class: 'text-accent-fg-purple', description: '자주 전경 강조색' },
      { name: 'text-accent-fg-pink', class: 'text-accent-fg-pink', description: '분홍 전경 강조색' },
    ],
    borderColors: [
      { name: 'border-primary-normal', class: 'border-primary-normal border', description: '기본 색상 테두리' },
      { name: 'border-primary-strong', class: 'border-primary-strong border', description: '강한 기본 테두리' },
      { name: 'border-primary-heavy', class: 'border-primary-heavy border', description: '진한 기본 테두리' },
      { name: 'border-static-white', class: 'border-static-white border', description: '정적 흰색 테두리' },
      { name: 'border-static-black', class: 'border-static-black border', description: '정적 검은색 테두리' },
      { name: 'border-line-normal', class: 'border-line-normal border', description: '기본 테두리 색상' },
      { name: 'border-line-neutral', class: 'border-line-neutral border', description: '중성 테두리 색상' },
      { name: 'border-line-alternative', class: 'border-line-alternative border', description: '대체 테두리 색상' },
      { name: 'border-line-solid-normal', class: 'border-line-solid-normal border', description: '단색 기본 테두리' },
      { name: 'border-line-solid-neutral', class: 'border-line-solid-neutral border', description: '단색 중성 테두리' },
      {
        name: 'border-line-solid-alternative',
        class: 'border-line-solid-alternative border',
        description: '단색 대체 테두리',
      },
      {
        name: 'border-interaction-inactive',
        class: 'border-interaction-inactive border',
        description: '비활성 상호작용 테두리',
      },
      {
        name: 'border-interaction-disable',
        class: 'border-interaction-disable border',
        description: '비활성화 상호작용 테두리',
      },
      { name: 'border-inverse-primary', class: 'border-inverse-primary border', description: '역방향 기본 테두리' },
    ],
    statusBorderColors: [
      { name: 'border-status-positive', class: 'border-status-positive border', description: '성공 상태 테두리' },
      { name: 'border-status-cautionary', class: 'border-status-cautionary border', description: '주의 상태 테두리' },
      { name: 'border-status-negative', class: 'border-status-negative border', description: '오류 상태 테두리' },
    ],
    accentBorderColors: [
      {
        name: 'border-accent-red-orange',
        class: 'border-accent-red-orange border',
        description: '적색 오렌지 강조 테두리',
      },
      { name: 'border-accent-lime', class: 'border-accent-lime border', description: '라임 강조 테두리' },
      { name: 'border-accent-cyan', class: 'border-accent-cyan border', description: '청록 강조 테두리' },
      {
        name: 'border-accent-light-blue',
        class: 'border-accent-light-blue border',
        description: '연한 파랑 강조 테두리',
      },
      { name: 'border-accent-violet', class: 'border-accent-violet border', description: '보라 강조 테두리' },
      { name: 'border-accent-purple', class: 'border-accent-purple border', description: '자주 강조 테두리' },
      { name: 'border-accent-pink', class: 'border-accent-pink border', description: '분홍 강조 테두리' },
    ],
    fillColors: [
      { name: 'fill-primary-normal', class: 'fill-primary-normal', description: '기본 색상 채우기' },
      { name: 'fill-primary-strong', class: 'fill-primary-strong', description: '강한 기본 채우기' },
      { name: 'fill-primary-heavy', class: 'fill-primary-heavy', description: '진한 기본 채우기' },
      { name: 'fill-static-white', class: 'fill-static-white', description: '정적 흰색 채우기' },
      { name: 'fill-static-black', class: 'fill-static-black', description: '정적 검은색 채우기' },
      { name: 'fill-label-normal', class: 'fill-label-normal', description: '기본 라벨 채우기' },
      { name: 'fill-label-neutral', class: 'fill-label-neutral', description: '중성 라벨 채우기' },
      { name: 'fill-label-alternative', class: 'fill-label-alternative', description: '대체 라벨 채우기' },
      { name: 'fill-label-assistive', class: 'fill-label-assistive', description: '보조 라벨 채우기' },
      { name: 'fill-label-disable', class: 'fill-label-disable', description: '비활성 라벨 채우기' },
      { name: 'fill-status-positive', class: 'fill-status-positive', description: '성공 상태 채우기' },
      { name: 'fill-status-cautionary', class: 'fill-status-cautionary', description: '주의 상태 채우기' },
      { name: 'fill-status-negative', class: 'fill-status-negative', description: '오류 상태 채우기' },
    ],
    strokeColors: [
      { name: 'stroke-primary-normal', class: 'stroke-primary-normal', description: '기본 색상 스트로크' },
      { name: 'stroke-primary-strong', class: 'stroke-primary-strong', description: '강한 기본 스트로크' },
      { name: 'stroke-primary-heavy', class: 'stroke-primary-heavy', description: '진한 기본 스트로크' },
      { name: 'stroke-static-white', class: 'stroke-static-white', description: '정적 흰색 스트로크' },
      { name: 'stroke-static-black', class: 'stroke-static-black', description: '정적 검은색 스트로크' },
      { name: 'stroke-label-normal', class: 'stroke-label-normal', description: '기본 라벨 스트로크' },
      { name: 'stroke-label-neutral', class: 'stroke-label-neutral', description: '중성 라벨 스트로크' },
      { name: 'stroke-label-alternative', class: 'stroke-label-alternative', description: '대체 라벨 스트로크' },
      { name: 'stroke-line-normal', class: 'stroke-line-normal', description: '기본 라인 스트로크' },
      { name: 'stroke-line-neutral', class: 'stroke-line-neutral', description: '중성 라인 스트로크' },
      { name: 'stroke-line-alternative', class: 'stroke-line-alternative', description: '대체 라인 스트로크' },
      { name: 'stroke-status-positive', class: 'stroke-status-positive', description: '성공 상태 스트로크' },
      { name: 'stroke-status-cautionary', class: 'stroke-status-cautionary', description: '주의 상태 스트로크' },
      { name: 'stroke-status-negative', class: 'stroke-status-negative', description: '오류 상태 스트로크' },
    ],
  };

  const colors = colorGroups[colorType as keyof typeof colorGroups] || [];

  const getTitle = (colorType: string) => {
    const titles: Record<string, string> = {
      backgrounds: '기본 배경 색상',
      statusBackgrounds: '상태 배경 색상',
      accentBackgrounds: '강조 배경 색상',
      textColors: '기본 텍스트 색상',
      buttonTextColors: '버튼 텍스트 색상',
      statusColors: '상태 텍스트 색상',
      accentColors: '강조 텍스트 색상',
      accentForegroundColors: '전경 강조 색상',
      borderColors: '기본 테두리 색상',
      statusBorderColors: '상태 테두리 색상',
      accentBorderColors: '강조 테두리 색상',
      fillColors: 'SVG 채우기 색상',
      strokeColors: 'SVG 스트로크 색상',
    };
    return titles[colorType] || '색상';
  };

  const isBackgroundType = colorType.includes('Background') || colorType === 'backgrounds';
  const isBorderType = colorType.includes('border') || colorType.includes('Border');
  const isFillType = colorType === 'fillColors';
  const isStrokeType = colorType === 'strokeColors';

  return (
    <div className="bg-normal p-6 rounded-lg space-y-4">
      <h2 className="text-label-normal text-xl font-semibold mb-4">{getTitle(colorType)}</h2>
      <div className="grid gap-4">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div
              className={`w-16 h-16 rounded flex items-center justify-center ${
                isBackgroundType
                  ? color.class
                  : isBorderType
                    ? `bg-elevated-normal ${color.class}`
                    : isFillType || isStrokeType
                      ? 'bg-elevated-normal'
                      : 'bg-elevated-normal'
              }`}
            >
              {!isBackgroundType && !isBorderType && !isFillType && !isStrokeType ? (
                <span className={`${color.class} text-2xl font-bold`}>Aa</span>
              ) : isFillType ? (
                <svg width="32" height="32" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" className={color.class} />
                </svg>
              ) : isStrokeType ? (
                <svg width="32" height="32" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" fill="none" strokeWidth="2" className={color.class} />
                </svg>
              ) : null}
            </div>
            <div className="flex-1">
              <div className="text-label-normal font-mono text-sm">{color.name}</div>
              <div className="text-label-alternative text-sm">{color.description}</div>
            </div>
            <div className="text-white text-sm font-mono bg-component-fill-normal px-2 py-1 rounded">
              className="{color.class}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundation/Color Tokens',
  component: ColorShowcase,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0F0F10' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorShowcase>;

export default meta;
type Story = StoryObj<typeof ColorShowcase>;

export const BackgroundColors: Story = {
  name: '기본 배경 색상',
  args: {
    colorType: 'backgrounds',
  },
};

export const StatusBackgroundColors: Story = {
  name: '상태 배경 색상',
  args: {
    colorType: 'statusBackgrounds',
  },
};

export const AccentBackgroundColors: Story = {
  name: '강조 배경 색상',
  args: {
    colorType: 'accentBackgrounds',
  },
};

export const TextColors: Story = {
  name: '기본 텍스트 색상',
  args: {
    colorType: 'textColors',
  },
};

export const ButtonTextColors: Story = {
  name: '버튼 텍스트 색상',
  args: {
    colorType: 'buttonTextColors',
  },
};

export const StatusColors: Story = {
  name: '상태 텍스트 색상',
  args: {
    colorType: 'statusColors',
  },
};

export const AccentColors: Story = {
  name: '강조 텍스트 색상',
  args: {
    colorType: 'accentColors',
  },
};

export const AccentForegroundColors: Story = {
  name: '전경 강조 색상',
  args: {
    colorType: 'accentForegroundColors',
  },
};

export const BorderColors: Story = {
  name: '기본 테두리 색상',
  args: {
    colorType: 'borderColors',
  },
};

export const StatusBorderColors: Story = {
  name: '상태 테두리 색상',
  args: {
    colorType: 'statusBorderColors',
  },
};

export const AccentBorderColors: Story = {
  name: '강조 테두리 색상',
  args: {
    colorType: 'accentBorderColors',
  },
};

export const FillColors: Story = {
  name: 'SVG 채우기 색상',
  args: {
    colorType: 'fillColors',
  },
};

export const StrokeColors: Story = {
  name: 'SVG 스트로크 색상',
  args: {
    colorType: 'strokeColors',
  },
};
