import SVGController from "../../../assets/svg/SVGController";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: "0.5rem",
  },
  text: {
    color: "#4E5566",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "1.375rem",
    letterSpacing: "-0.00875rem",
  },
};

const IconTextLabel = ({ name, text }) => {
  return (
    <div style={styles.container}>
      <SVGController
        name={name}
        width="1.25rem"
        height="1.25rem"
        stroke="#FF6636"
      />
      <div style={styles.text}>{text}</div>
    </div>
  );
};

export default IconTextLabel;
