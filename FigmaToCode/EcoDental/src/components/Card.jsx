import c from './Card.module.css';

// eslint-disable-next-line react/prop-types
export default function Card({price, discountPrice, title, img}) {
  return (
    <div className={c.card}>
    <div className={c.cardContainerInner}>
      <img src={img} alt='product' className={c.cardImg} />
      <p className={c.cardTitle}>{title}</p>
      <p className={c.cardPrice}>{price}<span className={c.cardPriceDiscount}>{discountPrice}</span></p>
      <button className={c.cardBtn}>Add to Cart</button>
      </div>
    </div>
  )
}
