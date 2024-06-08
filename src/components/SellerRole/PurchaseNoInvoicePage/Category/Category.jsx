import { useContext, useEffect, useState } from "react";

import classes from "./Category.module.css";
import DropDownGold from "../DropDownGold/DropDownGold";
import InvoiceRepurchaseGold from "../InvoiceRepurchaseGold/InvoiceRepurchaseGold";
import InvoiceRepurchaseDiamond from "../InvoiceRepurchaseDiamond/InvoiceRepurchaseDiamond";
import { RepurchaseContext } from "../../../../context/RepurchaseContext";
const Category = () => {
  const [listGold, setListGold] = useState([]);
  const [weight, setGoldWeight] = useState(0);
  const [name, setGoldType] = useState("");
  const [diamondOrigin, setDiamondOrigin] = useState();
  const [diamondCut, setDiamondCut] = useState("");
  const [diamondColor, setDiamondColor] = useState("");
  const [diamondCaratWeight, setDiamondCaratWeight] = useState(0);
  const [diamondClarity, setDiamondClarity] = useState("");
  const { itemPurchase, addItemToPurchase } = useContext(RepurchaseContext);

  const criteriaItem = {
    listDiamondCriteria: [],
    listGoldCriteria: [],
  };

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
          price: (
            s.goldCriteriaResponseDTO[0] || s.diamondCriteriaResponseDTO[0]
          ).price,
        };
        newInvoice = { ...newInvoice, data };
        addItemToPurchase(newInvoice);
      })
      .catch((error) => console.log(error));
  };
  const handleGold = () => {
    fetch("http://mahika.foundation:8080/swp/api/material", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dataGold) => setListGold(dataGold))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGold();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes["left-container"]}>
        <h2 className={classes.title}>Mua lại sản phẩm</h2>
        {/* -----Nhập vàng----- */}
        <div className={classes.gold}>
          <div className={classes.frame1}>
            <p className={classes["head-frame-gold"]}>Vàng</p>
          </div>
          <div className={classes["gold-weight"]}>
            <p>Khối lượng</p>
            <input
              className={classes["input-field"]}
              placeholder="Nhập khối lượng vàng.."
              type="number"
              value={weight}
              onChange={(e) => setGoldWeight(e.target.value)}
            />
          </div>
          <div className={classes["gold-type"]}>
            <p>Loại vàng</p>
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
                weight: weight,
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
          <hr className={classes.line} />
          <div className={classes.origin}>
            <p>Nguồn gốc</p>
            <input
              className={classes["input-field"]}
              placeholder="Nhập nguồn gốc.."
              type="text"
              value={diamondOrigin}
              onChange={(e) => setDiamondOrigin(e.target.value)}
            />
          </div>
          <div className={classes.cut}>
            <p>Giác cắt</p>
            <input
              className={classes["input-field"]}
              placeholder="Nhập giác cắt.."
              type="text"
              value={diamondCut}
              onChange={(e) => setDiamondCut(e.target.value)}
            />
          </div>
          <div className={classes["color-dmd"]}>
            <p>Màu sắc</p>
            <input
              className={classes["input-field"]}
              placeholder="Nhập màu sắc.."
              type="text"
              value={diamondColor}
              onChange={(e) => setDiamondColor(e.target.value)}
            />
          </div>
          <div className={classes["carat-weight"]}>
            <p>Trọng lượng (carat)</p>
            <input
              className={classes["input-field"]}
              placeholder="Nhập trọng lượng carat.."
              type="number"
              value={diamondCaratWeight}
              onChange={(e) => setDiamondCaratWeight(e.target.value)}
            />
          </div>
          <div className={classes.clarity}>
            <p>Độ tinh khiết</p>
            <input
              className={classes["input-field"]}
              placeholder="Nhập độ trong suốt.."
              type="text"
              value={diamondClarity}
              onChange={(e) => setDiamondClarity(e.target.value)}
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
            <p className={classes.value}>51.000.000</p>
          </div>
          <div className={classes.framePromote}>
            <p className={classes.info}>Ưu đãi</p>
            <p className={classes.value}>0</p>
          </div>
          <div className={classes.framePay}>
            <p className={classes.info}>Số tiền phải trả</p>
            <p className={classes.value}>51.000.000</p>
          </div>
          <button
            disabled={!itemPurchase || !itemPurchase.length}
            className={classes.createInvoice}
          >
            TẠO HÓA ĐƠN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
