import Invoice from "../Invoice/Invoice";
import { useState, useEffect } from "react";

const InvoiceList = () => {
  const [invoiceField, setInvoiceField] = useState([]);

  const handleSubmit = () => {
    fetch("http://localhost:8080/api/product?counter_id=1", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setInvoiceField(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      {invoiceField.map((invoice) => {
        return <Invoice key={invoice.productCode} invoice={invoice} />;
      })}
    </div>
  );
};

export default InvoiceList;
