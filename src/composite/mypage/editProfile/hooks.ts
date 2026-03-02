import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/shared/components/feedBack/toast';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';
import { useUser } from '@/shared/hooks/useUser';

const BaseProfileSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.'),
  lastName: z.string().min(1, '성을 입력해주세요.'),
  name: z.string().min(1, '이름을 입력해주세요.'),
});

export type BaseProfileData = z.infer<typeof BaseProfileSchema>;

const EditProfileFormSchema = z.intersection(
  BaseProfileSchema,
  z.object({
    saju: z.object({
      gender: z.enum(['MALE', 'FEMALE'], { errorMap: () => ({ message: '성별을 선택해주세요.' }) }),
      birth: z
        .string()
        .min(1, '생년월일을 입력해주세요.')
        .regex(/^\d{4}-\d{2}-\d{2}$/, '생년월일은 YYYY-MM-DD 형식이어야 합니다.'),
      birthHour: z.string().min(1, '태어난 시각을 입력해주세요.'),
    }),
  })
);

export type EditProfileFormData = z.infer<typeof EditProfileFormSchema>;

export const useEditProfile = () => {
  const { userInfo } = useUser();
  const { showToast } = useToast();

  const sajuInfo = userInfo?.saju || null;
  const formMethods = useForm<EditProfileFormData>({
    defaultValues: {
      email: userInfo?.email || '',
      name: userInfo?.name || '',
      lastName: userInfo?.lastName || '',
      saju: sajuInfo
        ? {
            gender: sajuInfo.gender,
            birth: sajuInfo.birth,
            birthHour: sajuInfo.birthHour,
          }
        : undefined,
    },
    resolver: zodResolver(EditProfileFormSchema),
  });

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

  return { formMethods, editProfile, isPending, isError };
};
