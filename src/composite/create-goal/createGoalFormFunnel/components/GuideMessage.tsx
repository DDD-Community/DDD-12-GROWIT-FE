import Image from 'next/image';

type GrorongStatus = 'default' | 'exciting' | 'happy';

interface GuideMessageProps {
  text: string;
  highlight: string[];
  status?: GrorongStatus;
}

export const GuideMessage = ({ text, highlight, status = 'default' }: GuideMessageProps) => {
  const getHighlightedText = () => {
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => {
      if (!highlight || highlight.length === 0) {
        return (
          <span key={lineIndex}>
            {line}
            {lineIndex < lines.length - 1 && <br />}
          </span>
        );
      }

      const pattern = new RegExp(
        `(${highlight.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
        'gi'
      );
      const parts = line.split(pattern);

      return (
        <span key={lineIndex}>
          {parts.map((part, index) => {
            const isHighlighted = highlight.some(word => part.toLowerCase() === word.toLowerCase());

            if (isHighlighted) {
              return (
                <span key={index} className="font-bold text-[#3AEE49]">
                  {part}
                </span>
              );
            }
            return <span key={index}>{part}</span>;
          })}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="flex justify-end items-center gap-2 py-6 pl-6">
      <div className="inline-block">
        <div className="bg-[#2E2F33] rounded-t-2xl rounded-r-2xl rounded-bl-2xl rounded-br-none px-[28px] py-[20px] shadow-md inline-block">
          <p className="text-white text-[18px] font-bold leading-[1.445]">{getHighlightedText()}</p>
        </div>
      </div>
      <div className="relative flex-shrink-0">
        <div className="block sm:hidden">
          <Image
            src={`/image/grorong-right-${status}.png`}
            alt="그로롱"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};
