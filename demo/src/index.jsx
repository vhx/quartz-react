import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import iconNames from '../../components/Icon/icon-list.js';
import { If, getAspectRatioHeight } from '../../components/util';

import {
  Block,
  Section,
  Subtitle,
} from './demo-ui.jsx';

import {
  Button,
  Carousel,
  Icon,
  // Slide,
  Tag,
  Text,
} from '../../index.js';

import CheckboxDemo from './demo-checkbox.jsx';
import RadioDemo from './demo-radio.jsx';
import InputDemo from './demo-input.jsx';

/*
<div className={isWide ? 'slide-bg slide-bg--wide' : 'slide-bg'}>
  <If condition={isWide}>
    <img className='slide-bg-img' src={img} alt={title} />
  </If>
  <If condition={!isWide}>
    <div className='layout-container'>
      <img className='slide-bg-img' src={img} alt={title} />
    </div>
  </If>
</div>
*/

class Slide extends Component {
  constructor() {
    super();
    this.getImgHeight = this.getImgHeight.bind(this);
  }

  getImgHeight() {
    const { isMobile, height, width } = this.props.dynamicProps;
    if (isMobile) { return getAspectRatioHeight('16:9', width); }
    return height;
  }

  render() {
    const { animationDuration, enter, enterDirection, exitDirection, isMobile, height, width, zIndex } = this.props.dynamicProps;
    const { title, subtitle, description, img, mobileImg } = this.props;
    return (
      <div className={`slide ${exitDirection} ${enter ? `ENTER_${enterDirection}` : ''}`} style={{ zIndex, animationDuration: `${animationDuration}ms` }}>
        <div className='slide-bg'>
          <div className='slide-layout-container'>
            <img className='slide-bg-img' src={isMobile ? mobileImg : img} alt={title} style={{ height: `${this.getImgHeight()}px` }} />
          </div>
        </div>
        <div className='slide-layout-container'>
          <div className={isMobile ? 'slide-content slide-content--mobile' : 'slide-content'}>
            <div className='slide-title'>{title}</div>
            <div className='slide-subtitle'>{subtitle}</div>
            <div className='slide-description'>{description}</div>
            <div className='slide-buttons'>
              <button className='slide-button'>
                <Icon name='play' color='white' size='xxsmall' />
                <span className='slide-button-text'>Watch now</span>
              </button>
              <button className='slide-button slide-button--alt'>
                <Icon name='play' color='white' size='xxsmall' />
                <span className='slide-button-text'>Trailer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Slide.propTypes = {
  dynamicProps: PropTypes.shape({
    animationDuration: PropTypes.number.isRequired,
    enter: PropTypes.bool.isRequired,
    enterDirection: PropTypes.oneOf([ 'TO_LEFT', 'TO_RIGHT' ]).isRequired,
    exitDirection: PropTypes.oneOf([ '', 'TO_LEFT', 'TO_RIGHT' ]).isRequired,
    isMobile: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    zIndex: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  mobileImg: PropTypes.string.isRequired,
  isWide: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

Slide.defaultProps = {
  subtitle: '',
  isWide: false,
};


const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

const Slide1 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      title='Slide 1 title'
      subtitle='3 Seasons'
      description={lorem}
      img='/images/16-9-A.png'
      mobileImg='/images/16-9-A-mob.png'
      isWide={false}
    />
  ),
  id: 's1',
};

const Slide2 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      title='Slide 2 title is a very long title with many words'
      subtitle='3 Seasons'
      description={lorem}
      img='/images/16-9-B.png'
      mobileImg='/images/16-9-B-mob.png'
      isWide={false}
    />
  ),
  id: 's2',
};

const Slide3 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      title='Slide 3 title'
      subtitle='3 Seasons'
      description={lorem}
      img='/images/16-9-A.png'
      mobileImg='/images/16-9-A-mob.png'
      isWide={false}
    />
  ),
  id: 's3',
};


const Slide4 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      title='Slide 4 title'
      subtitle='3 Seasons'
      description={lorem}
      img='/images/16-9-B.png'
      mobileImg='/images/16-9-B-mob.png'
      // img='/images/16-6-B.png'
      isWide={false}
    />
  ),
  id: 's4',
};


const AllComponents = () => (
  <div>
    <Section title='Buttons'>
      <Subtitle>Colors</Subtitle>
      <Block inline>
        <Button>default</Button>
        <Button color='gray'>gray</Button>
        <Button color='teal'>teal</Button>
        <Button color='white'>white</Button>
        <Button color='red'>red</Button>
        <Button color='purple'>purple</Button>
        <Button color='green'>green</Button>
        <Button color='slate'>slate</Button>
        <Button color='black'>black</Button>
        <Button color='yellow'>yellow</Button>
      </Block>
      <Block dark inline>
        <Button color='transparent'>transparent</Button>
      </Block>
      <Block>
        <Button color='twitter'>twitter</Button>
        <Button color='facebook'>facebook</Button>
        <Button color='tumblr'>tumblr</Button>
        <Button color='paypal'>paypal</Button>
        <Button color='roku'>roku</Button>
      </Block>
      <Subtitle>Processing State</Subtitle>
      <Block>
        <Button processing>processing</Button>
        <Button color='teal' processing>processing</Button>
        <Button color='white' processing>processing</Button>
        <Button color='red' processing>processing</Button>
      </Block>
      <Subtitle>Sizes</Subtitle>
      <Block>
        <Button>default</Button>
        <Button size='small'>small</Button>
        <Button size='medium'>medium</Button>
        <Button size='large'>large</Button>
        <Button size='half'>half</Button>
        <Button size='fill'>fill</Button>
      </Block>
      <Subtitle>Typefaces</Subtitle>
      <Block>
        <Button>default</Button>
        <Button typeface='brandon'>brandon</Button>
      </Block>
      <Subtitle>Icons</Subtitle>
      <Block>
        { /* NOTE: icon--right can only be used if accompanying text is nested? */ }
        <Button><Icon name='product' left button />Icon left</Button>
        <Button><Icon name='product' right button>Icon right</Icon></Button>
        <Button><Icon name='product' left button /><Icon name='product' right button>Icon both</Icon></Button>
      </Block>
    </Section>
    <Section title='Carousel'>
      <Subtitle>Multiple slides with max height without layout container</Subtitle>
      <Carousel slides={[ Slide1, Slide2, Slide3, Slide4 ]} maxHeight={640} />

      { /*

      <Subtitle>Single slide with layout container</Subtitle>
      <div className='layout-container'>
        <Carousel slides={[ Slide1 ]} />
      </div>
      <Subtitle>Multiple slides with layout container</Subtitle>
      <div className='layout-container'>
        <Carousel slides={[ Slide1, Slide2, Slide3 ]} />
      </div>
      <Subtitle>Multiple slides without max height and without layout container</Subtitle>
      <Carousel slides={[ Slide1, Slide2, Slide3 ]} maxHeight={Infinity} />

      */ }
    </Section>
    <Section title='Checkboxes'>
      <CheckboxDemo uniqueId='checkbox-demo1' size='small' label='Small' />
      <CheckboxDemo uniqueId='checkbox-demo2' size='medium' label='Medium' />
      <CheckboxDemo uniqueId='checkbox-demo3' size='large' label='Large' />
      <CheckboxDemo uniqueId='checkbox-demo4' size='small' type='toggle' />
      <CheckboxDemo uniqueId='checkbox-demo5' size='medium' type='toggle' />
      <CheckboxDemo uniqueId='checkbox-demo6' size='large' type='toggle' />
    </Section>
    <Section title='Icons'>
      <Subtitle>Sizes</Subtitle>
      <Icon name='product' size='xsmall' />
      <Icon name='product' size='small' />
      <Icon name='product' size='medium' />
      <Icon name='product' size='large' />
      <Icon name='product' size='xlarge' />
      <Icon name='product' size='xxlarge' />
      <Subtitle>Circles</Subtitle>
      <Icon circle name='product' size='xsmall' />
      <Icon circle name='product' size='small' />
      <Icon circle name='product' size='medium' />
      <Icon circle name='product' size='large' />
      <Icon circle name='product' size='xlarge' />
      <Icon circle name='product' size='xxlarge' />
      <Subtitle>Colors</Subtitle>
      <Icon name='product' size='medium' />
      <Icon name='product' size='medium' color='navy' />
      <Icon name='product' size='medium' color='teal' />
      <Icon name='product' size='medium' color='gray' />
      <Block inline dark><Icon name='product' size='medium' color='white' /></Block>
      <Subtitle>All icons</Subtitle>
      <ul className='small-block-grid-6 text-center'>
        {
          iconNames.map(icon => (
            <li key={icon}>
              <Block><Text color='gray' className='padding-bottom-small'>{icon}</Text></Block>
              <Icon name={icon} size='small' />
            </li>
          ))
        }
      </ul>
    </Section>
    <Section title='Inputs'>
      <Subtitle>Default input</Subtitle>
      <InputDemo />
      <Subtitle>disabled input</Subtitle>
      <InputDemo disabled />
      <Subtitle>Error input</Subtitle>
      <InputDemo error />
      <Subtitle>Input with placeholder</Subtitle>
      <InputDemo placeholder='With placeholder' />
      <Subtitle>Error input with placeholder</Subtitle>
      <InputDemo error placeholder='With placeholder' />
      <Subtitle>Password input</Subtitle>
      <InputDemo type='password' />
      <Subtitle>Password input with error</Subtitle>
      <InputDemo type='password' error />
      <Subtitle>Search input</Subtitle>
      <InputDemo placeholder='Search' search />
      <Subtitle>Labeled inputs</Subtitle>
      { /* by making <Input> a child of <label> we remove the need to create a unique ID */ }
      <label>
        <p>Username</p>
        <InputDemo />
      </label>
      { /* the standard usage of <label> will still work if you do not mind making an ID: */ }
      <label htmlFor='password1'>Password</label>
      <InputDemo type='password' id='password1' />
    </Section>
    <Section title='Radios'>
      <Subtitle>Default</Subtitle>
      <RadioDemo items={[{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }]} />
      <Subtitle>Default gray</Subtitle>
      <RadioDemo color='gray' items={[{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }]} />
      <Subtitle>Stacked</Subtitle>
      <RadioDemo stacked items={[{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }]} />
      <Subtitle>Stacked gray</Subtitle>
      <RadioDemo stacked color='gray' items={[{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }]} />
      <Subtitle>Radio buttons</Subtitle>
      <RadioDemo buttons items={[{ label: 'Option 1', uniqueId: 'opt1' }, { label: 'Option 2', uniqueId: 'opt2' }]} />
      <Subtitle>Radio buttons with descriptions</Subtitle>
      <RadioDemo buttons items={[{ label: 'Option 1', description: 'Description 1 goes here', uniqueId: 'opt1' }, { label: 'Option 2', description: 'Description 2 goes here', uniqueId: 'opt2' }]} />
    </Section>
    <Section title='Tags'>
      <Block><Tag label='Tag with hover state' onClick={() => alert('Success')} onRemove={() => alert('Removed')} /></Block>
      <Block><Tag label='Truncated tag' maxLength={12} onClick={() => alert('Success')} onRemove={() => alert('Removed')} /></Block>
    </Section>
    <Section title='Text'>
      <Subtitle>Headings</Subtitle>
      <Block><Text h1>h1</Text></Block>
      <Block><Text h2>h2</Text></Block>
      <Block><Text h3>h3</Text></Block>
      <Block><Text h4>h4</Text></Block>
      <Block><Text h5>h5</Text></Block>
      <Subtitle>Colors</Subtitle>
      <Block><Text>Default</Text></Block>
      <Block><Text color='navy'>navy</Text></Block>
      <Block><Text color='teal'>teal</Text></Block>
      <Block><Text color='gray'>gray</Text></Block>
      <Block dark inline><Text color='white'>white</Text></Block>
    </Section>
  </div>
);

const mountNode = document.getElementById('app');
ReactDOM.render(<AllComponents />, mountNode);
