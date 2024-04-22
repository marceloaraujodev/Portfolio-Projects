/* eslint-disable no-unused-vars */
import CardTestimonials from './CardTestimonials';
import c from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <div className={c.container}>
      <div className={c.content}>
        <div className={c.textContent}>
          <h1>Testimonials</h1>
          <p>Hear what our customers say</p>
        </div>

        {/* <div className={c.hidden}> */}
          <div className={c.cardTestimonialsContainer}>
          <div className={c.carouselWrapper}>
            <div className={c.x}>
              <CardTestimonials
                text="Quite different!! You can feel the difference between
                chemical-based and natural toothpaste. I felt better after using
                Tea tree & Charcoal tooth paste."
                img="/customer1.png"
                customerImg="/customer1.png"
                name="Courtney Henry"
              />
              <CardTestimonials
              text="Quite different!! You can feel the difference between
                chemical-based and natural toothpaste. I felt better after using
                Tea tree & Charcoal tooth paste."
              img="/customer1.png"
              customerImg="/customer2.png"
              name="Ronald Richards"
            />
            <CardTestimonials
              text="Quite different!! You can feel the difference between
                chemical-based and natural toothpaste. I felt better after using
                Tea tree & Charcoal tooth paste."
              img="/customer1.png"
              customerImg="/customer3.png"
              name="Jenny Wilson"
            />
           </div>
            </div>
          </div>
        {/* </div> */}
        <div className={c.carousel}>
          <button className={`${c.bar} ${c.active}`}></button>
          <button className={c.bar}></button>
          <button className={c.bar}></button>
        </div>
      </div>
    </div>
  );
}
