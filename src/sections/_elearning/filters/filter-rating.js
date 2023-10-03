import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Rating from '@mui/material/Rating';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// ----------------------------------------------------------------------

const RATINGS = [4, 2, 0];

export default function FilterRating({ filterRating, onChangeRating, name }) {
  return (
    <RadioGroup value={filterRating} onChange={onChangeRating} name={name}>
      <Stack spacing={2} alignItems="flex-start">
        {RATINGS.map((rating) => (
          <FormControlLabel
            key={rating}
            value={rating}
            control={<Radio sx={{ display: 'none' }} />}
            label={
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  ...(filterRating === rating && {
                    fontWeight: 'fontWeightSemiBold',
                  }),
                }}
              >
                <Rating
                  size="small"
                  readOnly
                  value={rating}
                  sx={{
                    mr: 1,
                    ...(filterRating === rating && {
                      opacity: 0.48,
                    }),
                  }}
                />
                & Up
              </Stack>
            }
            sx={{
              m: 0,
              '&:hover': { opacity: 0.48 },
            }}
          />
        ))}
      </Stack>
    </RadioGroup>
  );
}

FilterRating.propTypes = {
  filterRating: PropTypes.string,
  onChangeRating: PropTypes.func,
  name: PropTypes.string,
};
