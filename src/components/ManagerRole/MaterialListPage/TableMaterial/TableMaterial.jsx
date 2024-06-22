import { useEffect, useRef, useState } from "react";
import classes from "./TableMaterial.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import AddMaterialModal from "../AddMaterialModalRef/AddMaterialModal";
import { useNavigate } from "react-router-dom";
import { formatter } from "../../../../util/formatter";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import viewIcon from "/assets/eye.png";

const TableMaterial = () => {
  const addMaterialModalRef = useRef();
  const doneModelRef = useRef();
  const [materialList, setMaterialList] = useState([]);
  const [filterMaterialList, setFilterMaterialList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const materialPerPage = 4;

  const lastDiscountIndex = currentPage * materialPerPage;
  const firstDiscountIndex = lastDiscountIndex - materialPerPage;
  const currentMaterial = filterMaterialList.slice(
    firstDiscountIndex,
    lastDiscountIndex
  );
  console.log(currentMaterial);

  const handleMaterial = async () => {
    const response = await fetch(
      "http://mahika.foundation:8080/swp/api/gold-price"
    );
    const data = await response.json();
    console.log(data);
    setMaterialList(data);
    setSelectedFilter("Tất cả");
    setFilterMaterialList(data);
  };

  useEffect(() => {
    handleMaterial();
  }, []);

  const handleAdd = () => {
    addMaterialModalRef.current.showModal();
  };

  const handleHide = () => {
    handleMaterial();
    addMaterialModalRef.current.close();
  };

  let skeletonRowList = [];
  for (let index = 0; index < materialPerPage; index++) {
    skeletonRowList.push(
      <tr key={index}>
        <td colSpan="6">
          <Skeleton className={classes["td-skeleton"]} />
        </td>
      </tr>
    );
  }

  function handleClose() {
    doneModelRef.current.close();
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <DoneModal ref={doneModelRef} handleClose={handleClose} />
      <AddMaterialModal ref={addMaterialModalRef} onClose={handleHide} />
      <div className="w-10/12 h-5/6 mx-auto">
        <div className="text-3xl font-medium py-10 flex justify-between">
          <p>Giá vàng thời điểm</p>
          <button
            onClick={handleAdd}
            className="h-15 w-40 rounded bg-[#0088FF] hover:bg-[#0a73ce] text-slate-100 text-xl"
          >
            + Thêm vàng
          </button>
        </div>

        <div className="bg-white border-2 rounded-xl drop-shadow-xl">
          <div>
            <button
              className={`${classes.button} ${classes.selectedFilter} rounded-t-xl`}
            >
              Tất cả
            </button>
          </div>
          <hr />
          <div className="mt-5 mb-7 flex gap-36">
            <input
              className="h-9 w-96 rounded-lg border-2 border-gray-300 outline-none pl-4 ml-14"
              type="search"
              placeholder="Tìm kiếm loại vàng"
            />
          </div>
          <table className="group w-full border-collapse">
            <thead>
              <tr className={classes.tr}>
                <th className={classes.th}>Tên loại vàng</th>
                <th className={classes.th}>Giá mua</th>
                <th className={classes.th}>Giá bán</th>
                <th className={classes.th}>Ngày hiệu lực</th>
              </tr>
            </thead>
            <tbody>
              {!currentMaterial.length
                ? skeletonRowList
                : currentMaterial.map((material) => {
                    return (
                      <tr
                        onClick={() =>
                          navigate("/managermaterialhistory", {
                            state: { material },
                          })
                        }
                        className={`${classes.tr}`}
                        key={material.goldName}
                      >
                        <td className={classes.td}>{material.goldName}</td>
                        <td className={classes.td}>
                          {formatter.format(material.buyPrice)}
                        </td>
                        <td className={classes.td}>
                          {formatter.format(material.sellPrice)}
                        </td>
                        <td className={classes.td}>{material.effectDate}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          <Pagination
            totalInvoice={filterMaterialList.length}
            invoicePerPage={materialPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TableMaterial;
