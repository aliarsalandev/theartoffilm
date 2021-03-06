import { React, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSpring, animated } from 'react-spring';
import './css/accordion.css';
function Accordion({ title, text, link }) {
  const [open, setOpen] = useState(false);
  //toggle accordion function
  let toggleHandler = (e) => {
    //switch state
    setOpen(!open);
  };

  //conditional styling
  const styles = {
    //if open is true, change color of title
    accordionTitle: {
      color: open ? '#ffffff' : 'var(--accent-color)',
    },
  };
  //open animation with react spring

  const openAnimation = useSpring({
    from: { opacity: '0', maxHeight: '48px' },
    to: {
      opacity: '1',
      maxHeight: open ? '200px' : isMobile ? '64px' : '24px',
    },
    config: { duration: '300' },
  });

  //rotate animation
  const iconAnimation = useSpring({
    from: {
      transform: 'rotate(0deg)',
      color: '#ffff',
    },
    to: {
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      color: open ? '#ffffff' : '#fff',
    },
    config: { duration: '120' },
  });

  return (
    <div>
      <animated.div className="accordion__item" style={openAnimation}>
        <div className="accordion__header" onClick={toggleHandler}>
          <h4 style={styles.accordionTitle}>{title}</h4>
          <animated.i style={iconAnimation}>
            <i className={'fa-solid fa-arrow-down'}></i>
          </animated.i>
        </div>
        <p className="accordion__content">
          {text} {link && <a href="mailto:henry4film@aol.com">Contact Us</a>}
        </p>
      </animated.div>
    </div>
  );
}

export default Accordion;
