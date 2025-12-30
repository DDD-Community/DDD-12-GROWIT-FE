export default function AdviceHistoryLoading() {
  return (
    <main className="flex flex-col h-full p-5 gap-y-5 max-w-md w-full mx-auto">
      <h1 className="h-16 w-full bg-elevated-normal rounded-lg animate-pulse"></h1>
      <ul className="flex flex-col gap-y-2 label-1-normal text-text-primary">
        <li className="h-12 bg-elevated-normal rounded-lg animate-pulse" />
        <li className="h-12 bg-elevated-normal rounded animate-pulse" />
        <li className="h-12 bg-elevated-normal rounded animate-pulse" />
      </ul>

      <ul className="flex flex-col gap-y-2 label-1-normal text-text-primary">
        <li className="h-12 bg-elevated-normal rounded animate-pulse" />
        <li className="h-12 bg-elevated-normal rounded animate-pulse" />
      </ul>
    </main>
  );
}
