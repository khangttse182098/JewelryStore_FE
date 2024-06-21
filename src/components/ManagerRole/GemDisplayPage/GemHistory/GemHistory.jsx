import { useEffect, useRef, useState } from "react";
import classes from "./GemHistory.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import { formatter } from "../../../../util/formatter";

const GemHistory = ({ gem }) => {
  const controllerRef = useRef();
  const [gemList, setGemList] = useState([]);
  const [gemHistory, setGemHistory] = useState([]);
  const [filterMaterialHistoryList, setFilterMaterialHistoryList] = useState(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [gemPerPage, setGemPerPage] = useState(4);

  //------------------------Get list gems--------------------
  const handleGem = async () => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const response = await fetch(
      `http://mahika.foundation:8080/swp/api/diamond-price/${gem.id}`,
      { signal }
    );
    const data = await response.json();
    setGemHistory(data);
    setGemList(data);
  };

  useEffect(() => {
    handleGem();
  });

  //----------------------------Pagination---------------------------
  const lastGemIndex = currentPage * gemPerPage;
  const firstGemIndex = lastGemIndex - gemPerPage;
  const currentGem = gemList.slice(firstGemIndex, lastGemIndex);

  return (
    <div className="w-10/12 h-5/6 ">
      <div className="text-3xl font-medium py-9">
        <p>Danh sách sản phẩm</p>
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
              <th className={classes.th}>Tên kim cương</th>
              <th className={classes.th}>Giá mua</th>
              <th className={classes.th}>Giá bán</th>
              <th className={classes.th}>Thời điểm</th>
            </tr>
          </thead>
          <tbody>
            {currentGem.map((gem) => {
              return (
                <tr className={classes.tr} key={gem.id}>
                  <td className={classes.td}>{gem.name}</td>
                  <td className={classes.td}>
                    {formatter.format(gem.buyPrice)}
                  </td>
                  <td className={classes.td}>
                    {formatter.format(gem.sellPrice)}
                  </td>
                  <td className={classes.td}>{gem.effectDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          totalInvoice={gemList.length}
          invoicePerPage={gemPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default GemHistory;
