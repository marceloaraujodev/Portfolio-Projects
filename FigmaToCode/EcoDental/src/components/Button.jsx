import c from './Button.module.css';

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function Button({text, className}) {
  return (
    <button className={`${c.btnBuyNow} ${className}`}>{text}</button>
  )
}
