'use client';

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto">
        {/* Section 1: 매일 회고 작성 */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              매일 작성하는 회고
              <br />
              <span className="text-[#35D942]">나의 성장을 기록해요</span>
            </h2>
          </div>
          
          <div className="relative">
            <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 border border-gray-800">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    오늘 하루를 되돌아보고
                    <br />
                    내일을 계획해요
                  </h3>
                  <p className="text-gray-400 mb-6">
                    매일 회고를 작성하며 나의 성장을 기록하고,
                    더 나은 내일을 만들어가세요.
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-[#35D942] mr-2">✓</span>
                      간단한 질문으로 시작하는 회고
                    </li>
                    <li className="flex items-center">
                      <span className="text-[#35D942] mr-2">✓</span>
                      AI가 제안하는 맞춤형 회고 템플릿
                    </li>
                    <li className="flex items-center">
                      <span className="text-[#35D942] mr-2">✓</span>
                      일별, 주별, 월별 회고 관리
                    </li>
                  </ul>
                </div>
                <div className="relative h-[400px]">
                  {/* Placeholder for app screenshot */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#35D942]/20 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: GROWIT 특징 */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              GROWIT만의
              <br />
              <span className="text-[#35D942]">특별한 성장 도구</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📝',
                title: '목표 관리',
                description: '주간 목표를 설정하고 일일 투두로 세분화하여 체계적으로 관리하세요',
              },
              {
                icon: '🤖',
                title: 'AI 회고 도우미',
                description: 'AI가 제안하는 회고 질문과 템플릿으로 더 깊이 있는 성찰이 가능해요',
              },
              {
                icon: '📊',
                title: '성장 분석',
                description: '회고 데이터를 기반으로 나의 성장 패턴과 트렌드를 한눈에 확인하세요',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 hover:border-[#35D942]/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: 커뮤니티 */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              함께 성장하는
              <br />
              <span className="text-[#35D942]">GROWIT 커뮤니티</span>
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#35D942]/10 to-transparent rounded-2xl p-8 md:p-12 border border-[#35D942]/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="grid grid-cols-2 gap-4">
                  {/* Community stats */}
                  <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[#35D942]">12만+</div>
                    <div className="text-sm text-gray-400">누적 회고</div>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[#35D942]">5천+</div>
                    <div className="text-sm text-gray-400">활동 사용자</div>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[#35D942]">98%</div>
                    <div className="text-sm text-gray-400">만족도</div>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[#35D942]">4.8</div>
                    <div className="text-sm text-gray-400">평점</div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold text-white mb-4">
                  혼자가 아닌 함께
                </h3>
                <p className="text-gray-400 mb-6">
                  비슷한 목표를 가진 사람들과 함께 성장하며
                  서로에게 동기부여가 되어주세요.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-[#35D942] mr-2">✓</span>
                    회고 공유와 피드백
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#35D942] mr-2">✓</span>
                    목표별 스터디 그룹
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#35D942] mr-2">✓</span>
                    성장 챌린지 참여
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;