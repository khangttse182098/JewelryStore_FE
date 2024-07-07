import React, { useEffect, useRef, useState } from "react";
import classes from "./InvoiceDetail.module.css";
import PenImg from "/assets/pen.png";
import { formatter } from "../../../../util/formatter";
import diamondImg from "/assets/diamon.png";
import Gold from "/assets/Gold.png";
import ImageLoader from "../../../../util/ImageLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import InvoiceDetailModal from "../InvoiceDetailModal/InvoiceDetailModal";
import CustomerModal from "../../../CashierRole/InvoiceListPage/CustomerModal/CustomerModal";

const InvoiceDetail = ({ order }) => {
  console.log(order);
  const InvoiceDetailModalRef = useRef();
  const CustomerModalRef = useRef();
  const doneModalRef = useRef();

  const {
    productResponseDTOList,
    diamondCriteriaResponseDTOS,
    materialResponseDTOList,
    discountValue,
  } = order;

  const [selectedItem, setSelectedItem] = useState(null);
  const [customer, setCustomer] = useState({});
  const [totalNumber, setTotalNumber] = useState(0);
  const [discountProduct, setDiscountProduct] = useState(0);
  console.log(totalNumber);
  const { invoiceCode, customerName, status, totalPrice, customerId } = order;
  const [renderStatus, setRenderStatus] = useState(status);

  useEffect(() => {
    if (productResponseDTOList) {
      productResponseDTOList.map((product) =>
        setDiscountProduct((prev) => prev + product.discountPrice)
      );
      setTotalNumber((prev) => prev + productResponseDTOList.length);
    }
    if (materialResponseDTOList) {
      setTotalNumber((prev) => prev + materialResponseDTOList.length);
    }
    if (diamondCriteriaResponseDTOS) {
      setTotalNumber((prev) => prev + diamondCriteriaResponseDTOS.length);
    }
  }, [
    productResponseDTOList,
    materialResponseDTOList,
    diamondCriteriaResponseDTOS,
  ]);

  const handleClick = (item, type) => {
    setSelectedItem({ item, type });
    InvoiceDetailModalRef.current.showModal();
  };

  const handleHide = () => {
    InvoiceDetailModalRef.current.close();
  };

  const handleFetchCustomer = () => {
    fetch(`http://mahika.foundation:8080/swp/api/customer/list-${customerId}`)
      .then((res) => res.json())
      .then((customer) => {
        return setCustomer(customer);
      });
  };

  const handleFetchPurchase = () => {
    fetch(`http://mahika.foundation:8080/swp/api/order/status/paid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoiceCode }),
    }).then((res) => {
      setRenderStatus("Đã thanh toán");
      handleOpenDoneModal();
    });
  };

  useEffect(() => {
    handleFetchCustomer();
  }, []);

  function handleOpenDoneModal() {
    doneModalRef.current.showModal();
  }
  function handleCloseDoneModal() {
    doneModalRef.current.close();
  }

  const handleOpenCustomerModal = () => {
    CustomerModalRef.current.showModal();
  };

  const handleCloseCustomerModal = () => {
    CustomerModalRef.current.close();
  };

  const onChangeCustomer = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  return (
    <>
      {selectedItem && (
        <InvoiceDetailModal
          ref={InvoiceDetailModalRef}
          invoice={selectedItem.item}
          type={selectedItem.type}
          handleHide={handleHide}
        />
      )}
      <SkeletonTheme baseColor="#f2f2f2" highlightColor="white">
        <DoneModal ref={doneModalRef} handleClose={handleCloseDoneModal} />
        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
            <h2 className="font-semibold text-2xl">Chi tiết hóa đơn</h2>
            <hr className="w-full my-2" />
            <table className="w-full border-collapse">
              <thead>
                <tr className="font-medium text-xl">{invoiceCode}</tr>
                <tr className={classes["invoice-props"]}>
                  <th>Sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {productResponseDTOList !== null
                  ? productResponseDTOList.map((order, index) => {
                      return (
                        <tr
                          className={classes["row-container"]}
                          key={index}
                          onClick={() => handleClick(order, "product")}
                        >
                          <td className={classes["img-container"]}>
                            <ImageLoader
                              URL={order.productImage}
                              imgStyle="w-28 h-20"
                              skeletonStyle="w-28 h-20"
                              alt="Jewelry"
                            />
                          </td>
                          <td>{order.productName}</td>
                          <td>{formatter.format(order.price)}</td>
                        </tr>
                      );
                    })
                  : undefined}
                {diamondCriteriaResponseDTOS !== null
                  ? diamondCriteriaResponseDTOS.map((order, index) => {
                      return (
                        <tr
                          className={classes["row-container"]}
                          key={index}
                          onClick={() => handleClick(order, "diamond")}
                        >
                          <td className={classes["img-container"]}>
                            <img
                              className={classes.img}
                              src={diamondImg}
                              alt="ring"
                            />
                          </td>
                          <td>Kim cương</td>
                          <td>{formatter.format(order.price)}</td>
                        </tr>
                      );
                    })
                  : undefined}
                {materialResponseDTOList !== null
                  ? materialResponseDTOList.map((order, index) => {
                      return (
                        <tr
                          className={classes["row-container"]}
                          key={index}
                          onClick={() => handleClick(order, "material")}
                        >
                          <td className={classes["img-container"]}>
                            <img
                              className={classes.img}
                              src={Gold}
                              alt="ring"
                            />
                          </td>
                          <td>Vàng</td>
                          <td>{formatter.format(order.price)}</td>
                        </tr>
                      );
                    })
                  : undefined}
              </tbody>
            </table>
          </div>

          <CustomerModal
            ref={CustomerModalRef}
            customer={customer}
            handleHide={handleCloseCustomerModal}
            onChangeCustomer={onChangeCustomer}
          />
          <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
            <div className="flex justify-between">
              <p className="font-semibold text-2xl">Khách hàng</p>
              <div>
                <img
                  className="w-6 cursor-pointer"
                  src={PenImg}
                  alt="pen-logo"
                  onClick={handleOpenCustomerModal}
                />
              </div>
            </div>
            <hr className="w-full my-2" />
            <div className={classes["customer-info"]}>
              <div className={classes["customer-name"]}>
                <p className={classes["customer-info-title"]}>Họ và tên: </p>
                <p>
                  {customer.fullName || (
                    <Skeleton style={{ width: "150px", height: "10px" }} />
                  )}
                </p>
              </div>
              <div className={classes["customer-gender"]}>
                <p className={classes["customer-info-title"]}>Giới tính: </p>
                <p>
                  {Object.keys(customer).length ? (
                    customer.gender || "Chưa có thông tin"
                  ) : (
                    <Skeleton style={{ width: "150px", height: "10px" }} />
                  )}
                </p>
              </div>
              <div className={classes["customer-phone"]}>
                <p className={classes["customer-info-title"]}>SĐT: </p>
                <p>
                  {customer.phoneNumber || (
                    <Skeleton style={{ width: "150px", height: "10px" }} />
                  )}{" "}
                </p>
              </div>
              <div className={classes["customer-address"]}>
                <p className={classes["customer-info-title"]}>Địa chỉ: </p>
                <p>
                  {Object.keys(customer).length ? (
                    customer.address || "Chưa có thông tin"
                  ) : (
                    <Skeleton
                      style={{
                        width: "300px",
                        height: "10px",
                      }}
                    />
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* status */}
          <div className="bg-white shadow-md p-4 rounded-md col-span-2 md:col-span-1">
            <div>
              <div>
                <div
                  className={`${
                    renderStatus === "Chưa thanh toán"
                      ? `${classes["status-inProgress"]}`
                      : `${classes["status-success"]}`
                  } ${classes.highlight}`}
                >
                  {renderStatus}
                </div>
                <div className={classes["status-name-containter"]}>
                  <div className={classes.highlight}>Tổng số lượng</div>
                  <div className={classes["status-value"]}>{totalNumber}</div>
                </div>
                <div className={classes["status-name-containter"]}>
                  <div className={classes.highlight}>Tổng tiền hàng</div>
                  <div className={classes["status-value"]}>
                    {formatter.format(totalPrice)}
                  </div>
                </div>
                <div className={classes["status-name-containter"]}>
                  <div className={classes.highlight}>
                    Khuyến mãi {discountValue}%
                  </div>
                  <div className={classes["status-value"]}>
                    -{formatter.format(discountProduct)}
                  </div>
                </div>
                <div className={classes["status-name-containter"]}>
                  <div className={classes.highlight}>Thanh toán</div>
                  <div className={classes["status-value"]}>
                    {formatter.format(totalPrice - discountProduct)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-4 rounded-md col-span-2 md:col-span-1">
            <button
              className={classes["purchase-button"]}
              onClick={handleFetchPurchase}
            >
              Thanh Toán
            </button>
          </div>
        </div>
      </SkeletonTheme>
    </>
  );
};

export default InvoiceDetail;
