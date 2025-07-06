import { CommonResponse } from '@/shared/type/response';
import { apiClient } from '@/shared/lib/apiClient';
import { JobRole } from '@/feature/auth/selectJobButtonGroup/type';

interface JobRolesResponse extends CommonResponse<{ jobRoles: JobRole[] }> {}

export async function getJobRoles() {
  const { data } = await apiClient.get<JobRolesResponse>('/resource/jobroles');
  return data.data.jobRoles;
}
