type IconKey = 'circle' | 'whiteCircle';

const circle = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_429_3017)">
      <path
        d="M10 18.3334C14.6024 18.3334 18.3333 14.6025 18.3333 10.0001C18.3333 5.39771 14.6024 1.66675 10 1.66675C5.39763 1.66675 1.66667 5.39771 1.66667 10.0001C1.66667 14.6025 5.39763 18.3334 10 18.3334Z"
        stroke="#171719"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_429_3017">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const whiteCircle = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_429_3017)">
      <path
        d="M10 18.3334C14.6024 18.3334 18.3333 14.6025 18.3333 10.0001C18.3333 5.39771 14.6024 1.66675 10 1.66675C5.39763 1.66675 1.66667 5.39771 1.66667 10.0001C1.66667 14.6025 5.39763 18.3334 10 18.3334Z"
        stroke="white"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_429_3017">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const X = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 1L1 11M1 1L11 11"
      stroke="#F7F7F8"
      stroke-width="1.67"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Icons: Record<IconKey, React.ReactNode> = {
  circle: circle,
  whiteCircle: whiteCircle,
};

export default Icons;
