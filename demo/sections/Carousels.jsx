import React from 'react';
import PropTypes from 'prop-types';
import { Carousel, Icon, Slide, util } from '../../index.js';
import {
  DemoRow,
  Details,
  PropTypeTable,
  Subtitle,
  Title,
} from '../ui';


// Carousel demo
// -----------------------------------------

const MAX_TITLE_LENGTH = 50; // characters
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

const BrowsePageSlide = ({ title, subtitle, description, buttonClass, links }) => (
  <div>
    <div className='slide-title'>{util.truncate(title, MAX_TITLE_LENGTH)}</div>
    <div className='slide-subtitle'>{subtitle}</div>
    <div className='slide-description'>{description}</div>
    <div className='slide-buttons'>
      <a className={`btn btn-vimeo-secondary btn-site-primary slide-button ${buttonClass}`} href={links.item}>
        <Icon
          src='data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTQgMTYiPjx0aXRsZT5wbGF5czwvdGl0bGU+PHBhdGggZD0iTTYsMjBhMSwxLDAsMCwxLTEtMVY1YTEsMSwwLDAsMSwxLjUtLjg2bDEyLDdhMSwxLDAsMCwxLDAsMS43M2wtMTIsN0ExLDEsMCwwLDEsNiwyMFpNNyw2Ljc0VjE3LjI2TDE2LDEyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUgLTQpIiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+'
          size='xxsmall'
        />
        <span className='slide-button-text'>Watch now</span>
      </a>
      <util.If condition={Boolean(links.trailer)} inline>
        <a className='btn btn-transparent slide-button slide-button--alt' href={links.trailer}>
          <Icon
            src='data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTQgMTYiPjx0aXRsZT5wbGF5czwvdGl0bGU+PHBhdGggZD0iTTYsMjBhMSwxLDAsMCwxLTEtMVY1YTEsMSwwLDAsMSwxLjUtLjg2bDEyLDdhMSwxLDAsMCwxLDAsMS43M2wtMTIsN0ExLDEsMCwwLDEsNiwyMFpNNyw2Ljc0VjE3LjI2TDE2LDEyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUgLTQpIiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+'
            size='xxsmall'
          />
          <span className='slide-button-text'>Trailer</span>
        </a>
      </util.If>
    </div>
  </div>
);

const Slide1 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      img='images/16-6-A.png'
      mobileImg='images/16-6-A-mob.png'
      isWide={true}
    >
      <BrowsePageSlide
        title='Slide 1 title'
        subtitle='3 Seasons'
        description={lorem}
        buttonClass=''
        links={{
          item: '#',
          trailer: '#',
        }}
      />
    </Slide>
  ),
  id: 's1',
};

const Slide2 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      img='images/16-9-B.png'
      mobileImg='images/16-9-B-mob.png'
      isWide={true}
    >
      <BrowsePageSlide
        title='Slide 2 title is a very long title with many words'
        subtitle='3 Seasons'
        description={lorem}
        buttonClass=''
        links={{
          item: '#',
          trailer: '#',
        }}
      />
    </Slide>
  ),
  id: 's2',
};

const Slide3 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      img='images/16-9-A.png'
      mobileImg='images/16-9-A-mob.png'
      isWide={false}
    >
      <BrowsePageSlide
        title='Slide 3 has a custom button class'
        subtitle='3 Seasons'
        description={lorem}
        buttonClass='btn-teal'
        links={{
          item: '#',
          trailer: '#',
        }}
      />
    </Slide>
  ),
  id: 's3',
};

const Slide4 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      img='images/16-9-B.png'
      mobileImg='images/16-9-B-mob.png'
      isWide={false}
    >
      <BrowsePageSlide
        title='Slide 4'
        subtitle='3 Seasons'
        description={lorem}
        links={{
          item: '#',
          trailer: '#',
        }}
      />
    </Slide>
  ),
  id: 's4',
};

const Slide5 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      img='images/16-6-B.png'
      mobileImg='images/16-6-B-mob.png'
      isWide={true}
    >
      <BrowsePageSlide
        title='Slide 5 has no trailer and is 16:6 with a very long title containing many words. 100 characters long'
        subtitle='3 Seasons'
        description={lorem}
        buttonClass='btn-teal'
        links={{
          item: '#',
          trailer: '#',
        }}
      />
    </Slide>
  ),
  id: 's5',
};

const loadTestSlides = Array(50).fill(true).map((x, i) => ({
  Slide: props => (
    <Slide
      dynamicProps={props}
      img={`http://lorempizza.com/1600/600/${i}`}
      mobileImg={`http://lorempizza.com/1600/900/${i}`}
      isWide={true}
    >
      <BrowsePageSlide
        title={`Slide ${i}`}
        subtitle='(Load-test slide)'
        description={lorem}
        links={{ item: '#' }}
      />
    </Slide>
  ),
  id: `slide${i}`,
}));

const CarouselDemo = () => (
  <div>
    <Subtitle>Single-Slide Carousel</Subtitle>
    <Carousel slides={[ Slide1 ]} />
    <br />
    <Subtitle>Multi-Slide Carousel</Subtitle>
    <Carousel slides={[ Slide1, Slide2, Slide3, Slide4, Slide5 ]} />
    <br />
    <Subtitle>Carousel Performance Load Test (50 Slides)</Subtitle>
    <Carousel slides={loadTestSlides} />
  </div>
);

const carouselCode = `
const Slide1 = {
  Slide: props => (
    <Slide
      dynamicProps={props}
      img='images/16-6-A.png'
      mobileImg='images/16-6-A-mob.png'
      isWide={true}
    >
      <div>Any slide contents can go here!</div>
    </Slide>
  ),
  id: 's1',
};

<Carousel slides={[ Slide1 ]} />
`;


// Main exported demo
// -----------------------------------------

const Carousels = () => (
  <div>
    <DemoRow>
      <Title>Carousels</Title>
      <Details>
        Carousels are composed of three components. There is the base <code>Carousel</code>
        component which handles the navigation ui and aspect ratio sizing. Then there is
        the <code>Slide</code> which handles the background images animations between
        slide changes. Finally, there are the children passed into the <code>Slide</code>
        component, which can be any arbitrary components.
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
      <Details>
        The <code>Carousel</code> accepts an <code>onSlideChange</code> prop that is a function
        which gets called whenever the slide changes. The function will be passed an object of
        the following form:
        <pre className='code'>
          {
  `{
  eventType: String, // either 'next', 'prev', or 'coin'
  slideIndex: Number,
}`
          }
        </pre>
      </Details>
    </DemoRow>
    <DemoRow code={carouselCode}><CarouselDemo /></DemoRow>
    <DemoRow><PropTypeTable component={Carousel} /></DemoRow>
  </div>
);

export default Carousels;
