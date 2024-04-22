/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import c from './TrendingProducts.module.css';

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [reviewsCurrentIndex, setReviewsCurrentIndex] = useState(0);
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 600);

  // container + margin and gaps
  const containerWidth = 288;

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [smallScreen]);

  useEffect(() => {
    setSmallScreen(window.innerWidth < 600);
  }, []);

  // Event handler for window resize
  const handleResize = () => {
    setSmallScreen(window.innerWidth < 600);
  };

  function handleLefClick() {
    if (smallScreen) {
      const newIndex = reviewsCurrentIndex - 1;
      setReviewsCurrentIndex(newIndex < 0 ? products.length - 1 : newIndex);
    } else {
      const newIndex = reviewsCurrentIndex - 1;
      setReviewsCurrentIndex(newIndex < 0 ? products.length - 3 : newIndex);
    }
  }

  function handleRigtClick() {
    if (smallScreen) {
      const newIndex = reviewsCurrentIndex + 1;
      setReviewsCurrentIndex(newIndex >= products.length ? 0 : newIndex);
    } else {
      const newIndex = reviewsCurrentIndex + 1;
      setReviewsCurrentIndex(newIndex >= products.length - 2 ? 0 : newIndex);
    }
  }

  return (
    <>
      <div className={c.container}>
        <div className={c.content}>
          <div className={c.textContent}>
            <h1>Trending Products</h1>
            <p>Top Picks for Sustainable Dental Care</p>
          </div>

          <div className={c.productContent}>
            <span className={c.prev}>
              <i className="bi bi-chevron-left" onClick={handleLefClick}></i>
            </span>
            <span className={c.next}>
              <i className="bi bi-chevron-right" onClick={handleRigtClick}></i>
            </span>
            <div className={c.hiddenContainer}>
              <div className={c.cardContainer}>
                <Card
                  img="/bottle1.png"
                  title="Sensitivity Relief Vanilla & Peppermint Natural Mouthwash"
                  price="$100"
                  discountPrice="$150"
                  btnText="Add to Cart"
                />
                <Card
                  img="/product2.png"
                  title="Natural Teeth Whitening Toothpaste - Tea tree & Charcoal"
                  price="$100"
                  discountPrice="$150"
                  btnText="Add to Cart"
                />
                <Card
                  img="/product3.png"
                  title="Natural Teeth Whitening Toothpaste - Tea tree & Charcoal"
                  price="$100"
                  discountPrice="$150"
                  btnText="Add to Cart"
                />
                <Card
                  img="/product4.png"
                  title="Sensitivity Relief Vanilla & Peppermint Natural Mouthwash"
                  price="$100"
                  discountPrice="$150"
                  btnText="Add to Cart"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
