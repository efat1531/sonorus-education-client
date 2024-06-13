import style from "./HeroImage2.module.css";

const HeroImage2 = () => {
  return (
    <div className={style.heroImage2}>
      <div className={style.imageClip}>
        <img src="/src/assets/images/HeroImage02.jpeg" alt="Hero Image 02" />
      </div>
      <div className={style.textGroup}>
        <h3 className={style.headerText}>Speak Clearly, Conquer Globally</h3>
        <p className={style.subText}>
          Voice the edge: Impress global partners, build trust, avoid mishaps.
          Learn phonetics, speak with mastery
        </p>
        <button className={style.btn}>Learn More</button>
      </div>
    </div>
  );
};

export default HeroImage2;
