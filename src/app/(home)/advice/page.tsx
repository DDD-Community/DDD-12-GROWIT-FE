import { AdviceChatClient } from '@/composite/advice';

export const dynamic = 'force-dynamic';
// const delayRender = (delay: number) => {
//   return new Promise(resolve => setTimeout(resolve, delay));
// };
export default function AdvicePage() {
  return <AdviceChatClient />;
}
