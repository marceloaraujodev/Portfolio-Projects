import c from './Banner.module.css';

export default function Banner() {
  return (
    <div className={c.container}>
      <div className={c.contentContainer}>
        <div className={c.banner}>
          <div className={c.bannerBlockLeft}>
            <h1>Mouth Wash</h1>
            <p>
              your go-to choice for a naturally clean and eco-friendly smile
            </p>
            <button className={c.btnBuyNow}>Buy Now</button>
          </div>

          <div className={c.bannerBlockright}>
            <img src="/bottle1.png" alt="bottle" className={c.bottleBanner} />
            <img
              src="/Highlight.png"
              alt="bottle"
              className={c.bottleHightlight}
            />
          </div>
        </div>

        <div className={c.banner2}>
          <div className={`${c.bannerBlockLeft} ${c.color}`}>
            <h1>Tooth Brush</h1>
            <p>
              your go-to choice for a naturally clean and eco-friendly smile
            </p>
            <button className={c.btnBuyNow}>Buy Now</button>
          </div>

          <div className={c.bannerBlockright}>
            <img src="/toothbrush.png" alt="bottle" className={c.toothBrushBanner} />
            {/* <img
              src="/Highlight.png"
              alt="bottle"
              className={c.bottleHightlight}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
