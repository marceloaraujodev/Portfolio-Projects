// import 'bootstrap/dist/css/bootstrap.min.css';
import c from './BottomContent.module.css';

export default function BottomContent() {
  return (
    <div className={c.container}>

      <div className={c.contentBlock}>
        <p className={c.number}>01</p>
        <div className={c.middle}>
          <p className={c.title}>Workout at Home</p>
          <p className={c.videoNumbers}>15 videos</p>
        </div>
        <i className={`bi bi-arrow-right ${c.arrow}`}></i>
      </div>
      <div className={c.contentBlock}>
        <p className={c.number}>02</p>
        <div className={c.middle}>
          <p className={c.title}>Stay Strong and Fit</p>
          <p className={c.videoNumbers}>48 videos</p>
        </div>
        <i className={`bi bi-arrow-right ${c.arrow}`}></i>
      </div>
      <div className={c.contentBlock}>
        <p className={c.number}>03</p>
        <div className={c.middle}>
          <p className={c.title}>High Intensity</p>
          <p className={c.videoNumbers}>25 videos</p>
        </div>
        <i className={`bi bi-arrow-right ${c.arrow}`}></i>
      </div>
      <div className={c.contentBlock}>
        <p className={c.number}>03</p>
        <div className={c.middle}>
          <p className={c.title}>High Intensity</p>
          <p className={c.videoNumbers}>25 videos</p>
        </div>
        <i className={`bi bi-arrow-right ${c.arrow}`}></i>
      </div>
      <div className={c.contentBlock}>
        <p className={c.number}>04</p>
        <div className={c.middle}>
          <p className={c.title}>Simple Workout</p>
          <p className={c.videoNumbers}>35 videos</p>
        </div>
        <i className={`bi bi-arrow-right ${c.arrow}`}></i>
      </div>
      <div className={c.contentBlock}>
        <p className={c.number}>05</p>
        <div className={c.middle}>
          <p className={c.title}>Burn Calories</p>
          <p className={c.videoNumbers}>35 videos</p>
        </div>
        <i className={`bi bi-arrow-right ${c.arrow}`}></i>
      </div>

    </div>
  );
}
