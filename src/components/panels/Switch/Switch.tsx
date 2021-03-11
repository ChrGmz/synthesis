import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import styles from './Switch.module.scss';

function Switch({ active, handleEffect, effect }) {
  const point = useRef(null);

  // useEffect(() => {
  //   if (point.current == null) return;

  //   const tl = gsap.timeline({ yoyo: true });

  //   tl.fromTo(
  //     point.current,
  //     1,
  //     {
  //       transformOrigin: 'center center',
  //       scale: 1,
  //     },
  //     {
  //       yoyo: true,
  //       scale: 1.25,
  //       repeat: -1,
  //       ease: 'power3.out',
  //     }
  //   );

  //   // tl.to(point.current, 2, {
  //   //   display: 'block',
  //   //   transformOrigin: 'center center',
  //   //   scale: 1,
  //   //   opacity: 1,
  //   // });

  //   return function cleanup() {
  //     tl.progress(1);
  //     tl.kill();
  //   };
  // }, [active]);

  return (
    <>
      <svg
        className={`${styles.svg} ${active && styles.active}`}
        id="Icons"
        viewBox="0 0 74 74"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => handleEffect(effect, active)}
      >
        <path
          ref={active ? point : null}
          className={styles.point}
          d="m37 72a35 35 0 1 1 35-35 35.04 35.04 0 0 1 -35 35zm0-68a33 33 0 1 0 33 33 33.037 33.037 0 0 0 -33-33z"
        />
      </svg>
    </>
  );
}

export default Switch;
