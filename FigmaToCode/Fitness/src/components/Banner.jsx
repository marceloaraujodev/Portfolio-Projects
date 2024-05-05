import Button from '../utils/Button';
import c from './Banner.module.css';

export default function Banner() {
  function handleClick() {
    console.log('click');
  }

  return (
    <div className={c.container}>

      <div className={c.blockLeft}>

        <div className={c.textTitle}>Workout Program Made For You</div>
        <img src="/yellow.png" alt="graphic" className={c.yellow} />

        <div className={c.rightText}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
              consectetur adipiscing.
            </p>
            <Button
              text="Get Started"
              className={c.btn}
              onClick={handleClick}
            />
          </div>

        
        <div className={c.bigSquare}></div>
      
      </div>

      <div className={c.bottomSquareContainer}>
        <div className={c.bottomSquare}>
          <div className={c.samantha}>
            <img src="/samantha.png" alt="samantha" />
            <p className={c.trainerName}>Samantha William</p>
            <p className={c.trainer}>Trainer</p>
          </div>
        </div>
        <div className={c.bottomSquare2}>
          <img src="/karen.png" alt="karen" />
          <p className={c.trainerName}>Karen Summer</p>
          <p className={c.trainer}>Trainer</p>
        </div>

        <div className={c.bottomSquare3}>
          <img src="/jonathan.png" alt="jonathan" />
          <p className={c.trainerName}>Jonathan Wise</p>
          <p className={c.trainer}>Trainer</p>
        </div>

      </div>

    </div>
  );
}
