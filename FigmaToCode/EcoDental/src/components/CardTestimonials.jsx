/* eslint-disable react/prop-types */
import c from './CardTestimonials.module.css';

export default function CardTestimonials({text, name, customerImg}) {
  return (
    <div className={c.cardTestimonials}>
      <p>
        {text}
      </p>

      <div className={c.imgBlock}>
        <img src={customerImg} alt="customer photo" />
        <div className={c.name}>
          {name}
          <span className={c.customer}>Customer</span>
        </div>
          <img src="/customerIcon.png" alt="icon" className={c.icon} />
      </div>

    </div>
  )
}
