import Trigger from '../Trigger.jsx';
import SelectDropdown from './SelectDropdown.jsx';
import SelectHOC from '../SelectHOC.jsx';

const Select = SelectHOC({
  DefaultTrigger: Trigger,
  Dropdown: SelectDropdown,
  type: 'standard', // NOTE: 'standard' isn't used anywhere, just specifying that it's not 'media'
});

export default Select;
