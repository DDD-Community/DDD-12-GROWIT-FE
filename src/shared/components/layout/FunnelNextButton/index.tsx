'use client';

import Button from '@/shared/components/input/Button';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'brand';

interface FunnelNextButtonProps {
  text?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
}

export const FunnelNextButton = ({
  text = '다음',
  type = 'button',
  disabled = false,
  onClick,
  variant = 'primary',
}: FunnelNextButtonProps) => {
  return (
    <>
      {/* Desktop: 인라인 버튼 */}
      <div className="hidden sm:flex justify-end">
        <div className="flex justify-end">
          <Button size="lg" type="button" text={text} variant={variant} disabled={disabled} onClick={onClick} />
        </div>
      </div>

      {/* Mobile: 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 p-[20px] border-gray-800 sm:hidden">
        <Button
          size="lg"
          type={type}
          text={text}
          variant={variant}
          disabled={disabled}
          onClick={onClick}
          className="w-full"
        />
      </div>
    </>
  );
};
