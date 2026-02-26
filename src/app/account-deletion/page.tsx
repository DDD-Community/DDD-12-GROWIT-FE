import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '계정 삭제 안내 | Growit',
  description: 'Growit 앱의 계정 삭제 요청 방법 및 데이터 처리 안내 페이지입니다.',
};

const CONTACT_EMAIL = 'developerseok@gmail.com';

export default function AccountDeletionPage() {
  return (
    <div className="min-h-dvh bg-normal-alternative text-label-normal font-pretendard">
      {/* 헤더 */}
      <header className="w-full bg-elevated-normal border-b border-line-solid-normal">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-neon flex items-center justify-center">
            <span className="text-black font-bold text-sm">G</span>
          </div>
          <span className="heading-2-bold text-label-normal">Growit</span>
        </div>
      </header>

      {/* 본문 */}
      <main className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        {/* 타이틀 */}
        <div className="space-y-2">
          <h1 className="title-3-bold text-label-normal">계정 삭제 안내</h1>
          <p className="body-1-regular text-label-neutral">
            Growit 앱의 계정 삭제 요청 방법과 삭제되는 데이터 범위를 안내합니다.
          </p>
        </div>

        {/* 섹션 1 — 앱 정보 */}
        <section className="bg-elevated-normal rounded-2xl p-6 space-y-3">
          <SectionTitle>앱 정보</SectionTitle>
          <InfoRow label="앱 이름" value="Growit (그로잇)" />
          <InfoRow label="개발사" value="DDD Community — Team Growit" />
          <InfoRow label="문의 이메일" value={CONTACT_EMAIL} isEmail />
        </section>

        {/* 섹션 2 — 삭제 요청 방법 */}
        <section className="bg-elevated-normal rounded-2xl p-6 space-y-4">
          <SectionTitle>계정 삭제 요청 방법</SectionTitle>

          <div className="space-y-2">
            <p className="label-1-bold text-label-normal">방법 1 — 앱 내 직접 탈퇴</p>
            <ol className="space-y-1 pl-1">
              {[
                '앱 실행 후 하단 탭에서 마이페이지 이동',
                '우측 상단 설정(⚙) 아이콘 터치',
                '설정 화면 하단의 회원탈퇴 항목 선택',
                '탈퇴 확인 모달에서 탈퇴 버튼 터치',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2 body-2-regular text-label-neutral">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-fill-normal flex items-center justify-center caption-1-bold text-label-normal">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <Divider />

          <div className="space-y-2">
            <p className="label-1-bold text-label-normal">방법 2 — 이메일 요청</p>
            <p className="body-2-regular text-label-neutral">
              아래 이메일로 <strong className="text-label-normal">계정에 등록된 이메일 주소</strong>와 함께 탈퇴 요청을
              보내주세요.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Growit 계정 삭제 요청`}
              className="inline-block body-2-medium text-brand-neon underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>

        {/* 섹션 3 — 삭제되는 데이터 */}
        <section className="bg-elevated-normal rounded-2xl p-6 space-y-4">
          <SectionTitle>삭제되는 데이터</SectionTitle>
          <p className="body-2-regular text-label-neutral">계정 삭제 시 아래의 모든 데이터가 영구 삭제됩니다.</p>
          <ul className="space-y-2">
            {[
              { category: '계정 정보', items: '이메일 주소, 이름/성, 소셜 로그인 연동 정보' },
              { category: '사주 정보', items: '생년월일, 태어난 시각, 성별' },
              { category: '목표 데이터', items: '생성한 모든 목표(Goal) 및 설정 정보' },
              { category: '투두 데이터', items: '등록한 모든 할 일(Todo) 및 완료 기록' },
              { category: '회고 데이터', items: '작성한 모든 회고(Retrospect) 내용' },
              { category: '활동 기록', items: '출석 스트릭, 주간 목표 달성 기록' },
            ].map(({ category, items }) => (
              <li key={category} className="flex flex-col gap-0.5">
                <span className="label-1-bold text-label-normal">{category}</span>
                <span className="body-2-regular text-label-neutral">{items}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 섹션 4 — 보관 기간 */}
        <section className="bg-elevated-normal rounded-2xl p-6 space-y-4">
          <SectionTitle>데이터 보관 기간</SectionTitle>
          <ul className="space-y-3">
            <RetentionItem
              title="즉시 삭제"
              description="탈퇴 완료 시 계정 정보, 목표·투두·회고 등 서비스 이용 데이터는 즉시 접근이 차단됩니다."
            />
            <RetentionItem
              title="30일 내 완전 삭제"
              description="탈퇴 요청일로부터 30일 이내에 모든 개인정보가 서버에서 완전히 삭제됩니다."
            />
            <RetentionItem
              title="법정 보관 데이터"
              description="관련 법령(전자상거래법 등)에 따라 일부 접속 로그는 최대 30일간 보관 후 자동 삭제됩니다. 이 데이터는 법적 의무 목적 외에는 사용되지 않습니다."
              highlight
            />
          </ul>
        </section>

        {/* 안내 문구 */}
        <p className="caption-1-regular text-label-alternative text-center pb-4">
          계정 삭제 후에는 동일 계정으로 재가입하거나 데이터를 복구할 수 없습니다.
          <br />
          문의 사항은{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-label-neutral underline underline-offset-1">
            {CONTACT_EMAIL}
          </a>
          로 연락해 주세요.
        </p>
      </main>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="headline-1-bold text-label-normal flex items-center gap-2">
      <span className="w-1 h-4 rounded-full bg-brand-neon inline-block" />
      {children}
    </h2>
  );
}

function InfoRow({ label, value, isEmail }: { label: string; value: string; isEmail?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="label-1-medium text-label-neutral shrink-0">{label}</span>
      {isEmail ? (
        <a href={`mailto:${value}`} className="body-2-regular text-brand-neon underline underline-offset-2 text-right">
          {value}
        </a>
      ) : (
        <span className="body-2-regular text-label-normal text-right">{value}</span>
      )}
    </div>
  );
}

function Divider() {
  return <hr className="border-line-solid-alternative" />;
}

function RetentionItem({ title, description, highlight }: { title: string; description: string; highlight?: boolean }) {
  return (
    <li className={`rounded-xl p-4 space-y-1 ${highlight ? 'bg-fill-alternative' : 'bg-fill-alternative/50'}`}>
      <p className={`label-1-bold ${highlight ? 'text-status-cautionary' : 'text-label-normal'}`}>{title}</p>
      <p className="body-2-regular text-label-neutral">{description}</p>
    </li>
  );
}
