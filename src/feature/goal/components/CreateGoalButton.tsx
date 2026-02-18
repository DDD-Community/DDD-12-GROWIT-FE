import { StackNavButton } from '@/shared/components/feedBack/StackNavButton';
import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/lib/utils';
import { ButtonSizeMap, ButtonVariantMap } from '@/shared/components/input/Button/utils/button';
import { Icon } from '@/shared/components/foundation/Icons';

export function CreateGoalButton() {
  return (
    <StackNavButton
      href={ROUTES.CREATE_GOAL}
      className={cn(
        'flex items-center gap-x-2 label-1-bold',
        ButtonVariantMap['primary'].enabled,
        ButtonSizeMap['ml'].textPad
      )}
    >
      <Icon name="plus" width={16} height={16} />
      목표 추가하기
    </StackNavButton>
  );
}
