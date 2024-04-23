import c from './PopularExercises.module.css';

export default function PopularExercises() {
  return (
    <div className={c.container}>
      <div className={c.head}>
        <span className={c.title}>Popular exercises</span>
        <span className={c.extra}>SEE MORE EXERCISES</span>
      </div>
      <div className={c.grid}>
        <div className={c.gridItem}>
          <img src="/treadmill.png" alt="treadmill" className={c.img} />
          <div className={c.titleTime}>
            <span className={c.title}>Treadmill</span>
            <div className={c.timeStamp}>58:24</div>
          </div>
          <div className={c.estCal}>250 est calories</div>
        </div>


      </div>
    </div>
  );
}
