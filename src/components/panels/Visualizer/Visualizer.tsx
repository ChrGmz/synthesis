import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { createArr } from '@utils';

import styles from './Visualizer.module.scss';

function Visualizer({ Tone, playing }) {
  const lineRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, paused: playing });
    tl.staggerTo(
      lineRef.current,
      1,
      {
        transformOrigin: '50% 80%',
        scaleY: 0.5,
        scaleX: 0.9,
        ease: 'power3.out',
      },
      0.05,
      'x'
    );

    tl.staggerTo(
      lineRef.current,
      1,
      {
        transformOrigin: '50% 80%',
        scaleY: 1,
        scaleX: 1,
        ease: 'elastic.out(1.3, .4)',
      },
      0.05,
      'x+=.3'
    );

    return () => tl.kill();
  }, [playing]);

  function renderSvgPaths() {
    return createArr(9, null, (_, idx) => {
      const isEven = idx % 2 === 0;
      const o = 5 + 10 * idx;
      const v = isEven ? '10v25' : '15v16';

      return (
        <path
          d={`M${o} ${v}`}
          id="line"
          key={o}
          ref={(el) => (lineRef.current[idx] = el)}
        />
      );
    });
  }

  return (
    <div>
      <svg
        viewBox="0 0 100 45"
        width="100"
        height="50"
        id="burger"
        className={styles.visualizer}
      >
        {renderSvgPaths()}
      </svg>
    </div>
  );
}

export default Visualizer;

{
  /* <path d="M5 10v25" id="line" />
<path d="M15 15v16" id="line" />
<path d="M25 10v25" id="line" />
<path d="M35 15v16" id="line" />
<path d="M45 10v25" id="line" />
<path d="M55 15v16" id="line" />
<path d="M65 10v25" id="line" />
<path d="M75 15v16" id="line" />
<path d="M85 10v25" id="line" /> */
}
