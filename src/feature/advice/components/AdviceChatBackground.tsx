import Image from 'next/image';

type AdviceChatBackgroundType = 'default' | 'writing' | 'sleeping' | 'noGoal';

type AdviceChatBackgroundProps = {
  type: AdviceChatBackgroundType;
};

export const AdviceChatBackground = ({ type }: AdviceChatBackgroundProps) => {
  const renderBackground = (type: AdviceChatBackgroundType) => {
    return <AdviceChatImage type={type === 'noGoal' ? 'noGoal' : 'default'} />;
  };

  return <>{renderBackground(type)}</>;
};

type AdviceChatImageProps = {
  type: 'default' | 'noGoal';
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
