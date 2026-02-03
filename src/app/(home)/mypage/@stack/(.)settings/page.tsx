import { Screen } from '@/shared/components/foundation/Screen';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { SettingsContent } from '@/composite/mypage/settings/component';

export default function SettingsPage() {
  return (
    <Screen className="absolute inset-0">
      <PageHeader title="설정" />
      <SettingsContent />
    </Screen>
  );
}
