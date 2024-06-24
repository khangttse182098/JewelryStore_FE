/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";

import classes from "./Category.module.css";
import DropDownGold from "../DropDownGold/DropDownGold";
import InvoiceRepurchaseGold from "../InvoiceRepurchaseGold/InvoiceRepurchaseGold";
import InvoiceRepurchaseDiamond from "../InvoiceRepurchaseDiamond/InvoiceRepurchaseDiamond";
import { RepurchaseContext } from "../../../../context/RepurchaseContext";
import { formatter } from "../../../../util/formatter";
import CustomerInputForm from "../../UtilsComponent/CustomerInputForm/CustomerInputForm";
import DropDownOrigin from "../Diamond/DiamondDropDown/DropDownOrigin/DropDownOrigin";
import DropDownCut from "../Diamond/DiamondDropDown/DropDownCut/DropDownCut";
import DropDownColor from "../Diamond/DiamondDropDown/DropDownColor/DropDownColor";
import DropDownClarity from "../Diamond/DiamondDropDown/DropDownClarity/DropDownClarity";
import ErrorModal from "../../../UtilComponent/ErrorModal/ErrorModal";

const Category = () => {
  const [listGold, setListGold] = useState([]);
  const [weight, setGoldWeight] = useState("");
  const [name, setGoldType] = useState("");
  const [diamondOrigin, setDiamondOrigin] = useState("");
  const [diamondCut, setDiamondCut] = useState("");
  const [diamondColor, setDiamondColor] = useState("");
  const [diamondCaratWeight, setDiamondCaratWeight] = useState("");
  const [diamondClarity, setDiamondClarity] = useState("");
  const { itemPurchase, addItemToPurchase } = useContext(RepurchaseContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [listOrigin, setListOrigin] = useState([]);
  const [listCut, setListCut] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listClarity, setListClarity] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const errorModalRef = useRef();

  const criteriaItem = {
    listDiamondCriteria: [],
    listGoldCriteria: [],
  };
  const customerInputFormRef = useRef();
  const listDiamondCriteria = [];
  const listGoldCriteria = [];

  const handleAddInvoice = (type, data) => {
    //get id based on name
    let selectedItem;
    if (type === "gold") {
      selectedItem = listGold.find((item) => item.name === data.name);
      selectedItem = { ...selectedItem, weight: data.weight };
      listGoldCriteria.push(selectedItem);
      criteriaItem.listGoldCriteria = [...listGoldCriteria];
      console.log(selectedItem);
    }
    if (type === "diamond") {
      selectedItem = {
        origin: data.origin,
        cut: data.cut,
        color: data.color,
        clarity: data.clarity,
        caratWeight: data.caratWeight,
      };
      listDiamondCriteria.push(selectedItem);
      criteriaItem.listDiamondCriteria = [...listDiamondCriteria];
    }
    //add to listGoldCriteria and listDiamondCriteria

    //add to criteriaItem

    let newInvoice = { type, data };
    fetch(
      // Api post material
      "http://mahika.foundation:8080/swp/api/purchase-order/material-gem-price",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(criteriaItem),
      }
    )
      .then((res) => res.json())
      .then((s) => {
        data = {
          ...data,
          id: (s.goldCriteriaResponseDTO[0] || s.diamondCriteriaResponseDTO[0])
            .id,
          price: (
            s.goldCriteriaResponseDTO[0] || s.diamondCriteriaResponseDTO[0]
          ).price,
        };
        newInvoice = { ...newInvoice, data };
        addItemToPurchase(newInvoice);
        console.log(addItemToPurchase);
      })
      .catch((error) => {
        console.log(error);
        errorModalRef.current.showModal();
      });
  };
  const handleGold = () => {
    fetch(
      // Api get gold type
      "http://mahika.foundation:8080/swp/api/material",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((dataGold) => setListGold(dataGold))
      .catch((error) => console.log(error));
  };

  function handleCalculateTotalPrice() {
    const price = itemPurchase.reduce(
      (acc, curr) => (acc += Number(curr.data.price)),
      0
    );
    return price;
  }

  const handleDiamond = () => {
    fetch(
      // Api get diamond criteria
      "http://mahika.foundation:8080/swp/api/diamond-criteria",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const { clarity, color, cut, origin } = data;
        setListClarity(clarity);
        setListColor(color);
        setListCut(cut);
        setListOrigin(origin);
      })
      .catch((error) => console.log(error));
  };

  function handleCalculateTotalPrice() {
    const price = itemPurchase.reduce(
      (acc, curr) => (acc += Number(curr.data.price)),
      0
    );
    return price;
  }

  useEffect(() => {
    handleGold();
  }, []);

  useEffect(() => {
    handleDiamond();
  }, []);

  useEffect(() => {
    setTotalPrice(handleCalculateTotalPrice());
  }, [itemPurchase]);

  function handleClick() {
    customerInputFormRef.current.showModal();
  }

  function handleHide() {
    customerInputFormRef.current.close();
  }

  const handleCloseErrorModal = () => {
    errorModalRef.current.close();
  };

  return (
    <>
      <CustomerInputForm
        ref={customerInputFormRef}
        handleHide={handleHide}
        isPurchase={true}
      />
      <ErrorModal
        ref={errorModalRef}
        handleClose={handleCloseErrorModal}
        msg={errorMsg}
      />

      <div className={classes.container}>
        <div className={classes["left-container"]}>
          <h2 className={classes.title}>Mua lại sản phẩm</h2>
          {/* -----Nhập vàng----- */}
          <div className={classes.gold}>
            <div className={classes.frame1}>
              <p className={classes["head-frame-gold"]}>Vàng</p>
            </div>
            <div className={classes["gold-weight"]}>
              <p className={classes["selection-title"]}>Khối lượng</p>
              <input
                className={classes["input-field"]}
                placeholder="Nhập khối lượng vàng.."
                type="text"
                value={weight}
                onChange={(e) => setGoldWeight(e.target.value)}
              />
            </div>
            <div className={classes["gold-type"]}>
              <p className={classes["selection-title"]}>Loại vàng</p>
            </div>
            <DropDownGold
              listGold={listGold}
              selectedValue={name}
              onChange={(e) => setGoldType(e)}
            />
            <button
              className={classes["add-goldInvoice"]}
              disabled={!name || !weight}
              onClick={() =>
                handleAddInvoice("gold", {
                  weight: parseInt(weight),
                  name: name,
                  id: Date.now(),
                })
              }
            >
              Thêm vào hóa đơn
            </button>
          </div>
          {/* ----- Nhập kim cương----- */}
          <div className={classes.diamond}>
            <div className={classes.frame1}>
              <p className={classes["head-frame-diamond"]}>Kim cương</p>
            </div>
            <div className={classes.origin}>
              <p className={classes["selection-title"]}>Nguồn gốc</p>
              <DropDownOrigin
                listOrigin={listOrigin}
                selectedValue={diamondOrigin}
                onChange={(e) => setDiamondOrigin(e)}
              />
            </div>
            <div className={classes.cut}>
              <p className={classes["selection-title"]}>Giác cắt</p>
              <DropDownCut
                listCut={listCut}
                selectedValue={diamondCut}
                onChange={(e) => setDiamondCut(e)}
              />
            </div>
            <div className={classes["color-dmd"]}>
              <p className={classes["selection-title"]}>Màu sắc</p>
              <DropDownColor
                listColor={listColor}
                selectedValue={diamondColor}
                onChange={(e) => setDiamondColor(e)}
              />
            </div>
            <div className={classes["carat-weight"]}>
              <p className={classes["selection-title"]}>Trọng lượng (carat)</p>
              <input
                className={classes["input-field"]}
                placeholder="Nhập trọng lượng carat.."
                type="text"
                value={diamondCaratWeight}
                onChange={(e) => setDiamondCaratWeight(e.target.value)}
              />
            </div>
            <div className={classes.clarity}>
              <p className={classes["selection-title"]}>Độ tinh khiết</p>
              <DropDownClarity
                listClarity={listClarity}
                selectedValue={diamondClarity}
                onChange={(e) => setDiamondClarity(e)}
              />
            </div>
            <button
              className={classes["add-diamondInvoice"]}
              disabled={
                !diamondOrigin ||
                !diamondCut ||
                !diamondColor ||
                !diamondCaratWeight ||
                !diamondClarity
              }
              onClick={() =>
                handleAddInvoice("diamond", {
                  origin: diamondOrigin,
                  cut: diamondCut,
                  color: diamondColor,
                  caratWeight: diamondCaratWeight,
                  clarity: diamondClarity,
                  id: Date.now(),
                })
              }
            >
              Thêm vào hóa đơn
            </button>
          </div>
        </div>

        <div className={classes["right-container"]}>
          <h2 className={classes["invoice-detail-title"]}>Thông tin hóa đơn</h2>
          <div className={classes["content-right"]}>
            {itemPurchase.map((invoice) => (
              <div key={invoice.data.id} className={classes.invoice}>
                {invoice.type === "gold" ? (
                  <InvoiceRepurchaseGold item={invoice} />
                ) : (
                  <InvoiceRepurchaseDiamond item={invoice} />
                )}
              </div>
            ))}
          </div>
          <div className={classes["repurchase-info"]}>
            <div className={classes.frameTotal}>
              <p className={classes.info}>Tổng tiền</p>
              <p className={classes.value}>{formatter.format(totalPrice)}</p>
            </div>
            <div className={classes.framePromote}>
              <p className={classes.info}>Ưu đãi</p>
              <p className={classes.value}>0</p>
            </div>
            <div className={classes.framePay}>
              <p className={classes.info}>Số tiền phải trả</p>
              <p className={classes.value}>{formatter.format(totalPrice)}</p>
            </div>
            <button
              disabled={!itemPurchase || !itemPurchase.length}
              className={classes.createInvoice}
              onClick={handleClick}
            >
              TẠO HÓA ĐƠN
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
