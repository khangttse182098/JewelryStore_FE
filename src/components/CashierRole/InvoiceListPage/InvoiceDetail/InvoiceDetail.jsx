/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import classes from "./InvoiceDetail.module.css";
import PenImg from "/assets/pen.png";
import { formatter } from "../../../../util/formatter";
import diamondImg from "/assets/diamon.png";
import Gold from "/assets/Gold.png";
import InvoiceDetailModal from "../InvoiceDetailModal/InvoiceDetailModal";
import ImageLoader from "../../../../util/ImageLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import DoneModal from "../../../UtilComponent/DoneModal/DoneModal";
import CustomerModal from "../CustomerModal/CustomerModal";

const InvoiceDetail = ({ invoice }) => {
  const InvoiceDetailModalRef = useRef();
  const CustomerModalRef = useRef();
  const doneModalRef = useRef();

  const {
    productResponseDTOList,
    diamondCriteriaResponseDTOS,
    materialResponseDTOList,
    discountValue,
  } = invoice.list;

  const [selectedItem, setSelectedItem] = useState(null);
  const [customer, setCustomer] = useState({});
  const [payPrice, setPayPrice] = useState("");
  const [fund, setFund] = useState("");
  const { invoiceCode, customerName, status, totalPrice, customerId } =
    invoice.list;
  const [renderStatus, setRenderStatus] = useState(status);
  const [totalNumber, setTotalNumber] = useState(0);
  const [discountProduct, setDiscountProduct] = useState(0);

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
        console.log(customer);
        return setCustomer(customer);
      });
  };

  const onChangeCustomer = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  const handleOpenCustomerModal = () => {
    CustomerModalRef.current.showModal();
  };

  const handleCloseCustomerModal = () => {
    CustomerModalRef.current.close();
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

  function handleOpenDoneModal() {
    doneModalRef.current.showModal();
  }
  function handleCloseDoneModal() {
    doneModalRef.current.close();
  }

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
        <div>
          <div className="text-2xl font-semibold ml-10">Chi tiết hóa đơn</div>
          <div className={classes["table-container"]}>
            <table
              cellspacing="0"
              cellpadding="0"
              className={classes["product-list"]}
            >
              <thead>
                <tr className={classes["invoice-title"]}>{invoiceCode}</tr>
                <tr className={classes["invoice-props"]}>
                  <th>Sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {productResponseDTOList !== null
                  ? productResponseDTOList.map((list, index) => {
                      return (
                        <tr
                          className={classes["row-container"]}
                          key={index}
                          onClick={() => handleClick(list, "product")}
                        >
                          <td className={classes["img-container"]}>
                            <ImageLoader
                              URL={list.productImage}
                              imgStyle={classes.img}
                              skeletonStyle={classes["img-skeleton"]}
                            />
                          </td>
                          <td>{list.productName}</td>
                          <td>{formatter.format(list.price)}</td>
                        </tr>
                      );
                    })
                  : undefined}
                {diamondCriteriaResponseDTOS !== null
                  ? diamondCriteriaResponseDTOS.map((list, index) => {
                      return (
                        <tr
                          className={classes["row-container"]}
                          key={index}
                          onClick={() => handleClick(list, "diamond")}
                        >
                          <td className={classes["img-container"]}>
                            <img
                              className={classes.img}
                              src={diamondImg}
                              alt="ring"
                            />
                          </td>
                          <td>Kim cương</td>
                          <td>{formatter.format(list.price)}</td>
                        </tr>
                      );
                    })
                  : undefined}
                {materialResponseDTOList !== null
                  ? materialResponseDTOList.map((list, index) => {
                      return (
                        <tr
                          className={classes["row-container"]}
                          key={index}
                          onClick={() => handleClick(list, "material")}
                        >
                          <td className={classes["img-container"]}>
                            <img
                              className={classes.img}
                              src={Gold}
                              alt="ring"
                            />
                          </td>
                          <td>Vàng</td>
                          <td>{formatter.format(list.price)}</td>
                        </tr>
                      );
                    })
                  : undefined}
              </tbody>
            </table>

            <CustomerModal
              ref={CustomerModalRef}
              customer={customer}
              handleHide={handleCloseCustomerModal}
              onChangeCustomer={onChangeCustomer}
            />
            <div className={classes["customer-detail"]}>
              <div className={classes["customer-title-container"]}>
                <p>Khách hàng</p>
                <div>
                  <img
                    className={classes["img-pen"]}
                    src={PenImg}
                    alt="pen-logo"
                    onClick={handleOpenCustomerModal}
                  />
                </div>
              </div>
              <hr
                style={{
                  width: "419px",
                  marginLeft: "23px",
                  marginBottom: "20px",
                }}
              />
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
          </div>
          {/* status */}
          <div className={classes["purchase-contatiner"]}>
            <div className={classes["status-container"]}>
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
                  Khuyễn mãi {discountValue}%
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

            <div className={classes.dropdown}>
              <button className={classes.dropbtn}>Thanh toán</button>
              <div className={classes["dropdown-content"]}>
                <a onClick={handleFetchPurchase}>Tiền mặt</a>
                <a onClick={handleFetchPurchase}>Chuyển khoản</a>
                <a onClick={handleFetchPurchase}>Thẻ tín dụng</a>
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </>
  );
};

export default InvoiceDetail;
