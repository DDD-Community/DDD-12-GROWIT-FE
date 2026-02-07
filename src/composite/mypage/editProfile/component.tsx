'use client';

import { useToast } from '@/shared/components/feedBack/toast';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { StackBackButton } from '@/shared/components/feedBack/StackNavButton';
import { RightArrowIcon } from '@/shared/components/foundation/Icons';
import { InputField } from '@/shared/components/input/InputField';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { useFetchUserName } from '@/shared/hooks';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';
import { zodResolver } from '@hookform/resolvers/zod';

export const EditProfile = () => {
  return (
    <>
      <PageHeader
        title="프로필 수정"
        leftSection={
          <StackBackButton className="p-2">
            <RightArrowIcon className="rotate-180" />
          </StackBackButton>
        }
      />
      <section className="h-[calc(100vh-100px)]">
        <EditProfileForm />
      </section>
    </>
  );
};

const EditProfileFormSchema = z.object({
  email: z.string().min(1, '이름을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  lastName: z.string().min(1, '성을 입력해주세요.'),
  firstName: z.string().min(1, '이름을 입력해주세요.'),
  birthDate: z.string().min(1, '생년월일을 입력해주세요.'),
  birthTime: z.string().min(1, '태어난 시각을 입력해주세요.'),
});

type EditProfileFormData = z.infer<typeof EditProfileFormSchema>;

function EditProfileForm() {
  const { userName, email } = useFetchUserName();

  const { register, handleSubmit } = useForm<EditProfileFormData>({
    defaultValues: {
      email: email,
      password: '',
      lastName: userName.split(' ')[0] || '',
      firstName: userName.split(' ')[1] || '',
      birthDate: '',
      birthTime: '',
    },
    resolver: zodResolver(EditProfileFormSchema),
  });

  const { editProfile } = useEditProfileForm();

  return (
    <form
      onSubmit={handleSubmit(data => editProfile(data))}
      className="flex flex-col gap-y-6 h-full overflow-y-auto px-5 pt-5 pb-20"
    >
      <InputField label="이메일" {...register('email')} />
      <InputField label="비밀번호" type="password" {...register('password')} />
      <InputField label="성" {...register('lastName')} />
      <InputField label="이름" {...register('firstName')} />
      <InputField label="생년월일" {...register('birthDate')} />
      <InputField label="태어난 시각" {...register('birthTime')} />
    </form>
  );
}

const useEditProfileForm = () => {
  const { showToast } = useToast();
  const {
    mutate: editProfile,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (data: EditProfileFormData) => {
      await apiClient.put<EditProfileFormData>('/users/myprofile', data);
    },
    onSuccess: () => {
      showToast('프로필이 성공적으로 수정되었습니다.', 'success');
    },
    onError: () => {
      showToast('프로필 수정에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });

  return { editProfile, isPending, isError };
};
