import InvoiceList from "/assets/invoice-list.png";
import Product from "/assets/product.png";
import Customer from "/assets/customer.png";
import Disount from "/assets/discount.png";
import Staff from "/assets/staff.png";
import { Link } from "react-router-dom";

const ManagerSidebar = () => {
  return (
    <div className="w-64 h-screen bg-sidebar-blue">
      <div className="p-8 py-8">
        <p className="font-semibold text-2xl text-white">Trang quản lý</p>
      </div>
      <hr />
      <div className="font-normal text-xl text-slate-50 flex flex-col pl-1 pt-8 ">
        <button className="flex mb-8">
          <img src={InvoiceList} alt="Invoice icon" />
          <p>Danh sách hóa đơn</p>
        </button>
        <Link to="/managerproductlist">
          <button className="flex mb-8">
            <img src={Product} alt="Product icon" />
            <p>Sản phẩm</p>
          </button>
        </Link>
        <button className="flex mb-8">
          <img src={Customer} alt="Customer icon" />
          <p>Khách hàng</p>
        </button>
        <button className="flex mb-8">
          <img src={Disount} alt="Discount icon" />
          <p>Khuyến mãi</p>
        </button>
        <button className="flex mb-8">
          <img src={Staff} alt="Staff icon" />
          <p>Nhân viên</p>
        </button>
      </div>
    </div>
  );
};

export default ManagerSidebar;
