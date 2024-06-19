import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const DeleteProduct = forwardRef(function DeleteProduct(
  { handleHide, deleteCode },
  ref
) {
  const navigate = useNavigate();
  //-------------------------deleteCode---------------------
  const handleDelete = () => {
    fetch(`http://mahika.foundation:8080/swp/api/product/${deleteCode}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
    navigate("/managerproductlist");
  };

  return (
    <dialog
      ref={ref}
      className="w-1/3 h-80 translate-x-full translate-y-1/2 bg-white"
    >
      <div className="flex justify-center font-medium text-2xl">
        <p className="pl-4 py-3">Thông báo</p>
      </div>
      <hr className="w-full" />
      <div>
        <p className="text-2xl flex justify-center mt-24 ">
          Bạn có chắc muốn xóa sản phẩm này?
        </p>
      </div>
      <div className="mt-20 flex justify-end">
        <button
          onClick={handleHide}
          className="w-24 h-9 bg-[#D9D9D9] border border-1 font-medium rounded mr-4"
        >
          Hủy
        </button>
        <button
          onClick={handleDelete}
          className="w-24 h-9 border bg-[#0088FF] text-white font-medium rounded mr-4"
        >
          Xác nhận
        </button>
      </div>
    </dialog>
  );
});

export default DeleteProduct;
