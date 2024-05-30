import Invoice from "../Invoice/Invoice";
import classes from "./InvoiceList.module.css";
import { useState } from "react";

const InvoiceList = ({ listProducts }) => {
  const [invoiceField, setInvoiceField] = useState([]);

  return (  
    <div className={classes.list}>
      {listProducts.map((invoice) => {
        return <Invoice key={invoice.productCode} invoice={invoice} />;
      })}
    </div>
  );
};

export default InvoiceList;
