export const mockToggle = {
  // Mock 환경 활성화
  enableMock() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('useMockAPI', 'true');
      console.log('Mock API가 활성화되었습니다.');
    }
  },

  // Mock 환경 비활성화
  disableMock() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('useMockAPI');
      console.log('Mock API가 비활성화되었습니다.');
    }
  },

  // Mock 환경 상태 확인
  isMockEnabled(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('useMockAPI') === 'true';
    }
    return false;
  },

  // Mock 환경 토글
  toggleMock() {
    if (this.isMockEnabled()) {
      this.disableMock();
    } else {
      this.enableMock();
    }
  },
};
