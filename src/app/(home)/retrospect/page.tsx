import Navigation from '@/composite/retrospect/navigation/component';

const RetrospectPage = () => {
  return (
    <div className="p-12">
      <h1 className="title-3-bold text-label-normal p-5 max-w-3xl mx-auto">회고</h1>
      <div className="border border-b border-line-normal"></div>

      <main className="max-w-3xl w-full mx-auto">
        <Navigation />
      </main>
    </div>
  );
};

export default RetrospectPage;
