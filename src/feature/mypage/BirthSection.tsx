const BirthSection = () => {
  return (
    <section className="bg-fill-secondary grid grid-cols-[1fr_1fr] divide-x divide-border-primary rounded-xl w-full">
      <BirthDaySection />
      <BirthTimeSection />
    </section>
  );
};

const BirthDaySection = () => {
  return (
    <div className="py-4 px-5 space-y-1 label-1-medium">
      <p className="text-text-primary">생년월일</p>
      <p className="text-text-strong">2001.12.10</p>
    </div>
  );
};

const BirthTimeSection = () => {
  return (
    <div className="py-4 px-5 space-y-1 label-1-medium">
      <p className="text-text-primary">태어난 시각</p>
      <p className="text-text-strong">미시 13:30~15:30</p>
    </div>
  );
};

export { BirthSection };
