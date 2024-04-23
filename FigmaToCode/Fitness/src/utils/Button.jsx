/* eslint-disable react/prop-types */
import c from './Button.module.css';

export default function Button({className, text, background}) {
  return (
    <button className={`${c.btn} ${className}`} style={{backgroundColor: background}}>{text}</button>
  )
}
