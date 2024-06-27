import React from "react";
import warningIcon from "/assets/warning.png";
const NotAllowed = () => {
  return (
    <div>
      <div>
        <img src={warningIcon} alt="warningIcon" />
      </div>
      <h1>Xin lỗi, bạn phải đăng nhập để có thể vào được trang này</h1>
    </div>
  );
};

export default NotAllowed;
