// 버튼 스타일을 가져오기 위한 유틸 함수

export type ButtonVariants = 'primary' | 'secondary' | 'tertiary' | 'accent';
export type ButtonLayouts = 'normal' | 'icon-left' | 'icon-right' | 'icon-only';
export type ButtonSize = 'sm' | 'ml' | 'lg' | 'xl';

const ButtonSizeMap = {
  sm: { textPad: 'py-[8px] px-[14px]', iconPad: 'p-2', font: 'label-1-bold' },
  ml: { textPad: 'py-[10px] px-[16px]', iconPad: 'p-[10px]', font: 'label-1-bold' },
  lg: { textPad: 'py-[10px] px-[18px]', iconPad: 'p-3', font: 'body-1-bold' },
  xl: { textPad: 'py-[12px] px-[20px]', iconPad: 'p-[14px]', font: 'body-1-bold' },
} as const satisfies Record<
  ButtonSize,
  {
    textPad: string;
    iconPad: string;
    font: string;
  }
>;

const ButtonVariantMap = {
  primary: {
    enabled: 'bg-primary-normal hover:bg-primary-strong focus:outline-4 focus:outline-solid focus:outline-line-normal',
    disabled: 'bg-interaction-disable text-label-disable cursor-not-allowed',
  },
  secondary: {
    enabled:
      'bg-label-button-neutral border border-line-normal hover:bg-fill-strong focus:outline-4 focus:outline-solid focus:outline-line-normal text-label-normal',
    disabled: 'bg-interaction-disable text-label-disable border border-line-alternative cursor-not-allowed',
  },
  tertiary: {
    enabled: 'hover:bg-fill-normal text-label-normal',
    disabled: 'text-label-disable cursor-not-allowed',
  },
  accent: {
    enabled:
      'bg-accent-violet hover:bg-accent-violet/50 focus:outline-4 focus:outline-solid focus:outline-line-normal text-primary-normal hover:text-primary-normal/50',
    disabled: 'bg-interaction-disable text-label-disable border border-line-alternative cursor-not-allowed',
  },
} as const satisfies Record<
  ButtonVariants,
  {
    enabled: string;
    disabled: string;
  }
>;

export const getButtonClasses = (
  variant: ButtonVariants,
  layout: ButtonLayouts,
  size: ButtonSize,
  disabled: boolean
) => {
  const { textPad, iconPad, font } = ButtonSizeMap[size];
  const padding = layout === 'icon-only' ? iconPad : textPad;
  const width = layout === 'icon-only' ? '' : 'w-full';
  const variantClass = ButtonVariantMap[variant][disabled ? 'disabled' : 'enabled'];

  return [width, padding, font, variantClass].filter(Boolean).join(' ');
};
