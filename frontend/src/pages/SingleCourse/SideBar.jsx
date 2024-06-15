import style from "./SideBar.module.css";
import PriceCard from "../../components/uitls/Cards/PriceCard";
import Divider from "../../components/uitls/Divider";
import FeatureCard from "../../components/uitls/Cards/FeatureCard";
import ButtonTemplate from "../../components/uitls/Buttons/ButtonTemplate";

const SideBar = () => {
  const price = 100;
  const discount = 20;
  return (
    <div className={style.mainContainer}>
      <PriceCard price={price} discount={discount} />
      <Divider width="26.5rem" />
      <FeatureCard />
      <Divider width="26.5rem" />
      <div className={style.buttonContainer}>
        <ButtonTemplate
          padding="0 2rem"
          width="23.5rem"
          backgroundColor="#FF6636"
          btnText="Add to Cart"
          btnTextColor="#fff"
        />
        <ButtonTemplate
          padding="0 2rem"
          width="23.5rem"
          backgroundColor="#FFEEE8"
          btnText="Buy Now"
          btnTextColor="#FF6636"
        />
        <ButtonTemplate
          padding="0 2rem"
          width="23.5rem"
          backgroundColor="#E9EAF0"
          btnText="Add to Wishlist"
          btnTextColor="#4E5566"
        />
      </div>
      <Divider width="26.5rem" />
      <div className={style.cIncludeSection}>
        <div className={style.text}>This course includes:</div>
      </div>
    </div>
  );
};

export default SideBar;
