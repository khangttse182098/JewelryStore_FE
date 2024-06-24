import React from "react";
import toDatetimeLocal from "../../../../util/toDateTimeLocal";

const DetailDiscountInput = ({ title, isDate, register, discount }) => {
  return (
    <div className="flex flex-col justify-evenly drop-shadow-lg shadow-lg rounded h-1/2 w-5/6 mt-10 ml-10">
      {!isDate ? (
        <>
          <label className="w-4/5 ml-11 text-xl font-medium">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </label>
          <input
            name="value"
            className="py-3 pl-3 w-2/5 ml-11 border-2 border-slate-300 focus:outline-none bg-transparent rounded"
            placeholder={`Nhập ${title}`}
            {...register("value")}
            defaultValue={discount.value}
          />
        </>
      ) : (
        <div>
          <h1 className="w-4/5 ml-11 text-xl font-medium">Thời gian</h1>
          <div className="mb-3">
            <label className="w-4/5 ml-11 text-md text-slate-500">
              Ngày bắt đầu
            </label>
            <input
              type="datetime-local"
              name="startDate"
              className="py-3 px-3 w-2/5 ml-11 border-2 border-slate-300 focus:outline-none bg-transparent rounded"
              {...register("startDate")}
              defaultValue={toDatetimeLocal(discount.startDate)}
            />
          </div>
          <div>
            <label className="w-4/5 ml-11 text-md text-slate-500">
              Ngày kết thúc
            </label>
            <input
              type="datetime-local"
              name="endDate"
              className="py-3 px-3 w-2/5 ml-11 border-2 border-slate-300 focus:outline-none bg-transparent rounded"
              {...register("endDate")}
              defaultValue={toDatetimeLocal(discount.endDate)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailDiscountInput;
