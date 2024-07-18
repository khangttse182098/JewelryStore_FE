import classes from "./CashierSidebar.module.css";
import InvoiceList from "/assets/invoice-list.png";
import Product from "/assets/product.png";
import Customer from "/assets/customer.png";
import { useNavigate } from "react-router-dom";

const CashierSidebar = ({ activePage }) => {
  const navigate = useNavigate();
  return (
    <div className="w-75 h-screen bg-sidebar-blue">
      <div className="p-8 py-8">
        <p className="font-semibold text-2xl text-white">Trang quản lý</p>
      </div>
      <hr />
      <div className="font-normal text-xl text-slate-50 flex flex-col pl-1 pt-8 ">
        <button
          className={`flex items-center gap-2 h-16 w-3/4 mb-8 rounded-3xl ${
            activePage === "Danh sách hóa đơn" && classes.active
          }`}
          onClick={() => navigate("/cashier/invoice/list")}
        >
          <img src={InvoiceList} alt="Staff icon" className="pl-4" />
          <p>Hóa đơn</p>
        </button>
        <button
          className={`flex items-center gap-2 h-16 w-3/4 mb-8 rounded-3xl ${
            activePage === "Sản phẩm" && classes.active
          }`}
          onClick={() => navigate("/cashier/product/list")}
        >
          <img src={Product} alt="Invoice icon" className="pl-4" />
          <p>Sản phẩm</p>
        </button>
        <button
          className={`flex items-center gap-2 h-16 w-3/4 mb-8 rounded-3xl ${
            activePage === "Khách hàng" && classes.active
          }`}
          onClick={() => navigate("/cashier/customer/list")}
        >
          <img src={Customer} alt="Product icon" className="pl-4" />
          <p>Khách hàng</p>
        </button>
      </div>
    </div>
  );
};

export default CashierSidebar;
