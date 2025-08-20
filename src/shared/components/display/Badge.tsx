import clsx from 'clsx';

type BadgeType = 'default' | 'dot' | 'icon-right' | 'icon-left' | 'icon-only';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  type: BadgeType;
  size: BadgeSize;
  color?: string;
  textColor?: string;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

const Badge = ({
  type,
  size,
  color = 'bg-brand-neon',
  textColor = 'text-label-normal',
  icon,
  label,
  className,
}: BadgeProps) => {
  const baseClass = clsx(
    `inline-flex items-center gap-2 label-1-normal whitespace-nowrap ${color} ${textColor} ${className}`,
    type === 'icon-only'
      ? 'rounded-full p-2'
      : size === 'sm'
        ? 'py-1 px-3 text-xs rounded-2xl'
        : size === 'md'
          ? 'py-1 px-4 text-sm rounded-2xl'
          : size === 'lg'
            ? 'py-2 px-5 text-sm rounded-2xl'
            : className
  );

  const renderContent = () => {
    switch (type) {
      case 'dot':
        return (
          <>
            <svg
              width="8"
              height="8"
              viewBox="0 0 6 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="3" cy="3" r="3" fill="#F7F7F8" />
            </svg>
            {label}
          </>
        );
      case 'icon-left':
        return (
          <>
            {icon && <span aria-hidden="true">{icon}</span>}
            {label}
          </>
        );
      case 'icon-right':
        return (
          <>
            {label}
            {icon && <span aria-hidden="true">{icon}</span>}
          </>
        );
      case 'icon-only':
        return <>{icon}</>;
      default:
        return <>{label}</>;
    }
  };

  const accessibleLabel = type === 'icon-only' ? label : undefined;

  return (
    <span className={baseClass} role={type === 'icon-only' ? 'img' : undefined} aria-label={accessibleLabel}>
      {renderContent()}
    </span>
  );
};

export default Badge;
