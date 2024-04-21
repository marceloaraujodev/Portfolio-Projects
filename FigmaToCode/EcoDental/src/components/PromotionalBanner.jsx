import Button from './Button';
import c from './PromotionalBanner.module.css';

export default function PromotionalBanner() {
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
            arrowForward='/arrow_forward.png'
          />
        </div>
      </div>
    </div>
  );
}
