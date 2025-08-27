'use client';

import { useEffect, useState } from 'react';
import { getJobRoles } from '@/feature/auth/selectJobResponsive/api';
import { JobRole } from '@/feature/auth/selectJobResponsive/type';
import { Select } from '@/shared/components/input/Select';

interface SelectJobSelectProps {
  selectedJobId: string;
  onJobSelect: (jobId: string) => void;
}

const SelectJobSelect = ({ selectedJobId, onJobSelect }: SelectJobSelectProps) => {
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const roles = await getJobRoles();
        setJobRoles(roles);
      } catch (err) {
        setError('직업 목록을 불러오는데 실패했습니다.');
        console.error('Failed to fetch job roles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobRoles();
  }, []);

  if (isLoading) {
    return <div className="h-[50px] bg-gray-700 rounded-lg animate-pulse" />;
  }

  if (error) {
    return <div className="text-red-400 text-sm text-center py-4">{error}</div>;
  }

  return (
    <Select
      options={jobRoles.map(role => role.name)}
      selected={selectedJobId || '선택'}
      onChange={value => onJobSelect(value === '선택' ? '' : value)}
      placeholder="직무를 선택해주세요"
      isError={error !== null}
    />
  );
};

export default SelectJobSelect;
