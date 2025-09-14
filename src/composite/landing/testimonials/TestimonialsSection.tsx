'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'IT 개발자 K',
    role: '',
    content: '복잡한 계획 말고 딱 하나에 집중했더니 성공 확률이 달라졌습니다!',
    rating: 4,
    avatar: '',
  },
  {
    id: 2,
    name: 'IT 개발자 K',
    role: '',
    content: '목표 여정이 딱딱하지 않고, 게임처럼 이어져서 즐거워요.',
    rating: 5,
    avatar: '',
  },
  {
    id: 3,
    name: '기획자 D',
    role: '',
    content: '그로잇 덕분에 작은 목표가 모여, 제 일상이 달라졌습니다.',
    rating: 5,
    avatar: '',
  },
];

const TestimonialsSection = () => {
  return (
    <section tabIndex={0} className="py-20 px-4 bg-black min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        {/* Testimonials */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-b from-[#35D942] to-[#8B5CF6] bg-clip-text text-transparent">
                그로잇
                <span className="text-white">을 경험한 사람들이</span>
                <br className="md:hidden" />
                <span className="text-white"> 전하는 이야기</span>
              </span>
            </h2>
          </div>

          {/* Desktop: Show all testimonials */}
          <div className="hidden md:grid md:grid-cols-3 gap-3">
            {testimonials.map(testimonial => (
              <div
                key={testimonial.id}
                className="bg-[rgba(46,47,51,0.5)] rounded-[20px] p-10 border border-[#494949] h-[260px] flex flex-col justify-between"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-9 h-9 ${
                        i < testimonial.rating
                          ? 'fill-[#35D942] text-[#35D942]'
                          : 'fill-[rgba(152,155,162,0.16)] text-[rgba(152,155,162,0.16)] stroke-[rgba(174,176,182,0.28)]'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-[#DCDCDC] leading-relaxed text-xl mb-4">"{testimonial.content}"</p>

                <div className="text-[rgba(174,176,182,0.61)] text-xl font-semibold">- {testimonial.name}</div>
              </div>
            ))}
          </div>

          {/* Mobile: Vertical Stack */}
          <div className="md:hidden flex flex-col gap-4">
            {testimonials.map(testimonial => (
              <div
                key={testimonial.id}
                className="bg-[rgba(46,47,51,0.5)] rounded-[20px] p-7 border border-[#494949] flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-9 h-9 ${
                          i < testimonial.rating
                            ? 'fill-[#35D942] text-[#35D942]'
                            : 'fill-[rgba(152,155,162,0.16)] text-[rgba(152,155,162,0.16)] stroke-[rgba(174,176,182,0.28)]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-[#DCDCDC] text-base leading-relaxed">"{testimonial.content}"</p>

                <p className="text-[rgba(174,176,182,0.61)] text-base font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { TestimonialsSection };
