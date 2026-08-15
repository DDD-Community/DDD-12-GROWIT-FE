export default function GoalEditPageLoading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-bg-default">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
      <p className="text-gray-100 text-sm font-medium">목표 데이터를 불러오는 중입니다...</p>
    </div>
  );
}
