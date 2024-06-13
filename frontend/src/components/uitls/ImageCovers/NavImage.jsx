import style from "./NavImage.module.css";

const imageLink = `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww`;
const NavImage = () => {
  return (
    <div
      className={style.navImage}
      style={{
        background: `url(${imageLink}) lightgray 50% / cover no-repeat`,
      }}
    ></div>
  );
};
export default NavImage;
