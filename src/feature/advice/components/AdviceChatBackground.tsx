import Image from 'next/image';

type AdviceChatBackgroundType = 'default' | 'writing' | 'sleeping' | 'noGoal';

type AdviceChatBackgroundProps = {
  type: AdviceChatBackgroundType;
};

export const AdviceChatBackground = ({ type }: AdviceChatBackgroundProps) => {
  const renderBackground = (type: AdviceChatBackgroundType) => {
    switch (type) {
      case 'default':
        return <AdviceChatImage type={type} />;
      case 'writing':
        return <AdviceChatVideo type={type} />;
      case 'sleeping':
        return <AdviceChatVideo type={type} />;
      case 'noGoal':
        return <AdviceChatImage type={type} />;
      default:
        return <AdviceChatImage type={type} />;
    }
  };

  return <>{renderBackground(type)}</>;
};

type AdviceChatImageProps = {
  type: Extract<AdviceChatBackgroundType, 'default' | 'noGoal'>;
};
const AdviceChatImage = ({ type }: AdviceChatImageProps) => {
  const getImageSource = () => {
    switch (type) {
      case 'default':
        return '/advice/advice-chat-default.png';
      case 'noGoal':
        return '/advice/advice-chat-nogoal.png';
      default:
        return '/advice/advice-chat-default.png';
    }
  };

  return (
    <div className="relative mt-auto w-full pointer-events-none">
      <div className="absolute top-0 left-0 right-0 h-24 sm:h-28 md:h-32 bg-gradient-to-b from-[#1b1c1e] via-[#1b1c1e]/80 to-transparent z-1" />
      <div className="relative w-full h-56 w-[370px]:h-64">
        <Image
          src={getImageSource()}
          alt="advice-chat-background-image"
          fill
          className="object-cover object-[25%_85%]"
          priority
        />
      </div>
    </div>
  );
};

type AdviceChatVideoProps = {
  type: Extract<AdviceChatBackgroundType, 'writing' | 'sleeping'>;
};

const AdviceChatVideo = ({ type = 'writing' }: AdviceChatVideoProps) => {
  const getVideoSource = () => {
    switch (type) {
      case 'writing':
        return '/advice/advice-chat-writing.mp4';
      case 'sleeping':
        return '/advice/advice-chat-sleeping.mp4';
    }
  };

  return (
    <div className="relative mt-auto w-full pointer-events-none">
      <div className="absolute top-0 left-0 right-0 h-24 sm:h-28 md:h-32 bg-gradient-to-b from-[#1b1c1e] via-[#1b1c1e]/80 to-transparent z-1" />
      {/* Video container - 모바일 해상도에 따라 높이 조정 */}
      <div className="relative w-full h-56 w-[370px]:h-64">
        <video
          src={getVideoSource()}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[25%_85%]"
        />
      </div>
    </div>
  );
};
