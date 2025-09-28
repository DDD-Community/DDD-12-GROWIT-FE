export const GrorongLoading = () => {
  return (
    <div className="min-w-[335px] min-h-[174px] bg-elevated-assistive border-line-normal rounded-xl p-6 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-gray-100 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm text-gray-500">그로롱의 조언 로딩 중...</p>
      </div>
    </div>
  );
};
