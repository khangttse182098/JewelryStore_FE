import React, { forwardRef, useImperativeHandle, useState } from "react";
import erroricon from "../../../../../public/assets/close.png";

const DeleteCustomerModal = forwardRef(({ onDelete, hasOrders }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
  }));

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-400 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md shadow-md">
          {hasOrders ? (
            <>
              <p className="text-2xl font-semibold">
                Không thể xóa khách hàng do đã có tên trong đơn hàng
              </p>
              <img
                src={erroricon}
                alt="Error icon"
                className="w-[100px] translate-x-[290px] mt-10"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => ref.current.close()}
                  className="mt-10 btn btn-secondary bg-blue-500 h-[40px] w-[70px] rounded text-white"
                >
                  Đóng
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-2xl font-semibold">
                Chắc chắn xóa khách hàng này ?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={onDelete}
                  className="mt-10 btn btn-secondary bg-red-500 h-[40px] w-[70px] rounded text-white mr-5"
                >
                  Có
                </button>
                <button
                  onClick={() => ref.current.close()}
                  className="mt-10 btn btn-secondary bg-blue-500 h-[40px] w-[70px] rounded text-white"
                >
                  Không
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
});

export default DeleteCustomerModal;
