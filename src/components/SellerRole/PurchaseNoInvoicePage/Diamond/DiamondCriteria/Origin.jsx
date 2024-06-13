const Origin = ({ type, onClick }) => {
  const { index } = type;

  return (
    <div onClick={() => onClick(index)}>
      <span role="button">{index}</span>
    </div>
  );
};

export default Origin;
