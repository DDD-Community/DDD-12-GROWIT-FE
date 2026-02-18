import { pl } from 'date-fns/locale';

export const RightArrowIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

type IconComponentProps = React.SVGProps<SVGSVGElement> & { name: string; className?: string };

const ClipboardIcon = ({ ...props }: IconComponentProps) => {
  return (
    <svg
      width={props.width ?? '24'}
      height={props.height ?? '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={props.className}
    >
      <path
        d="M6 11C6 8.172 6 6.757 6.879 5.879C7.757 5 9.172 5 12 5H15C17.828 5 19.243 5 20.121 5.879C21 6.757 21 8.172 21 11V16C21 18.828 21 20.243 20.121 21.121C19.243 22 17.828 22 15 22H12C9.172 22 7.757 22 6.879 21.121C6 20.243 6 18.828 6 16V11Z"
        stroke={props.stroke ?? 'currentColor'}
        strokeWidth={props.strokeWidth ?? '1.5'}
      />
      <path
        opacity="0.5"
        d="M6 19C5.20435 19 4.44129 18.6839 3.87868 18.1213C3.31607 17.5587 3 16.7956 3 16V10C3 6.229 3 4.343 4.172 3.172C5.344 2.001 7.229 2 11 2H15C15.7956 2 16.5587 2.31607 17.1213 2.87868C17.6839 3.44129 18 4.20435 18 5"
        stroke={props.stroke ?? 'currentColor'}
        strokeWidth={props.strokeWidth ?? '1.5'}
      />
    </svg>
  );
};

const CheckIcon = ({ ...props }: IconComponentProps) => {
  return (
    <svg
      width={props.width ?? '24'}
      height={props.height ?? '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={props.className}
    >
      <path
        d="M20 6L9 17L4 12"
        stroke={props.stroke ?? 'currentColor'}
        strokeWidth={props.strokeWidth ?? '2'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CheckedNeon = ({ ...props }: IconComponentProps) => {
  return (
    <svg
      width={props.width ?? '20'}
      height={props.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.0774 4.41107C16.4028 4.08563 16.9304 4.08563 17.2558 4.41107C17.5812 4.73651 17.5812 5.26402 17.2558 5.58946L8.08913 14.7561C7.76369 15.0816 7.23618 15.0816 6.91074 14.7561L2.74408 10.5895C2.41864 10.264 2.41864 9.73651 2.74408 9.41107C3.06951 9.08563 3.59703 9.08563 3.92246 9.41107L7.49994 12.9885L16.0774 4.41107Z"
        fill="#3AEE49"
      />
    </svg>
  );
};
const PlusIcon = ({ ...props }: IconComponentProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.99935 4.16699V15.8337M4.16602 10.0003H15.8327"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ChevronLeftIcon = ({ ...props }: IconComponentProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};

const MoreVerticalIcon = ({ ...props }: IconComponentProps) => {
  return (
    <svg width="3" height="17" viewBox="0 0 3 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.5 14.25C2.19036 14.25 2.75 14.8096 2.75 15.5C2.75 16.1904 2.19036 16.75 1.5 16.75C0.809644 16.75 0.25 16.1904 0.25 15.5C0.25 14.8096 0.809644 14.25 1.5 14.25ZM1.5 7.25C2.19036 7.25 2.75 7.80964 2.75 8.5C2.75 9.19036 2.19036 9.75 1.5 9.75C0.809644 9.75 0.25 9.19036 0.25 8.5C0.25 7.80964 0.809644 7.25 1.5 7.25ZM1.5 0.25C2.19036 0.25 2.75 0.809644 2.75 1.5C2.75 2.19036 2.19036 2.75 1.5 2.75C0.809644 2.75 0.25 2.19036 0.25 1.5C0.25 0.809644 0.809644 0.25 1.5 0.25Z"
        fill="white"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const iconMap = {
  clipboard: ClipboardIcon,
  check: CheckIcon,
  checked: CheckedNeon,
  plus: PlusIcon,
  chevronLeft: ChevronLeftIcon,
  moreVertical: MoreVerticalIcon,
};

export const Icon = ({ className = '', ...props }: IconComponentProps) => {
  const IconComponent = iconMap[props.name as keyof typeof iconMap];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent {...props} className={className} />;
};
