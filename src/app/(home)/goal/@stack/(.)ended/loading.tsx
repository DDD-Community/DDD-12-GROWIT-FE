export default function EndedGoalsListLoader() {
  return (
    <div className="flex-1 overflow-y-auto">
      <nav className="px-2 pt-8 pb-4 w-full border-b border-line-normal flex items-center justify-start">
        <div className="w-8 h-8 bg-elevated-normal rounded" />
      </nav>
      <ul className="grid grid-cols-2 w-full place-items-center gap-4 pt-5 pb-16 px-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <li key={i} className="h-40 w-40 bg-elevated-normal rounded animate-pulse" />
        ))}
      </ul>
    </div>
  );
}
