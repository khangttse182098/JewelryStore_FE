import classes from "./DoneModal.module.css";

const DoneModal = () => {
  return (
    <div className={classes[modal.container]}>
      <div className={classes.overlay}></div>
      <div className={classes[modal.content]}>Done</div>
    </div>
  );
};
export default DoneModal;
