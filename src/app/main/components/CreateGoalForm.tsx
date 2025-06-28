import { useForm } from 'react-hook-form';
import { SignupFormData } from '@/app/signup/type';
import { CreateGoalFormData } from '@/app/main/type';
import { InputField } from '@/shared/components/input/InputField';

export const CreateGoalForm = () => {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateGoalFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      duration: {
        startDate: '',
        endDate: '',
      },
      beforeAfter: {
        asIs: '',
        toBe: '',
      },
      plans: [],
    },
  });

  return (
    <form>
      <InputField
        label="목표이름"
        type="text"
        placeholder="목표이름을 입력해주세요."
        isError={!!errors.name}
        errorMessage={errors.name?.message as string}
        {...register('name', {
          required: '목표이름을 입력해주세요.',
        })}
      />
      <InputField
        label="목표설정(As Is)"
        type="text"
        placeholder="목표이름을 입력해주세요."
        isError={!!errors.beforeAfter?.asIs}
        errorMessage={errors.beforeAfter?.asIs?.message}
        {...register('beforeAfter.asIs', {
          required: '현재 상태를 간단히 입력해주세요.',
        })}
      />
      <InputField
        label="목표설정(To Be)"
        type="text"
        placeholder="4주 후 이루고 싶은 목표를 간단히 입력해주세요."
        isError={!!errors.beforeAfter?.toBe}
        errorMessage={errors.beforeAfter?.toBe?.message}
        {...register('beforeAfter.toBe', {
          required: '4주 후 이루고 싶은 목표를 간단히 입력해주세요.',
        })}
      />
    </form>
  );
};
