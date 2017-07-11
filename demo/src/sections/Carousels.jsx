import React from 'react';
import PropTypes from 'prop-types';
import { Carousel, Slide } from '../../../index.js';
import {
  DemoRow,
  Details,
  Subtitle,
  Title,
} from '../ui';


// Carousel demo
// -----------------------------------------

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

const Slide1 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      title='Slide 1 title'
      subtitle='3 Seasons'
      description={lorem}
      img='/images/16-6-A.png'
      mobileImg='/images/16-6-A-mob.png'
      isWide={true}
      trailer='123'
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
      trailer='123'
    />
  ),
  id: 's2',
};

const Slide3 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      buttonClass='btn-teal'
      title='Slide 3 has a custom button class'
      subtitle='3 Seasons'
      description={lorem}
      img='/images/16-9-A.png'
      mobileImg='/images/16-9-A-mob.png'
      isWide={false}
      trailer='123'
    />
  ),
  id: 's3',
};

const Slide4 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      title='Slide 4 has no trailer'
      subtitle='3 Seasons'
      description={lorem}
      img='/images/16-9-B.png'
      mobileImg='/images/16-9-B-mob.png'
      isWide={false}
    />
  ),
  id: 's4',
};

const Slide5 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      title='Slide 5 has no trailer and is 16:6 with a very long title containing many words. 100 characters long'
      subtitle='3 Seasons'
      description={lorem}
      img='/images/16-6-B.png'
      mobileImg='/images/16-6-B-mob.png'
      isWide={true}
    />
  ),
  id: 's5',
};


const CarouselDemo = () => (
  <div>
    <Subtitle>Single-Slide Carousel</Subtitle>
    <Carousel slides={[ Slide1 ]} />
    <br />
    <Subtitle>Multi-Slide Carousel</Subtitle>
    <Carousel slides={[ Slide1, Slide2, Slide3, Slide4, Slide5 ]} />
  </div>
);

const carouselCode = `
const Slide1 = {
  Slide: props => (
    <Slide
      description='Lorem ipsum...'
      dynamicProps={props}
      img='/images/16-6-A.png'
      isWide={true}
      mobileImg='/images/16-6-A-mob.png'
      subtitle='3 Seasons'
      title='Slide 1 title'
      trailer='123'
    />
  ),
  id: 's1',
};

<Carousel slides={[ Slide1 ]} />
`;


// Main exported demo
// -----------------------------------------

const Carousels = ({ title }) => (
  <div>
    <DemoRow>
      <Title tag='Stateful'>{title}</Title>
      <Details>
        Carousels are composed of two components. There is the base <code>Carousel</code>
        component which handles the navigation ui and aspect ratio sizing. Then there is
        the <code>Slide</code> component which is a specific implementation of a slide that
        could be passed to the carousel. The carousel passes many props to the slide component,
        such as its height and animation duration.
      </Details>
      <Details>
        The only required prop that a Carousel component requires is an array of objects of the
        following form:
        <pre className='code'>
          {
  `{
  Slide: ReactComponent,
  id: String,
}`
          }
        </pre>
        The <code>id</code> property will be used as a <code>key</code> within the carousel,
        so it does not need to be globally unique—just unique among the slides.
      </Details>
      <Details>
        The <code>Carousel</code> component may also be passed an <code>aspectRatio</code>
        prop which is a string formatted like <code>16:9</code>. If not provided, the default
        is <code>16:6</code>.
      </Details>
    </DemoRow>
    <DemoRow code={carouselCode}><CarouselDemo /></DemoRow>
  </div>
);

Carousels.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Carousels;
