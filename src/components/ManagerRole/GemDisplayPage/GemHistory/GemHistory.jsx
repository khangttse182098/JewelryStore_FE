import { useEffect, useRef, useState } from "react";
import classes from "./GemHistory.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import { formatter } from "../../../../util/formatter";
import { useNavigate } from "react-router-dom";

const GemHistory = ({ gem }) => {
  const [gemHistory, setGemHistory] = useState([]);
  // const [filterGemHistoryList, setFilterMaterialGemList] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [gemPerPage, setGemPerPage] = useState(4);
  const navigate = useNavigate();
  //------------------------Get list gems-------------------
  const handleGem = () => {
    fetch(
      `http://mahika.foundation:8080/swp/api/diamond-price/history/details?caratWeightFrom=${gem.caratWeightFrom}&caratWeightTo=${gem.caratWeightTo}&clarity=${gem.clarity}&color=${gem.color}&cut=${gem.cut}&origin=${gem.origin}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setGemHistory(data), console.log(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGem();
  }, []);

  //----------------------------Pagination---------------------------
  // const lastGemIndex = currentPage * gemPerPage;
  // const firstGemIndex = lastGemIndex - gemPerPage;
  // const currentGem = filterGemHistoryList.slice(firstGemIndex, lastGemIndex);

  return (
    <div className="w-10/12 h-5/6 ">
      <div className="text-3xl font-medium py-7">
        <p>Lịch sử giá</p>
      </div>
      <div className="bg-white border-2 rounded-xl">
        <div>
          <button className="h-[50px] w-[200px] border-b-4 border-[#0088FF] text-center text-[#0088FF] font-montserrat text-[15px] cursor-pointer">
            Tất cả
          </button>
        </div>
        <hr />
        <table className="w-full border-collapse">
          <thead>
            <tr className={classes.tr}>
              <th className={classes.th}>Nguồn gốc</th>
              <th className={classes.th}>Màu sắc</th>
              <th className={classes.th}>Độ tinh khiết</th>
              <th className={classes.th}>Giác cắt</th>
              <th className={classes.th}>Trọng lượng (g)</th>
              <th className={classes.th}>Giá mua</th>
              <th className={classes.th}>Giá bán</th>
              <th className={classes.th}>Thời điểm</th>
            </tr>
          </thead>
          <tbody>
            {gemHistory.map((gem) => {
              return (
                <tr className={classes.tr}>
                  <td className={classes.td}>{gem.origin}</td>
                  <td className={classes.td}>{gem.color}</td>
                  <td className={classes.td}>{gem.clarity}</td>
                  <td className={classes.td}>{gem.cut}</td>
                  <td className={classes.td}>
                    {gem.caratWeightFrom} - {gem.caratWeightTo}
                  </td>
                  <td className={classes.td}>{gem.buyPrice}</td>
                  <td className={classes.td}>{gem.sellPrice}</td>
                  <td className={classes.td}>{gem.effectDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-right mr-28">
          <button
            className="h-10 w-40 mt-4 rounded bg-[#0088FF] hover:bg-[#0a73ce]
          text-slate-100 text-xl mr-3"
            onClick={() => navigate("/manager/gem/list")}
          >
            Quay lại
          </button>
          <button
            onClick={() =>
              navigate("/manager/gem/detail", {
                state: {
                  gem: {
                    ...gemHistory[0],
                  },
                },
              })
            }
            className="h-10 w-40 mt-4  rounded bg-[#0088FF] hover:bg-[#0a73ce] text-slate-100 text-xl"
          >
            Cập nhật giá
          </button>
        </div>
        {/* <Pagination
          totalInvoice={filterGemHistoryList.length}
          invoicePerPage={gemPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        /> */}
      </div>
    </div>
  );
};

export default GemHistory;
