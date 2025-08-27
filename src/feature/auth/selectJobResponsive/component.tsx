'use client';

import { useEffect, useState } from 'react';
import { getJobRoles } from '@/feature/auth/selectJobResponsive/api';
import { JobRole } from '@/feature/auth/selectJobResponsive/type';
import Button from '@/shared/components/input/Button/Button';
import { Select } from '@/shared/components/input/Select';

interface SelectJobResponsiveProps {
  selectedJobId: string;
  onJobSelect: (jobId: string) => void;
}

export const SelectJobResponsive = ({ selectedJobId, onJobSelect }: SelectJobResponsiveProps) => {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobRoles();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="hidden md:grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-12 bg-gray-700 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="block md:hidden h-[50px] bg-gray-700 rounded-lg animate-pulse" />
      </>
    );
  }

  if (error) {
    return <div className="text-red-400 text-sm text-center py-4">{error}</div>;
  }

  const selectedJob = jobRoles.find(job => job.id === selectedJobId);
  const selectedLabel = selectedJob ? selectedJob.name : '선택';

  return (
    <>
      {/* Desktop: Button Group */}
      <div className="hidden md:grid grid-cols-3 gap-3">
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

      {/* Mobile: Select Dropdown */}
      <div className="block md:hidden">
        <Select
          options={['선택', ...jobRoles.map(role => role.name)]}
          selected={selectedLabel}
          onChange={value => {
            if (value === '선택') {
              onJobSelect('');
            } else {
              const job = jobRoles.find(role => role.name === value);
              if (job) onJobSelect(job.id);
            }
          }}
          placeholder="직무를 선택해주세요"
        />
      </div>
    </>
  );
};
