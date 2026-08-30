import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';
import { Contribution } from '@/shared/type/Todo';
import { http, HttpResponse } from 'msw';

interface ContributionListRequest {
  goalId: string;
}

interface ContributionListResponse extends CommonResponse<Contribution[]> {}

export async function getContributionList(req: ContributionListRequest) {
  const { data } = await apiClient.get<ContributionListResponse>(`/todos?goalId=${req.goalId}`);
  return data.data;
}

export const getContribution = http.get(`${process.env.NEXT_PUBLIC_API_URL}/mock/todos`, () => {
  return HttpResponse.json({
    data: [
      'COMPLETED',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'NONE',
      'NONE',
      'COMPLETED',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'COMPLETED',
      'NONE',
      'NONE',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'COMPLETED',
      'NONE',
      'COMPLETED',
      'NONE',
      'NONE',
      'COMPLETED',
      'NONE',
      'COMPLETED',
    ],
  });
});
