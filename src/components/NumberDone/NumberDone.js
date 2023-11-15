import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { Group13Icon } from './Group13Icon';
import classes from './NumberDone.module.css';
import { Ellipse38Icon } from './Ellipse38Icon';

const NumberDone = ({ index, lessonComplete }) => (
  <div className={classes.ellipse38}>
    <Ellipse38Icon className={classes.icon} />
    <div className={classes._2}>{index + 1}</div>
    {lessonComplete && (
      <div className={classes.group13}>
        <Group13Icon className={classes.icon2} />
      </div>
    )}
  </div>
);

NumberDone.propTypes = {
  index: PropTypes.any,
  lessonComplete: PropTypes.bool,
};

export default NumberDone;
