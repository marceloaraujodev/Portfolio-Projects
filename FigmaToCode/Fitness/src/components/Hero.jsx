import c from './Hero.module.css';
import Button from '../utils/Button';

export default function Hero() {
  return (
    <div className={c.container}>
      <div className={c.blockLeft}>
        <div className={c.highContainer}>
          <div className={c.new}>NEW</div>
          High Intensity workout to burn calories
        </div>

        <div className={c.bigFont}>Cardio Exercise</div>
        <p className={c.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className={c.btnContainer}>
          <Button text="Get Started" />
          <Button text="Preview" background="#1A1A1A" />
        </div>
      </div>

      <div className={c.blockRight}>
        <div className={c.timeCaloriesContainer}>
          <div className={c.box}>
            <div className={c.valuesContainer}>
              <span className={c.timeValue}>38:14</span>
              <span className={c.timeText}>TIME</span>
            </div>
          </div>

          <div className={c.box}>
            <div className={c.valuesContainer}>
              <span className={c.calValue}>165</span>
              <span className={c.calText}>EST CALORIES</span>
            </div>
            <div className={c.imgContainer}>
              <img src="/woman.png" alt="woman exercise" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
