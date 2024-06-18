import classes from "./AddStaffModal.module.css";

const AddStaffModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "input") onClose();
  };
  async function handleSubmit(submiData) {}
  return (
    <form
      id="input"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-2/5 h-52 flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className=" bg-white rounded">
          <h3 className=" flex flex-col justify-center items-center text-2xl">
            Nhập thông tin nhân viên mới
          </h3>
          <div className="flex flex-col justify-center items-center ">
            <div className="block">
              <label className="flex">Nhập họ và tên</label>
              <input type="text" />
            </div>
            <div className="block">
              <label className="flex">Nhập số điện thoại</label>
              <input type="text" />
            </div>
            <div className="block">
              <label className="flex">Nhập tên đăng nhập</label>
              <input type="text" />
            </div>
            <div className="block">
              <label className="flex">Nhập mật khẩu</label>
              <input type="text" />
            </div>
            <div className="block">
              <label className="flex">Nhập vị trí làm việc</label>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default AddStaffModal;
