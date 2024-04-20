import c from './BannerThin.module.css';

export default function BannerThin() {
  return (
    <div className={c.container}>
      <div className={c.contentContainer}>
        <img src='/Card-1.png' alt='card img' />
        <img src='/Card-2.png' alt='card img' />
        <img src='/Card-3.png' alt='card img' />
        <img src='/Card-4.png' alt='card img' />

      </div>
    </div>
  )
}
