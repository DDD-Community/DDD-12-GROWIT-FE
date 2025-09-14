import axios from 'axios';

export interface EarlyBirdEventRequest {
  phone: string;
}

interface EarlyBirdEventResponse {
  success: boolean;
  message: string;
  data: any;
}

export async function postEarlyBirdEvent(request: EarlyBirdEventRequest) {
  const response = await axios.post<EarlyBirdEventResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/externals/invitations`,
    request,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}
