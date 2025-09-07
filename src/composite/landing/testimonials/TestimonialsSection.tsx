'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: '김민수',
    role: '프론트엔드 개발자',
    content: 'GROWIT을 사용한 후 매일 회고를 작성하는 습관이 생겼어요. 목표 관리가 체계적으로 되니 성장이 눈에 보여요!',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    id: 2,
    name: '이서연',
    role: 'UI/UX 디자이너',
    content: 'AI가 제안해주는 회고 템플릿이 정말 유용해요. 혼자서는 생각하지 못했던 관점에서 돌아볼 수 있게 되었어요.',
    rating: 5,
    avatar: '👩‍🎨',
  },
  {
    id: 3,
    name: '박준호',
    role: '대학생',
    content: '목표를 주간 단위로 관리하니 부담없이 꾸준히 할 수 있어요. 커뮤니티에서 받는 응원도 큰 힘이 됩니다!',
    rating: 5,
    avatar: '🧑‍🎓',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto">
        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              사용자들의
              <br />
              <span className="text-[#35D942]">생생한 후기</span>
            </h2>
          </div>

          {/* Desktop: Show all testimonials */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <div
                key={testimonial.id}
                className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800 hover:border-[#35D942]/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#35D942] text-[#35D942]" />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map(testimonial => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800">
                      <div className="flex items-center mb-4">
                        <div className="text-4xl mr-3">{testimonial.avatar}</div>
                        <div>
                          <div className="font-semibold text-white">{testimonial.name}</div>
                          <div className="text-sm text-gray-400">{testimonial.role}</div>
                        </div>
                      </div>

                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#35D942] text-[#35D942]" />
                        ))}
                      </div>

                      <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-[#1A1A1A] rounded-full border border-gray-800"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-[#1A1A1A] rounded-full border border-gray-800"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-6 bg-[#35D942]' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { TestimonialsSection };
