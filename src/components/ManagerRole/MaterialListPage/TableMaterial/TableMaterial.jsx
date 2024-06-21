import { useEffect, useRef, useState } from "react";
import classes from "./TableMaterial.module.css";
import Pagination from "../../../CashierRole/UtilsComponent/Pagination/Pagination";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import AddDiscountModal from "../AddDiscountModal/AddDiscountModal";
import { useNavigate } from "react-router-dom";
import { formatter } from "../../../../util/formatter";
// import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";

const TableMaterial = () => {
  const addDiscountModalRef = useRef();
  const doneModelRef = useRef();
  const [materialList, setMaterialList] = useState([]);
  const [select, setSelect] = useState(false);
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

  const handleClick = (material) => {
    navigate("/managermaterialdetail", { state: { material } });
  };

  const handleFilter = (filterName) => {
    setSelectedFilter(filterName);
    if (filterName === "Tất cả") {
      setFilterMaterialList(materialList);
    } else {
      setFilterMaterialList(
        materialList.filter((material) => material.goldName === filterName)
      );
    }
  };

  // const handleAdd = () => {
  //   addDiscountModalRef.current.showModal();
  // };

  // const handleHide = () => {
  //   handleMaterial();
  //   addDiscountModalRef.current.close();
  // };

  // const handleCheckbox = (event) => {
  //   const { name, checked } = event.target;
  //   if (name === "allSelect") {
  //     setSelect(checked);
  //     const tempDiscount = materialList.map((material) => ({
  //       ...material,
  //       isChecked: checked,
  //     }));
  //     setMaterialList(tempDiscount);
  //     setFilterMaterialList(tempDiscount);
  //   } else {
  //     const tempDiscount = materialList.map((material) =>
  //       material.code === name ? { ...material, isChecked: checked } : material
  //     );
  //     setMaterialList(tempDiscount);
  //     setFilterMaterialList(tempDiscount);
  //   }
  // };

  // async function handleDeleteAll() {
  //   let idString = "";
  //   materialList.map((material) => {
  //     idString = idString.concat(material.id + ", ");
  //   });
  //   idString = idString.trim();
  //   idString = idString.slice(0, idString.length - 1);
  //   try {
  //     console.log(idString);
  //     const res = await fetch(
  //       `http://mahika.foundation:8080/swp/api/material/delete-${idString}`,
  //       { method: "DELETE" }
  //     );
  //     handleOpen();
  //     handleMaterial();
  //   } catch (error) {}
  // }

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
      {/* <DoneModal ref={doneModelRef} handleClose={handleClose} /> */}
      {/* <AddDiscountModal ref={addDiscountModalRef} onClose={handleHide} /> */}
      <div className="w-10/12 h-5/6 mx-auto">
        <div className="text-3xl font-medium py-10 flex justify-between">
          <p>Danh sách giá vàng</p>
          <button
            // onClick={handleAdd}
            className="h-15 w-40 rounded bg-blue-600 hover:bg-blue-700 text-slate-100 text-xl"
          >
            + Thêm vàng
          </button>
        </div>

        <div className="bg-white border-2 rounded-xl drop-shadow-xl">
          <div>
            <button className={`${classes.button} ${classes.selectedFilter}`}>
              Tất cả
            </button>
          </div>
          <hr />
          <div className="mt-5 mb-7">
            <input
              className="h-9 w-96 rounded-lg border-2 border-gray-300 outline-none pl-4 ml-14"
              type="search"
              placeholder="Tìm kiếm loại vàng"
            />
          </div>
          <table className="group w-full border-collapse">
            <thead>
              <tr className={classes.tr}>
                <th className={classes.th}>Loại vàng</th>
                <th className={classes.th}>Giá mua</th>
                <th className={classes.th}>Giá bán</th>
                <th className={classes.th}>Ngày hiệu lực</th>
                {/* </>
                )} */}
              </tr>
            </thead>
            <tbody>
              {!currentMaterial.length
                ? skeletonRowList
                : currentMaterial.map((material) => {
                    return (
                      <tr
                        onClick={() => handleClick(material)}
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
