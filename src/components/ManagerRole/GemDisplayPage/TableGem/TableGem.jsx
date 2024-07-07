import { useEffect, useRef, useState } from "react";
import classes from "./TableGem.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { formatter } from "../../../../util/formatter";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TableGem = () => {
  const controllerRef = useRef();
  const [gemList, setGemList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchCarat, setSearchCarat] = useState("");
  const [filterGem, setFilterGem] = useState([...gemList]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [gemPerPage, setGemPerPage] = useState(5);

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
        setIsLoading(false);
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

  let skeletonRowList = [];
  for (let index = 0; index < gemPerPage; index++) {
    skeletonRowList.push(
      <tr key={index}>
        <td colSpan="8">
          <Skeleton className={classes["td-skeleton"]} />
        </td>
      </tr>
    );
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <div className="w-10/12 h-5/6 ">
        <div className="text-3xl font-medium py-7">
          <p>Giá kim cương</p>
        </div>
        <div className="bg-white border-2 rounded-xl">
          <div>
            <button className="h-[50px] w-[200px] border-b-4 border-[#2661ec] text-center text-[#2661ec] font-semibold font-montserrat cursor-pointer">
              Tất cả
            </button>
          </div>
          <hr />
          <div className="my-5 flex justify-around">
            <input
              className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11"
              type="search"
              placeholder="Tìm kiếm kim cương"
              onChange={handleSearch}
            />
            <input
              className="h-9 w-96 rounded-md border border-[#dfd8d8] outline-none pl-11"
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
              {isLoading ? (
                skeletonRowList
              ) : !currentGem.length ? (
                <tr>
                  <td
                    colSpan="8"
                    className="font-medium text-red-500 text-center h-32"
                  >
                    Không tìm thấy kết quả cho "{searchField}"
                  </td>
                </tr>
              ) : (
                currentGem.map((gem) => {
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
                })
              )}
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
    </SkeletonTheme>
  );
};

export default TableGem;
