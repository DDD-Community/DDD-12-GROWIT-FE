import Image from 'next/image';
import { ToolTip } from '@/shared/components/display/ToolTip';
import { GrorongIntimacyLevel } from './type';
import { GrorongMessage, GrorongIntimacyLevelImage, GrorongIntimacyLevelBackground } from './const';

interface GrorongCardProps {
  intimacyLevel: GrorongIntimacyLevel;
}

export const GrorongCard = ({ intimacyLevel }: GrorongCardProps) => {
  const grorongMessage =
    GrorongMessage[intimacyLevel][Math.floor(Math.random() * GrorongMessage[intimacyLevel].length)];
  //const backgroundImage = GrorongIntimacyLevelBackground[intimacyLevel][grorongMessage];

  return (
    <>
      <p className="body-1-bold text-label-neutral mb-1">그로롱의 한마디</p>
      <div className="relative pt-6 px-4 pb-24 rounded-2xl overflow-hidden">
        <Image src="/image/intimacy-low-bg.png" alt="background" fill className={`object-cover object-top`} />
        <div className="relative z-10">
          <h2 className="headline-1-bold text-white">최고의 아이디어는 종종 테이블 위의 커피 잔 옆에서 나온다!</h2>
          <div className="absolute top-8 right-0">
            <div className="relative">
              <ToolTip text={grorongMessage} position="left" />
              <Image
                src={GrorongIntimacyLevelImage[intimacyLevel][grorongMessage]}
                alt="grorong"
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
