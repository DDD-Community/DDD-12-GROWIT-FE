import Image from 'next/image';

type GrorongStatus = 'welcome' | 'excited' | 'curious';

interface GuideMessageProps {
  text: string;
  highlight: string[];
  status?: GrorongStatus;
}

export const GuideMessage = ({ text, highlight, status = 'welcome' }: GuideMessageProps) => {
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
                <span key={index} className="font-bold">
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
    <div className="flex items-center gap-2 py-6">
      <div className="relative flex-shrink-0">
        {/* Mobile */}
        <div className="block sm:hidden">
          <Image
            src={`/image/grorong-${status}-s.png`}
            alt="그로롱"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        {/* Desktop */}
        <div className="hidden sm:block">
          <Image
            src={`/image/grorong-${status}-m.png`}
            alt="그로롱"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
      </div>

      <div className="inline-block">
        <div className="bg-[#2C2C2E] rounded-2xl px-4 py-3 shadow-md inline-block">
          <p className="text-white text-[16px] leading-relaxed">{getHighlightedText()}</p>
        </div>
      </div>
    </div>
  );
};
