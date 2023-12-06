import { useMemo } from 'react';
import PropTypes from 'prop-types';

const RyzolveLogo = ({
  dimensions,
  ryzolveLogoIconWidth,
  ryzolveLogoIconHeight,
  ryzolveLogoIconPosition,
  ryzolveLogoIconTop,
  ryzolveLogoIconLeft,
}) => {
  const ryzolveLogoIconStyle = useMemo(() => ({
      width: ryzolveLogoIconWidth,
      height: ryzolveLogoIconHeight,
      position: ryzolveLogoIconPosition,
      top: ryzolveLogoIconTop,
      left: ryzolveLogoIconLeft,
    }), [
    ryzolveLogoIconWidth,
    ryzolveLogoIconHeight,
    ryzolveLogoIconPosition,
    ryzolveLogoIconTop,
    ryzolveLogoIconLeft,
  ]);

  return (
    <img className="w-[151.8px] h-[30px]" alt="" src={dimensions} style={ryzolveLogoIconStyle} />
  );
};

RyzolveLogo.propTypes = {
  dimensions: PropTypes.string,
  ryzolveLogoIconWidth: PropTypes.string,
  ryzolveLogoIconHeight: PropTypes.string,
  ryzolveLogoIconPosition: PropTypes.string,
  ryzolveLogoIconTop: PropTypes.string,
  ryzolveLogoIconLeft: PropTypes.string,
};

export default RyzolveLogo;
