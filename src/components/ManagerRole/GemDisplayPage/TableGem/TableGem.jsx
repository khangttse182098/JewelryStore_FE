import { useEffect, useRef, useState } from "react";
import classes from "./TableGem.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { formatter } from "../../../../util/formatter";

const TableGem = () => {
  const controllerRef = useRef();
  const [gemList, setGemList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchCarat, setSearchCarat] = useState("");
  const [filterGem, setFilterGem] = useState([...gemList]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [gemPerPage, setGemPerPage] = useState(7);

  //------------------------Pagination-----------------------
  const lastGemIndex = currentPage * gemPerPage;
  const firstGemIndex = lastGemIndex - gemPerPage;
  const currentGem = filterGem.slice(firstGemIndex, lastGemIndex);

  //------------------------Get list gems--------------------
  useEffect(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const handleGem = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/diamond-price/history",
          { signal }
        );
        const data = await response.json();
        setGemList(data);
      } catch (err) {}
    };
    handleGem();
  }, []);

  //-----------------------------HandleNavigate---------------------
  function handleNavigate(gem) {
    navigate("/managergemhistory", { state: { gem } });
  }
  //----------------------------Search-------------------------------
  const handleSearch = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const handleSearchCaratWeight = (event) => {
    setSearchCarat(event.target.value);
  };

  useEffect(() => {
    const newFilterGem = gemList.filter((gem) => {
      const textSearch =
        gem.origin.toLowerCase().includes(searchField) ||
        gem.color.toLowerCase().includes(searchField) ||
        gem.cut.toLowerCase().includes(searchField) ||
        gem.clarity.toLowerCase().includes(searchField) ||
        gem.effectDate.toLowerCase().includes(searchField);

      const caratWeightSearch =
        searchCarat === "" ||
        (parseFloat(searchCarat) >= gem.caratWeightFrom &&
          parseFloat(searchCarat) <= gem.caratWeightTo);

      return textSearch && caratWeightSearch;
    });
    setFilterGem(newFilterGem);
  }, [searchField, searchCarat, gemList]);

  console.log(filterGem);
  return (
    <div className="w-10/12 h-5/6 ">
      <div className="text-3xl font-medium py-7">
        <p>Giá kim cương</p>
      </div>
      <div className="bg-white border-2 rounded-xl">
        <div>
          <button className="h-[50px] w-[200px] border-b-4 border-[#0088FF] text-center text-[#0088FF] font-montserrat text-[15px] cursor-pointer">
            Tất cả
          </button>
        </div>
        <hr />
        <div className="mt-3 mb-3">
          <input
            className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11 ml-14 mr-4"
            type="search"
            placeholder="Tìm kiếm kim cương"
            onChange={handleSearch}
          />
          <input
            className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11 ml-14 mr-4"
            type="search"
            placeholder="Kim cương trong trọng lượng khoảng"
            onChange={handleSearchCaratWeight}
          />
        </div>
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
            {currentGem.map((gem) => {
              return (
                <tr
                  className={classes.tr}
                  key={gem.id}
                  onClick={() => handleNavigate(gem)}
                >
                  <td className={classes.td}>{gem.origin}</td>
                  <td className={classes.td}>{gem.color}</td>
                  <td className={classes.td}>{gem.clarity}</td>
                  <td className={classes.td}>{gem.cut}</td>
                  <td className={classes.td}>
                    {gem.caratWeightFrom} - {gem.caratWeightTo}
                  </td>

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

export default TableGem;
