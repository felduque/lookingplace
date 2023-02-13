import * as React from "react";

const StarIcon = (props) => (
  <svg
    viewBox="-2.4 -2.4 28.8 28.8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={-2.4}
      y={-2.4}
      width={28.8}
      height={28.8}
      rx={14.4}
      fill="#f5f5f5"
      strokeWidth={0}
    />
    <path
      d="m12 17.328-5.403 3.286a.75.75 0 0 1-1.12-.813l1.456-6.155-4.796-4.123a.75.75 0 0 1 .428-1.316l6.303-.517 2.44-5.835a.75.75 0 0 1 1.384 0l2.44 5.835 6.303.517a.75.75 0 0 1 .427 1.316l-4.795 4.123 1.456 6.155a.75.75 0 0 1-1.12.813L12 17.328z"
      fill="#000"
    />
  </svg>
);

export default StarIcon;
