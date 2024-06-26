const Clarity = ({ type, onClick }) => {
  return (
    <div onClick={() => onClick(type)}>
      <span role="button">{type}</span>
    </div>
  );
};

export default Clarity;
