'use client';

import { useEffect, useState } from 'react';
import { getJobRoles } from '@/feature/auth/selectJobButtonGroup/api';
import { JobRole } from '@/feature/auth/selectJobButtonGroup/type';
import Button from '@/shared/components/input/Button/Button';

interface SelectJobButtonGroupProps {
  selectedJobId: string;
  onJobSelect: (jobId: string) => void;
}

export const SelectJobButtonGroup = ({ selectedJobId, onJobSelect }: SelectJobButtonGroupProps) => {
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
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-12 bg-gray-700 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 text-sm text-center py-4">{error}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {jobRoles.map(job => (
        <Button
          key={job.id}
          type="button"
          onClick={() => onJobSelect(job.id)}
          variant={selectedJobId === job.id ? 'primary' : 'secondary'}
          size="ml"
          text={job.name}
        />
      ))}
    </div>
  );
};
