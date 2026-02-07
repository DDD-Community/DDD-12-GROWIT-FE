import { SettingsContent } from '@/composite/mypage/settings/component';
import { StackBackButton } from '@/shared/components/feedBack/StackNavButton';
import { RightArrowIcon } from '@/shared/components/foundation/Icons';
import { PageHeader } from '@/shared/components/layout/PageHeader';

export default function SettingsInterceptPage() {
  return (
    <>
      <PageHeader
        title="설정"
        leftSection={
          <StackBackButton className="p-2">
            <RightArrowIcon className="rotate-180" />
          </StackBackButton>
        }
      />
      <SettingsContent />
    </>
  );
}
