import Image from 'next/image';

interface GoalPointerIconProps {
  isActivate: boolean;
}

export const GoalPointerIcon = ({ isActivate }: GoalPointerIconProps) => {
  if (isActivate) {
    return (
      <Image
        src="/icon/goal-pointer-activate.svg"
        alt="goal pointer active"
        width={40}
        height={40}
        className="bg-black rounded-[8px]"
      />
    );
  }
  return (
    <Image
      src="/icon/goal-pointer-deactivate.svg"
      alt="goal pointer inactive"
      width={40}
      height={40}
      className="bg-black rounded-[8px]"
    />
  );
};
