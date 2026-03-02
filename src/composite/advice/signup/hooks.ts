import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/shared/components/feedBack/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';
import { useUser } from '@/shared/hooks/useUser';
import { useRouter } from 'next/navigation';
import { UserQueryKeys } from '@/model/user';
import { useCallback } from 'react';

const SajuSignupSchema = z.object({
  saju: z.object({
    gender: z.enum(['MALE', 'FEMALE'], { errorMap: () => ({ message: '성별을 선택해주세요.' }) }),
    birth: z
      .string()
      .min(1, '생년월일을 입력해주세요.')
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식으로 입력해주세요.'),
    birthHour: z.string().min(1, '태어난 시각을 선택해주세요.'),
  }),
});

type SajuSignupFormData = z.infer<typeof SajuSignupSchema>;

export const useSajuSignup = () => {
  const { userInfo } = useUser();
  const { showToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const formMethods = useForm<SajuSignupFormData>({
    resolver: zodResolver(SajuSignupSchema),
  });

  const { mutate: submitSaju, isPending } = useMutation({
    mutationFn: async (data: SajuSignupFormData) => {
      if (!userInfo) throw new Error('사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      await apiClient.put('/users/myprofile', {
        email: userInfo.email,
        name: userInfo.name,
        lastName: userInfo.lastName,
        ...data,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: UserQueryKeys.userInfo() });
      showToast('사주 정보가 저장되었습니다!', 'success');
      setTimeout(() => {
        router.replace('/advice');
      }, 300);
    },
    onError: (error: Error) => {
      showToast(error.message || '사주 정보 저장에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });

  const onChangeBirthDate = useCallback((e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 4) value = value.slice(0, 4) + '-' + value.slice(4);
    if (value.length > 7) value = value.slice(0, 7) + '-' + value.slice(7);
    if (value.length > 10) value = value.slice(0, 10);
    onChange(value);
  }, []);

  return { formMethods, submitSaju, isPending, onChangeBirthDate };
};
