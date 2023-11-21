import PropTypes from 'prop-types';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';

import { _tags } from 'src/_mock';

// ----------------------------------------------------------------------

const DURATIONS = ['0 - 1 Hour', '1 - 3 Hours', '3 - 6 Hours', '6 - 18 Hours', '18+ Hours'];

// ----------------------------------------------------------------------

export default function FilterDuration({ filterSelect, onChangeSelect, name, type, categories }) {
  const ITEM = type === 'duration' ? DURATIONS : categories;

  return (
    <FormControl fullWidth hiddenLabel>
      <Select
        multiple
        displayEmpty
        name={name}
        value={filterSelect}
        onChange={onChangeSelect}
        renderValue={(selected) => {
          if (!selected.length) {
            return (
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                All {type.charAt(0).toUpperCase() + type.slice(1)}
              </Typography>
            );
          }
          return (
            <Typography variant="subtitle2" component="span">
              {selected.join(', ')}
            </Typography>
          );
        }}
      >
        {ITEM.map((duration) => (
          <MenuItem key={duration} value={duration}>
            <Checkbox
              size="small"
              checked={filterSelect.includes(duration)}
              sx={{
                [`&.${checkboxClasses.root}`]: {
                  p: 0,
                  mr: 1,
                },
              }}
            />
            {duration}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

FilterDuration.propTypes = {
  filterSelect: PropTypes.arrayOf(PropTypes.string),
  onChangeSelect: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  categories: PropTypes.array,
};
