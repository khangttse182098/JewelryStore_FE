import classes from "./TableGemInfor.module.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatter } from "../../../../util/formatter";

const TableGemInfor = () => {
  const controllerRef = useRef();
  const [gemList, setGemList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filterGem, setFilterGem] = useState([...gemList]);
  const navigate = useNavigate();

  //------------------------Get list gems--------------------
  useEffect(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const handleGem = async () => {
      try {
        const response = await fetch(
          "http://mahika.foundation:8080/swp/api/diamond-price",
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
    navigate("/managergeminfordetail", { state: { gem } });
  }
  //----------------------------Search-------------------------------
  const handleSearch = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    const newFilterGem = gemList.filter((gem) => {
      return gem.gemName.toLowerCase().includes(searchField);
    });
    setFilterGem(newFilterGem);
  }, [searchField, gemList]);

  return (
    <div className="w-10/12 h-5/6 ">
      <div className="text-3xl font-medium py-9">
        <p>Danh sách kim cương</p>
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
          <Link to="/manageraddgem">
            <button className="w-32 h-9 rounded-md bg-[#0088FF] text-white">
              + Thêm mới
            </button>
          </Link>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className={classes.tr}>
              <th className={classes.th}>Tên kim cương</th>
              <th className={classes.th}>Mã kim cương</th>
              <th className={classes.th}>Nguồn gốc</th>
              <th className={classes.th}>Màu sắc</th>
              <th className={classes.th}>Trọng lượng carat (g)</th>
              <th className={classes.th}>Giác cắt</th>
              <th className={classes.th}>Độ tinh khiết</th>
              <th className={classes.th}>Giá bán</th>
            </tr>
          </thead>
          <tbody>
            {filterGem.map((gem) => {
              return (
                <tr
                  className={classes.tr}
                  key={gem.id}
                  onClick={() => handleNavigate(gem)}
                >
                  <td className={classes.td}>{gem.gemName}</td>
                  <td className={classes.td}>{gem.gemCode}</td>
                  <td className={classes.td}>{gem.origin}</td>
                  <td className={classes.td}>{gem.color}</td>
                  <td className={classes.td}>{gem.caratWeight}</td>
                  <td className={classes.td}>{gem.cut}</td>
                  <td className={classes.td}>{gem.clarity}</td>
                  <td className={classes.td}>
                    {formatter.format(gem.sellPrice)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableGemInfor;
