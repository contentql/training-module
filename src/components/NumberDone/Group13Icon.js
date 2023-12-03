import {
  memo,
  // SVGProps
} from 'react';

const Group13Icon = (props) => (
  <svg
    preserveAspectRatio="none"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={4.5} cy={4.5} r={4.5} fill="#037F00" stroke="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.37557 3.16993C7.55786 3.37735 7.5375 3.69328 7.33008 3.87557L3.9166 6.87557C3.72224 7.04639 3.42967 7.0407 3.2421 6.86246L1.65558 5.35484C1.4554 5.16462 1.44733 4.84814 1.63755 4.64796C1.82777 4.44778 2.14425 4.43971 2.34443 4.62993L3.5997 5.82277L6.66993 3.12444C6.87735 2.94214 7.19327 2.96251 7.37557 3.16993Z"
      fill="white"
    />
  </svg>
);
const Memo = memo(Group13Icon);
export { Memo as Group13Icon };
