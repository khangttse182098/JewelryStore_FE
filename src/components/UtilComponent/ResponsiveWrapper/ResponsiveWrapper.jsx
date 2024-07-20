import classes from "./ResponsiveWrapper.module.css";
const ResponsiveWrapper = ({ children }) => {
  return <div className={classes.responsive}>{children}</div>;
};

export default ResponsiveWrapper;
