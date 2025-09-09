import Image from 'next/image';

const AboutGrowitSection = () => {
  const tabs = [
    {
      id: 'WHO' as const,
      title: 'WHO',
      content: {
        image: '/landing/landing-about-1.png',
        width: 220,
        height: 120,
        description: '갓생을 살고 싶은\nIT 직군을 위해',
      },
    },
    {
      id: 'HOW' as const,
      title: 'HOW',
      content: {
        image: '/landing/landing-about-2.png',
        width: 220,
        height: 120,
        description: 'AI와\n게이미피케이션을 활용해서',
      },
    },
    {
      id: 'WHAT' as const,
      title: 'WHAT',
      content: {
        image: '/landing/landing-about-3.png',
        width: 300,
        height: 120,
        description: '목표를 쉽고 재미있게\n달성 할 수 있도록',
      },
    },
  ];

  return (
    <section className="relative pb-12 px-4 bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-l from-[#35D942]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
            <span className="text-white">GROWIT은</span>
            <br />
            <span className="bg-gradient-to-r from-[#35D942] via-[#24A8D4] to-[#8B5CF6] bg-clip-text text-transparent">
              꾸준히 성장할 수 있는
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              서비스
              <span className="text-white">를 제공해요</span>
            </span>
          </h2>
          <p className="text-[#C2C4C8]/88 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Growit은 Grow+IT를 합친 말로,
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            '성장하고 싶은 IT인'을 뜻해요
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-center">
          {tabs.map(tab => (
            <div key={tab.id} className="relative w-full lg:w-80">
              {/* Tab Card */}
              <div className="bg-[#2E2F33]/50 border border-[#494949] rounded-2xl p-8">
                {/* Tab Header */}
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-[#2E2F33]/88 border border-[#70737C]/32 rounded-full px-5 py-2">
                    <span className="text-[#F7F7F8] font-bold text-sm tracking-wider">{tab.title}</span>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="text-center">
                  {/* Image */}
                  <div className="mx-auto mb-4" style={{ width: tab.content.width, height: tab.content.height }}>
                    <Image
                      src={tab.content.image}
                      alt={tab.title}
                      width={tab.content.width}
                      height={tab.content.height}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-white font-bold text-xl leading-tight whitespace-pre-line">
                    {tab.content.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutGrowitSection;
