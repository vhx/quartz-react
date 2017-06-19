import SelectDropdown from './SelectDropdown.jsx';
import SelectHOC from '../SelectHOC.jsx';

const MediaSelect = SelectHOC({
  Dropdown: SelectDropdown,
  type: 'media',
});

export default MediaSelect;
