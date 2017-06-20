import jsdom from 'mocha-jsdom';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Select from './standard/Select.jsx';
import MediaSelect from './media/Select.jsx';

// NOTE: we use these stateful selects in order to make assertions about changing the state
import StatefulSelect from '../../demo/src/demo-select-minimal.jsx';
import StatefulMediaSelect from '../../demo/src/demo-media-select-processing.jsx';

// `description` and `imageUrl` are optional.
// `imageUrl` can only be used in <MediaSelect /> (it will be ignored if passed to a standard <Select />)
const opts = [
  { description: 'Hello 1', label: 'Option #1', uniqueId: 'id1', imageUrl: '/1.jpg' },
  { description: 'Hello 2', label: 'Option #2', uniqueId: 'id2', imageUrl: '/2.jpg' },
  { description: 'Hello 3', label: 'Option #3', uniqueId: 'id3', imageUrl: '/3.jpg' },
];

const noop = () => {};

describe('Select', () => {
  jsdom();

  [[ 'Standard', Select ], [ 'Media', MediaSelect ]].forEach(([ label, SelectComponent ]) => {
    describe(label, () => {
      it('Renders', () => {
        const wrapper = shallow(<SelectComponent options={opts} onOpenToggle={noop} isOpen={false} selectedOptions={{}} onSelectionToggle={noop} />);
        expect(wrapper.exists()).to.equal(true);
      });

      it('Does not render a dropdown when !isOpen', () => {
        const wrapper = mount(<SelectComponent options={opts} onOpenToggle={noop} isOpen={false} selectedOptions={{}} onSelectionToggle={noop} />);
        expect(wrapper.find('.c-select--dropdown').length).to.equal(0);
      });

      it('Renders a dropdown when isOpen', () => {
        const wrapper = mount(<SelectComponent options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{}} onSelectionToggle={noop} />);
        expect(wrapper.find('.c-select--dropdown').length).to.equal(1);
      });

      it('Defaults to no selected options', () => {
        const wrapper = mount(<SelectComponent options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{}} onSelectionToggle={noop} />);
        expect(wrapper.find('.is-selected').length).to.equal(0);
      });

      it('Selects the correct option', () => {
        const wrapper = mount(<SelectComponent options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{ id1: true }} onSelectionToggle={noop} />);
        expect(wrapper.find('.is-selected').length).to.equal(1);
        expect(wrapper.find('.is-selected').text()).to.include('Option #1'); // includes the label
        expect(wrapper.find('.is-selected').text()).to.include('Hello 1'); // also includes the description
      });

      it('Can have multiple selected options', () => {
        const wrapper = mount(<SelectComponent options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{ id1: true, id3: true }} onSelectionToggle={noop} />);
        expect(wrapper.find('.is-selected').length).to.equal(2);
        expect(wrapper.find('.is-selected').get(0).textContent).to.include('Option #1');
        expect(wrapper.find('.is-selected').get(1).textContent).to.include('Option #3');
      });

      it('Accepts custom <Trigger />', () => {
        const Trigger = () => <div className='my-trigger-el'>Custom trigger!</div>;
        const wrapper = mount(<SelectComponent options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{}} onSelectionToggle={noop} Trigger={Trigger} />);
        expect(wrapper.find('.my-trigger-el').length).to.equal(1);
        expect(wrapper.find('.my-trigger-el').text()).to.equal('Custom trigger!');
      });

      it('Has no search input by default', () => {
        const wrapper = mount(<SelectComponent options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{}} onSelectionToggle={noop} />);
        expect(wrapper.find('input').length).to.equal(0);
      });

      it('Has a search input if given a search function prop', () => {
        const wrapper = mount(<SelectComponent options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{}} onSelectionToggle={noop} search={noop} />);
        expect(wrapper.find('input').length).to.equal(1);
      });

      it('Is not loading by default', () => {
        const wrapper = mount(<SelectComponent options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{}} onSelectionToggle={noop} />);
        expect(wrapper.find('.is-loading').length).to.equal(0);
      });

      it('Can be put into a loading state', () => {
        const wrapper = mount(<SelectComponent options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{}} onSelectionToggle={noop} isLoading />);
        expect(wrapper.find('.is-loading').length).to.equal(1);
      });

      it('Can be passed a custom trigger placeholder', () => {
        const wrapper = mount(<SelectComponent options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{}} onSelectionToggle={noop} triggerPlaceholder='Foo' />);
        const trigger = wrapper.find('.c-select--trigger');
        expect(trigger.text()).to.equal('Foo');
      });
    });
  });

  describe('Media (exclusive props)', () => {
    it('Displays processing state (only if multiselect for now)', () => {
      const wrapper = mount(<MediaSelect options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{}} onSelectionToggle={noop} processingOptions={[ 'id1', 'id3' ]} multiSelect />);
      const options = wrapper.find('.c-media-item--action');
      expect(options.length).to.equal(3); // make sure all options are visible
      expect(options.at(0).find('.loader-white').exists()).to.equal(true);
      expect(options.at(1).find('.loader-white').exists()).to.equal(false); // this one is not in processing array. only 1 and 3 are.
      expect(options.at(2).find('.loader-white').exists()).to.equal(true);
    });

    it('Displays media item images', () => {
      const wrapper = mount(<MediaSelect options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{}} onSelectionToggle={noop} />);
      const options = wrapper.find('.c-media-item--image');
      expect(options.length).to.equal(3);
      options.forEach((opt, i) => {
        const imageUrl = opts[i].imageUrl;
        expect(opt.html()).to.include(imageUrl);
      });
    });

    it('Truncates label if maxLabelLength is specified', () => {
      const wrapper = mount(<MediaSelect options={opts} onOpenToggle={noop} isOpen={true} selectedOptions={{}} onSelectionToggle={noop} maxLabelLength={3} />);
      const labels = wrapper.find('.c-media-item--image-content p.text--navy'); // TODO: make this less reliant on html structure & class names
      expect(labels.length).to.equal(3);
      labels.forEach((label) => {
        expect(label.text()).to.equal('Opt...');
      });
    });
  });

  // Begin stateful tests...
  describe('Stateful select', () => {
    it('Can be toggled open/closed', () => {
      const wrapper = mount(<StatefulSelect options={opts} />);
      const trigger = wrapper.find('.c-select--trigger');
      expect(wrapper.state().isOpen).to.equal(false);
      expect(wrapper.find('.c-select--dropdown').length).to.equal(0);
      trigger.simulate('click');
      expect(wrapper.state().isOpen).to.equal(true);
      expect(wrapper.find('.c-select--dropdown').length).to.equal(1);
      trigger.simulate('click');
      expect(wrapper.state().isOpen).to.equal(false);
      expect(wrapper.find('.c-select--dropdown').length).to.equal(0);
    });

    it('Can be toggled open/closed with custom <Trigger />', () => {
      const Trigger = ({ isOpen, onOpenToggle }) => <div className='my-trigger-el' onClick={() => onOpenToggle(!isOpen)}>Custom trigger!</div>; // eslint-disable-line react/prop-types
      const wrapper = mount(<StatefulSelect options={opts} Trigger={Trigger} />);
      const trigger = wrapper.find('.my-trigger-el');
      expect(wrapper.state().isOpen).to.equal(false);
      expect(wrapper.find('.c-select--dropdown').length).to.equal(0);
      trigger.simulate('click');
      expect(wrapper.state().isOpen).to.equal(true);
      expect(wrapper.find('.c-select--dropdown').length).to.equal(1);
      trigger.simulate('click');
      expect(wrapper.state().isOpen).to.equal(false);
      expect(wrapper.find('.c-select--dropdown').length).to.equal(0);
    });

    it('Cannot be toggled if isLoading', () => {
      const wrapper = mount(<StatefulSelect options={opts} isLoading isOpen />);
      expect(wrapper.state().selectedOptions).to.deep.equal({});
      wrapper.find('.c-select--option').last().simulate('click'); // try selecting the last <option>
      expect(wrapper.state().selectedOptions).to.deep.equal({}); // it won't let you, because isLoading === true
    });

    it('Can toggle an option on/off in a multiselect', () => {
      const wrapper = mount(<StatefulSelect options={opts} multiSelect isOpen />);
      expect(wrapper.state().selectedOptions).to.deep.equal({});
      wrapper.find('.c-select--option').last().simulate('click');
      expect(wrapper.state().selectedOptions).to.deep.equal({ id3: true });
      wrapper.find('.c-select--option').last().simulate('click');
      expect(wrapper.state().selectedOptions).to.deep.equal({ id3: false }); // this is allowed, since it's a multiselect
    });

    it('Can toggle an option on in a select, but not toggle it off so nothing is selected', () => {
      const wrapper = mount(<StatefulSelect options={opts} isOpen />);
      const trigger = wrapper.find('.c-select--trigger');
      expect(wrapper.state().selectedOptions).to.deep.equal({});            // Expect nothing to be selected.
      wrapper.find('.c-select--option').last().simulate('click');           // Try selecting the last <option>.
      expect(wrapper.state().selectedOptions).to.deep.equal({ id3: true }); // Now expect the last option to be selected.
      expect(wrapper.state().isOpen).to.equal(false);                       // Since it's a single select, expect the dropdown to now be closed.
      trigger.simulate('click');                                            // Again open the dropdown since it was closed.
      wrapper.find('.c-select--option').last().simulate('click');           // Try deselecting the option.
      expect(wrapper.state().selectedOptions).to.deep.equal({ id3: true }); // It shouldn't let you deselect it, but...
      expect(wrapper.state().isOpen).to.equal(false);                       // The dropdown should be closed again.
    });

    it('Closes the dropdown when an option is selected in a single select', () => {
      const wrapper = mount(<StatefulSelect options={opts} isOpen />);
      expect(wrapper.state().isOpen).to.equal(true);
      wrapper.find('.c-select--option').last().simulate('click');
      expect(wrapper.state().isOpen).to.equal(false);
    });

    it('Does not close the dropdown when an option is selected in a multiselect', () => {
      const wrapper = mount(<StatefulSelect options={opts} isOpen multiSelect />);
      expect(wrapper.state().isOpen).to.equal(true);
      wrapper.find('.c-select--option').last().simulate('click');
      expect(wrapper.state().isOpen).to.equal(true);
    });

    it('Sets the trigger label when an option is selected', () => {
      const wrapper = mount(<StatefulSelect options={opts} isOpen />);
      const trigger = wrapper.find('.c-select--trigger');
      expect(trigger.text()).to.equal('Select an option');
      wrapper.find('.c-select--option').last().simulate('click');
      expect(trigger.text()).to.equal('Option #3');
    });

    it('Sets the trigger label to "Multiple..." when an many options are selected', () => {
      const wrapper = mount(<StatefulSelect options={opts} isOpen multiSelect />);
      const trigger = wrapper.find('.c-select--trigger');
      expect(trigger.text()).to.equal('Select an option');
      wrapper.find('.c-select--option').first().simulate('click');
      expect(trigger.text()).to.equal('Option #1');
      wrapper.find('.c-select--option').last().simulate('click');
      expect(trigger.text()).to.equal('Multiple items selected');
    });
  });

  describe('Stateful searchable MediaSelect', () => {
    it('Auto-focuses the search input', () => {
      const wrapper = mount(<StatefulMediaSelect options={opts} isOpen multiSelect />);
      const search = wrapper.find('input');
      expect(document.activeElement).to.equal(search.node);
    });

    // Note: filtering depends on the user's own implementation of the passed in `search()` prop
    it('Can be searched', () => {
      const wrapper = mount(<StatefulMediaSelect options={opts} isOpen multiSelect />);
      const search = wrapper.find('input');
      expect(search.node.value).to.equal('');
      expect(wrapper.find('.c-media-item--container').length).to.equal(3); // expect all items to be shown before search
      search.simulate('input', { target: { value: '2' } });
      expect(search.node.value).to.equal('2');
      expect(wrapper.find('.c-media-item--container').length).to.equal(1); // now only show matching item
      expect(wrapper.find('.c-media-item--container p.text--navy').text()).to.equal('Option #2');
      search.simulate('input', { target: { value: '' } }); // reset the search
      expect(wrapper.find('.c-media-item--container').length).to.equal(3); // now expect all items to be shown again
    });

    it('Toggles processing state', (done) => {
      const wrapper = mount(<StatefulMediaSelect options={opts} isOpen multiSelect />);
      const option = wrapper.find('.c-media-item--container').last();
      expect(wrapper.state().processingOptions).to.deep.equal([]);
      expect(option.find('.loader-white').exists()).to.equal(false); // this is false if not processing
      option.simulate('click');
      expect(wrapper.state().processingOptions).to.deep.equal([ 'id3' ]);
      expect(option.find('.loader-white').exists()).to.equal(true);

      // simulated processing timeout is 250ms
      setTimeout(() => {
        expect(wrapper.state().processingOptions).to.deep.equal([]);
        expect(option.find('.loader-white').exists()).to.equal(false);
        done();
      }, 251);
    });
  });
});
