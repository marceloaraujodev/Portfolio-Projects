/* eslint-disable react/prop-types */
import c from './Card.module.css';

export default function Card({
  price,
  discountPrice,
  title,
  img,
  btnText,
  className,
}) {
  return (
    <div className={`${c.card} ${className}`}>
      <div className={c.cardContainerInner}>
        <img src={img} alt="product" className={c.cardImg} />
        <p className={c.cardTitle}>{title}</p>
        <p className={c.cardPrice}>
          {price}
          <span className={c.cardPriceDiscount}>{discountPrice}</span>
        </p>
        <button className={c.cardBtn}>{btnText}</button>
      </div>
    </div>
  );
}
