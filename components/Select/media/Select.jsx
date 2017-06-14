import Trigger from '../Trigger.jsx';
import SelectDropdown from './SelectDropdown.jsx';
import SelectHOC from '../SelectHOC.jsx';

const MediaSelect = SelectHOC({
  DefaultTrigger: Trigger,
  Dropdown: SelectDropdown,
  type: 'media',
});

export default MediaSelect;
