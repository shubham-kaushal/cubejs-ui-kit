import React, { Fragment } from 'react';
import T from 'prop-types';
import Section from './Section.jsx';
import { attrs, insertText } from '../helpers';
import * as images from '../logos';
import Heading from './Heading.jsx';
import Image from './Image';

export default function SiteBlock(props) {
  const MainPart = ({ image }) => (
    <Fragment>
      {(props.badge || props.githubBadge) &&
      <nu-badge display="flex" flow="row" items="center" gap="2x" as="c2" color="dark-03" content="stretch||center" padding="1x bottom">
        <nu-el padding="2x left" text="nowrap">{props.badge}</nu-el>{props.githubBadge && <iframe
          src="https://ghbtns.com/github-btn.html?user=cube-js&repo=cube.js&type=star&count=true&size=large"
          frameBorder="0" scrolling="0" width="170" height="30" style={{ marginTop: '-3px' }}
          title="Star Cube.js on GitHub"/>}
      </nu-badge>
      }
      {image &&
      <Image
        id="logo"
        height="4.5x"
        width="18"
        padding="1x bottom"
        src={images[image] || images.main}
        label="Logo"/>
      }
      {props.heading && <Heading
        level={props.level}
        size={props.headingSize || (props.level ? null : 'h2')}
        innerText={props.heading}>
        <nu-el {...insertText(props.heading)}/>
      </Heading>}
      {props.description && <nu-description
        {...insertText(props.description)}/>}
    </Fragment>
  );

  return <Section
    padding="15x 0|||10x 0"
    text="center"
    items="center"
    image={props.bgImage}
    fill={props.special ? '#dark-02' : (props.pink ? '#FFF2F6' : null)}
    color={props.special ? 'white' : null}
    border={props.special ? 'top bottom outside #white.50' : null}
    {...attrs(props, ['image'])}>
    <nu-attrs for="description" color={props.special ? '#white.70' : '#dark-03'}/>
    <nu-attrs for="heading" color={props.special ? '#white' : '#dark'}/>
    {
      props.special && <nu-props
        text-color="white"
        bg-color="dark-02"/>
    }
    {
      (props.image || props.heading || props.description)
        ? (
          props.wide
            ? <nu-grid
              columns="1pr 1pr||1fr" text="left||center"
              width={props.headingWidth || '10sp|||--content-width'} gap="1gp||4x">
              <nu-flow gap="3x">
                <MainPart/>
                {props.children}
              </nu-flow>
              {props.image &&
              <Image
                id="logo"
                padding={props.badge ? '4x top' : null}
                width="max 100%"
                src={images[props.image] || props.image || images.main}
                label="Illustration"/>
              }
            </nu-grid>
            : <nu-flex
              flow="column"
              items={props.items || 'center'}
              width={props.headingWidth || '6sp||10sp|--content-width'}
              gap="3x">
              <MainPart image={props.image}/>
            </nu-flex>
        )
        : null
    }
    {!props.wide && props.children}
  </Section>;
}

SiteBlock.propTypes = {
  special: T.bool,
  pink: T.bool,
  wide: T.bool,
  githubBadge: T.bool,
  badge: T.string,
  image: T.string,
  bgImage: T.string,
  heading: T.string,
  description: T.string,
  level: T.oneOf([1, 2, 3, 4, 5]),
  headingSize: T.string,
  headingWidth: T.string,
};
