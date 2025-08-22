interface RetrospectOpenProps {
  title: string;
  renderTodoProgress?: () => React.ReactNode;
  content: string;
}

export const RetrospectOpen = ({ title, renderTodoProgress, content }: RetrospectOpenProps) => {
  return (
    <div className="flex flex-col gap-4 w-full bg-elevated-normal py-5 px-6 pb-8 rounded-lg">
      <p className="headline-1-bold text-label-normal">{title}</p>
      {renderTodoProgress && renderTodoProgress()}
      <p className="label-1-normal text-label-normal opacity-70">{content}</p>
    </div>
  );
};
