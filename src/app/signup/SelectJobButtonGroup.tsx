'use client';

import { useEffect, useState } from 'react';
import { getJobRoles } from './api';
import { JobRole } from './type';

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
        <button
          key={job.id}
          type="button"
          onClick={() => onJobSelect(job.id)}
          className={`h-12 px-4 rounded-lg border transition-all duration-200 ${
            selectedJobId === job.id
              ? 'bg-[#8C7FF7] border-[#8C7FF7] text-white'
              : 'bg-transparent border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
          }`}
        >
          {job.name}
        </button>
      ))}
    </div>
  );
};
