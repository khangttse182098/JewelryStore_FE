/* eslint-disable no-unused-vars */
function loadImg(productCode, setProductCode) {
  fetch(
    `http://mahika.foundation:8080/swp/api/file/download/${productCode}.jpg`
  )
    .then((res) => res.blob())
    .then((data) => {
      const imageUrl = URL.createObjectURL(data);
      setProductCode(imageUrl);
    })
    .catch((err) => "");
}

export default loadImg;
