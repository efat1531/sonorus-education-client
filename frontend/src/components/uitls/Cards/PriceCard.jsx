import style from "./PriceCard.module.css";
import Alarm from "../../../assets/svg/Alarm.svg";
import LabelOff from "../Label/LabelOff";
import Timer from "../Label/Timer";

import PropTypes from "prop-types";
import React, { useState } from "react";

const PriceCard = ({ price, discount = 0, endTime = Date.now() }) => {
  endTime = new Date("2025-06-15T14:57:00").getTime();
  const [discountstate, setDiscountState] = useState(discount);
  const onEndTimer = () => {
    console.log("Timer ended");
    discount = 0;
    setDiscountState(0);
  };
  return (
    <div className={style.priceBar}>
      <div className={style.priceLabel}>
        <div className={style.price}>
          <div className={style.discountPrice}>
            {discountstate > 0 && (
              <div className={style.discount}>
                ${calculatedPrice(price, discount).toFixed(2)}
              </div>
            )}
            <div
              className={style.mainPrice}
              style={
                discountstate > 0
                  ? {
                      color: "#8C94A3",
                      fontFamily: "Inter",
                      fontSize: "1rem",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "1.5rem",
                      textDecoration: "line-through",
                    }
                  : {}
              }
            >
              ${price.toFixed(2)}
            </div>
          </div>
        </div>
        {discountstate > 0 && (
          <LabelOff percentage={calculatePercentage(price, discount)} />
        )}
      </div>

      {discountstate > 0 && (
        <div className={style.timeLeft}>
          <Alarm />
          <div className={style.timeString}>
            <Timer endTime={endTime} onFinishFunction={onEndTimer} />
            <div>&nbsp;in this price!</div>
          </div>
        </div>
      )}
    </div>
  );
};

const calculatedPrice = (price, discount) => {
  return price - discount;
};

const calculatePercentage = (price, discount) => {
  return (discount / price) * 100;
};

PriceCard.propTypes = {
  price: PropTypes.number.isRequired,
  discount: PropTypes.number,
  endTime: PropTypes.number,
};

export default PriceCard;
