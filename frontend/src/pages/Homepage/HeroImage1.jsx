import style from "./HeroImage1.module.css";

const HeroImage1 = () => {
  return (
    <div>
      <div className={style.heroImgCol}>
        <div className={style.imageText}>
          <h3 className={style.headerText}>Learn Feel and Enjoy English</h3>
          <p className={style.subText}>
            Hear words whisper secrets? Unlock phonics, unlock their magic!
          </p>
          <button className={style.btn}>Learn More</button>
        </div>
        <div className={style.imageClip}>
          <img src="/src/assets/images/HeroImage01.jpeg" alt="Hero Image 01" />
        </div>
      </div>
    </div>
  );
};

export default HeroImage1;
