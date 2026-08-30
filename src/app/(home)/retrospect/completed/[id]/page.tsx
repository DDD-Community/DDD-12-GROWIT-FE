import { CompletedDetailRetrospect } from '@/composite/retrospect/detail/component';

export function generateStaticParams() {
  return [{ id: '_' }];
}

const RetrospectDetailPage = () => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <CompletedDetailRetrospect />
    </div>
  );
};

export default RetrospectDetailPage;
