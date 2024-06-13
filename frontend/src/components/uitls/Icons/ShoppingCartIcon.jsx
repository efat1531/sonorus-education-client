import ShoppingCartSVG from "../../../assets/svg/ShoppingCart.svg";
import style from "./ShoppingCartIcon.module.css";

const cartItem = 0;

const ShoppingCartIcon = () => {
  return (
    <div className={style.icon}>
      <ShoppingCartSVG />
      {cartItem > 0 && (
        <div className={style.innerCartRadius}>
          <span className={style.innerCartText}>{cartItem}</span>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartIcon;
