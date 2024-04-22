import Button from './Button';
import { useState, useEffect } from 'react';
import c from './PromotionalBanner.module.css';

export default function PromotionalBanner() {
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    console.log(smallScreen)
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [smallScreen]);

  useEffect(() => {
    setSmallScreen(window.innerWidth < 600);
  }, []);

  const handleResize = () => {
    setSmallScreen(window.innerWidth < 600);
  };

  return (
    <div className={c.container}>
      <div className={c.content}>
        <div className={c.rightBlockContent}>
            <h1>Pure Bliss Mouthwash - Refresh Your Smile Naturally</h1>
            <p>
              Say goodbye to harsh chemicals and hello to a naturally
              invigorated smile. Feel the difference of pure, organic oral care
              with every swish.
            </p>

          <Button 
            text="Shop now" 
            arrowForward={smallScreen ? '' : '/arrow_forward.png' }
            className={c.btn}
          />
        </div>
      </div>
    </div>
  );
}
