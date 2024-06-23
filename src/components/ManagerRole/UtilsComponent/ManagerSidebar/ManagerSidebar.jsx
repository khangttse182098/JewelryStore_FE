import InvoiceList from "/assets/invoice-list.png";
import Product from "/assets/product.png";
import Customer from "/assets/customer.png";
import Disount from "/assets/discount.png";
import Staff from "/assets/staff.png";
import Dashboard from "/assets/dashboardIcon.png";
import Material from "/assets/materialIcon.png";
import classes from "./ManagerSidebar.module.css";
import { useNavigate } from "react-router-dom";

const ManagerSidebar = ({ activePage }) => {
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
            activePage === "Thống kê" && classes.active
          }`}
          onClick={() => navigate("/manager/dashboard")}
        >
          <img src={Dashboard} alt="Staff icon" className="pl-4" />
          <p>Thống kê</p>
        </button>
        <button
          className={`flex items-center gap-2 h-16 w-3/4 mb-8 rounded-3xl ${
            activePage === "Danh sách hóa đơn" && classes.active
          }`}
          onClick={() => navigate("/managerinvoicelist")}
        >
          <img src={InvoiceList} alt="Invoice icon" className="pl-4" />
          <p>Hóa đơn</p>
        </button>
        <button
          className={`flex items-center gap-2 h-16 w-3/4 mb-8 rounded-3xl ${
            activePage === "Sản phẩm" && classes.active
          }`}
          onClick={() => navigate("/managerproductlist")}
        >
          <img src={Product} alt="Product icon" className="pl-4" />
          <p>Sản phẩm</p>
        </button>
        <button
          className={`flex items-center gap-2 h-16 w-3/4 mb-8 rounded-3xl ${
            activePage === "Khách hàng" && classes.active
          }`}
        >
          <img src={Customer} alt="Customer icon" className="pl-4" />
          <p>Khách hàng</p>
        </button>
        <button
          className={`flex items-center gap-2 h-16 w-3/4 mb-8 rounded-3xl ${
            activePage === "Khuyến mãi" && classes.active
          }`}
          onClick={() => navigate("/managerdiscountlist")}
        >
          <img src={Disount} alt="Discount icon" className="pl-4" />
          <p>Khuyến mãi</p>
        </button>
        <button
          className={`flex items-center gap-2 h-16 w-3/4 mb-8 rounded-3xl ${
            activePage === "Nhân viên" && classes.active
          }`}
          onClick={() => navigate("/managerstafflist")}
        >
          <img src={Staff} alt="Staff icon" className="pl-4" />
          <p>Nhân viên</p>
        </button>
        <button
          className={`flex items-center gap-2 h-16 w-3/4 mb-8 rounded-3xl ${
            activePage === "Giá vàng" && classes.active
          }`}
          onClick={() => navigate("/managermateriallist")}
        >
          <img src={Material} alt="Staff icon" className="pl-4" />
          <p>Giá vàng</p>
        </button>
      </div>
    </div>
  );
};

export default ManagerSidebar;
