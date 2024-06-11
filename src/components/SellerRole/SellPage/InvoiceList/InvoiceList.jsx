/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Invoice from "../Invoice/Invoice";
import classes from "./InvoiceList.module.css";
import { useState } from "react";

const InvoiceList = ({ listProducts }) => {
  const [invoiceField, setInvoiceField] = useState([]);

  return (
    <div className={classes.list}>
      {listProducts.map((invoice, index) => {
        return <Invoice key={index} invoice={invoice} />;
      })}
    </div>
  );
};

export default InvoiceList;
