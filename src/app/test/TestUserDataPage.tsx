'use client';

// 임시로 MockAPI 가 잘 동작하는지 확인해보기 위한 테스트 컴포넌트
// 삭제해도 상관없음
import { useEffect, useState } from 'react';

export default function TestUserDataPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    };
    fetcher();
  }, []);

  return (
    <div>
      ✅ 클라이언트 MSW 테스트:
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
