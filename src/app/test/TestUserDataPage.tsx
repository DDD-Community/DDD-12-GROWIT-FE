'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

// 임시로 MockAPI 가 잘 동작하는지 확인해보기 위한 테스트 컴포넌트
// 삭제해도 상관없음
export const TestUserDataPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">No user data found</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">User Information</h1>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">ID:</span> {user.id}
          </p>
          <p>
            <span className="font-semibold">First Name:</span> {user.firstName}
          </p>
          <p>
            <span className="font-semibold">Last Name:</span> {user.lastName}
          </p>
        </div>
      </div>
    </div>
  );
};
