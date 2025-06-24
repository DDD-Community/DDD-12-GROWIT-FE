import Button from '@/shared/components/Button';
import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    tokenController.clearTokens();
    router.push('/login');
  };

  return <Button size={'ml'} text={'로그아웃'} onClick={handleLogout} />;
};
