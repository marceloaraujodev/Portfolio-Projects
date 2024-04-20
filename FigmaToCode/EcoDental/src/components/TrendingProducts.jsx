import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import c from './TrendingProducts.module.css';

export default function TrendingProducts() {
  return (
    <>
      <div className={c.container}>
        <div className={c.content}>

          <div className={c.textContent}>
            <h1>Trending Products</h1>
            <p>Top Picks for Sustainable Dental Care</p>
          </div>

          <div className={c.productContent}>
          <span className={c.next}><i className="bi bi-chevron-right"></i></span>
          <span className={c.prev}><i className="bi bi-chevron-left"></i></span>
          
            <Card 
              img='/bottle1.png'
              title='Sensitivity Relief Vanilla & Peppermint Natural Mouthwash' 
              price='$100'
              discountPrice='$150'
            />
            <Card 
              img='/product2.png'
              title='Natural Teeth Whitening Toothpaste - Tea tree & Charcoal' 
              price='$100'
              discountPrice='$150'
            />
            <Card 
              img='/product3.png'
              title='Natural Teeth Whitening Toothpaste - Tea tree & Charcoal' 
              price='$100'
              discountPrice='$150'
            />
            <Card 
              img='/product4.png'
              title='Sensitivity Relief Vanilla & Peppermint Natural Mouthwash' 
              price='$100'
              discountPrice='$150'
            />

          </div>

        </div>
      </div>
    </>
  );
}
