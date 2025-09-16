import Image from 'next/image';
import { kakaoLoginAction } from './actions';

export const KakaoLoginButton = () => {
  return (
    <form action={kakaoLoginAction}>
      <button
        type="submit"
        className="w-full flex items-center justify-center cursor-pointer gap-3 bg-[#FEE500] hover:bg-[#FDD835] disabled:bg-gray-300 disabled:cursor-not-allowed py-3 px-4 rounded-lg text-black font-medium"
      >
        <Image src="/kakao.svg" alt="kakao" width={19} height={19} />
        카카오 로그인
      </button>
    </form>
  );
};
