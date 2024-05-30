import classes from "./CategoryType.module.css";
import ButtonType from "../ButtonType/ButtonType";
import SearchProduct from "../SearchProduct/SearchProduct";
import DropDownCounter from "../DropDownCounter/DropDownCounter";
import InvoiceList from "../InvoiceList/InvoiceList";
import InformationBar from "../InformationBar/InformationBar";
import { useEffect, useState } from "react";

const CategoryType = () => {
  //select category type
  const [activeOption, setActiveOption] = useState("");

  // -----------------------Search-------------------------
  //for search
  const [searchField, setSearchField] = useState("");

  //display initial -> Display all products when not selected counter or type
  const [products, setProducts] = useState([]);

  //filter product if using search
  const [filterProduct, setFilterProduct] = useState([products]);

  useEffect(() => {
    fetch("http://localhost:8080/api/product")
      .then((res) => res.json())
      .then((dataProduct) => setProducts(dataProduct));
  });

  //for filter through all products if the productname match in the searchField the setFilterProduct to newFilterProduct
  //whenever products and searchField change
  useEffect(() => {
    const newFilterProduct = products.filter((product) => {
      return product.productName.toLowerCase().includes(searchField);
    });
    setFilterProduct(newFilterProduct);
  }, [products, searchField]);

  //knowing when user type in and set search field to what user type
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };
  // ----------------------------------------------------------

  //------------------------Counter----------------------------
  const [listCounter, setListCounter] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/counter")
      .then((res) => res.json())
      .then((dataCounter) => setListCounter(dataCounter));
  }, []);

  // const [invoiceField, setInvoiceField] = useState([]);

  //---------------------------------FETCH API--------------------------
  // const onCounterSelect = (counter) => {
  //   setSelectedCounter(counter);
  //   fetch(`http://localhost:8080/api/product?counter_id=${counter.id}`)
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data))
  //     .catch((error) => console.log(error));
  // };
  //---------------------------------------------------------------------

  return (
    <div className={classes.container}>
      <div className={classes["container-left"]}>
        <div className={classes.search}>
          <SearchProduct
            onChangeHandler={onSearchChange}
            placeholder="Nhập trang sức cần tìm kiếm..."
          />
        </div>
        <div className={classes.selection}>
          <DropDownCounter listCounter={listCounter} />
          <ButtonType
            option="option1"
            activeOption={activeOption}
            onClick={setActiveOption}
          >
            Trang sức
          </ButtonType>
          <ButtonType
            option="option2"
            activeOption={activeOption}
            onClick={setActiveOption}
          >
            Kim cương
          </ButtonType>
          <ButtonType
            option="option3"
            activeOption={activeOption}
            onClick={setActiveOption}
          >
            Vàng, bạc
          </ButtonType>
        </div>
        <div className={classes["content-left"]}>
          <InvoiceList listProducts={filterProduct} />
        </div>
      </div>
      <div className={classes["container-right"]}>
        <p className={classes.tittle}>Thông tin đơn hàng</p>
        <div className={classes["content-right"]}>
          <p className={classes.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.It is a long established
            fact that a reader will be distracted by the readable content of a
            page when looking at its layout. The point of using Lorem Ipsum is
            that it has a more-or-less normal distribution of letters, as
            opposed to using 'Content here, content here', making it look like
            readable English. Many desktop publishing packages and web page
            editors now use Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' will uncover many web sites still in their
            infancy. Various versions have evolved over the years, sometimes by
            accident, sometimes on purpose (injected humour and the like)
          </p>
        </div>
        <div className={classes.inforBar}>
          <InformationBar />
        </div>
      </div>
    </div>
  );
};

export default CategoryType;
