import Navigation from '@/composite/retrospect/navigation/component';

const RetrospectPage = () => {
  return (
    <div className="md:p-12">
      <h1 className="title-3-bold text-label-normal px-4 py-4 md:p-5">회고</h1>
      <div className="w-screen border border-b border-line-normal"></div>

      <main className="w-full max-w-3xl mx-auto">
        <Navigation />
      </main>
    </div>
  );
};

export default RetrospectPage;
