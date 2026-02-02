'use client';

import { useEditProfile } from '@/composite/mypage/editProfile/hooks';
import Badge from '@/shared/components/display/Badge';

export function DisplayProfileSection() {
  const { profile } = useEditProfile();
  return (
    <div className="flex flex-col gap-2">
      <h2 className="heading-2-bold">{profile.userName}</h2>
      <div className="gap-2 flex items-center">
        <Badge type="default" size="md" label={profile.jobRole} textColor="text-black" />
        <span className="body-1-normal text-label-neutral">{profile.careerMapDisplay[profile.careerYear]}</span>
      </div>
    </div>
  );
}
