import { useEffect, useRef, useState } from "react";
import classes from "./MaterialHistory.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import AddMaterialModal from "../AddMaterialModalRef/AddMaterialModal";
import { useNavigate } from "react-router-dom";
import { formatter } from "../../../../util/formatter";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import viewIcon from "/assets/eye.png";
import MaterialListDropDown from "../MaterialListDropDown/MaterialListDropDown";

const MaterialHistory = ({ material }) => {
  const addMaterialModalRef = useRef();
  const controllerRef = useRef();
  const doneModelRef = useRef();
  const [materialList, setMaterialList] = useState([]);
  const [materialHistory, setMaterialHistory] = useState([]);
  const [filterMaterialHistoryList, setFilterMaterialHistoryList] = useState(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const materialPerPage = 4;

  const lastDiscountIndex = currentPage * materialPerPage;
  const firstDiscountIndex = lastDiscountIndex - materialPerPage;
  const currentMaterial = filterMaterialHistoryList.slice(
    firstDiscountIndex,
    lastDiscountIndex
  );

  const handleMaterialList = async () => {
    try {
      const res = await fetch("http://mahika.foundation:8080/swp/api/material");
      const data = await res.json();
      setMaterialList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMaterial = async () => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const response = await fetch(
      `http://mahika.foundation:8080/swp/api/gold-price/${material.id}`,
      { signal }
    );
    const data = await response.json();
    console.log(data);
    setMaterialHistory(data);
    setFilterMaterialHistoryList(data);
  };

  useEffect(() => {
    handleMaterialList();
    handleMaterial();
  }, []);

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

  function handleOpen() {
    doneModelRef.current.showModal();
  }

  function handleClose() {
    doneModelRef.current.close();
  }

  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
      <div className="w-10/12 h-5/6 mx-auto">
        <div className="text-3xl font-medium py-10 flex justify-between">
          <p>Lịch sử giá vàng</p>
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
          <table className="group w-full border-collapse">
            <thead>
              <tr className={classes.tr}>
                <th className={classes.th}>Loại vàng</th>
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
                      <tr className={`${classes.tr}`} key={material.id}>
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
          <div className="text-right mr-28">
            <button
              onClick={() =>
                navigate("/managermaterialdetail", {
                  state: {
                    material: { ...materialHistory[0], ["id"]: material.id },
                  },
                })
              }
              className="h-14 w-40 mt-10  rounded bg-[#0088FF] hover:bg-[#0a73ce] text-slate-100 text-xl"
            >
              Thêm giá mới
            </button>
          </div>
          <Pagination
            totalInvoice={filterMaterialHistoryList.length}
            invoicePerPage={materialPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default MaterialHistory;
