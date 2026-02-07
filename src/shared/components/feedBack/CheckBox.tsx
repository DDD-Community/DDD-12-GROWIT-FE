type CheckBoxProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CheckBox: React.FC<CheckBoxProps> = ({ label, type = 'checkbox', ...props }) => {
  return (
    <div className="flex items-center gap-x-2">
      <input
        type={type}
        {...props}
        className="appearance-none w-3.5 h-3.5 rounded-full bg-normal border border-gray-500 checked:border-4 checked:border-icon-strong"
      />
      {/** label명이 없을 시 id를 통해 바인딩 */}
      <label htmlFor={label || props.id} className="text-text-primary body-2-medium">
        {label}
      </label>
    </div>
  );
};
