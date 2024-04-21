import c from './Button.module.css';

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function Button({text, className, circleImg, arrowForward}) {
  // <img src="/Icon-circle.png" alt="icon" /> circleImg

  return (
    <button className={`${c.heroBtn} ${className}`}>
          <div className={c.circleContainer}>
          {circleImg ? (<img src={circleImg} alt="arrow" />) : null}
          </div>
          <span className={`${c.shopNow} ${className}`}>{text}</span>
          {arrowForward ? (<img src={arrowForward} alt="arrow" />) : null}
        </button>
  )
}


