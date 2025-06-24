'use client';

import { useToast } from '@/shared/components/toast';
import Button from '@/shared/components/Button';

export default function TestToastPage() {
  const { showToast } = useToast();

  const handleTestSuccess = () => {
    showToast('성공 메시지입니다!', 'success');
  };

  const handleTestError = () => {
    showToast('에러 메시지입니다!', 'error');
  };

  const handleTestWarning = () => {
    showToast('경고 메시지입니다!', 'warning');
  };

  const handleTestInfo = () => {
    showToast('정보 메시지입니다!', 'info');
  };

  return (
    <div className="p-8 space-y-4 bg-gray-200">
      <h1 className="text-2xl font-bold">토스트 테스트 페이지</h1>

      <div className="space-y-2">
        <button
          onClick={handleTestSuccess}
          className="block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          성공 토스트 테스트
        </button>

        <button onClick={handleTestError} className="block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          에러 토스트 테스트
        </button>

        <button
          onClick={handleTestWarning}
          className="block px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          경고 토스트 테스트
        </button>

        <button
          onClick={handleTestInfo}
          className="block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          정보 토스트 테스트
        </button>
        <Button size={'xl'} text={'버튼'} isPending={false} />
      </div>
    </div>
  );
}
