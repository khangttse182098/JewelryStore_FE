import { Html5QrcodeScanner } from "html5-qrcode";
import { forwardRef, useEffect, useState } from "react";
import classes from "./ScanningPage.module.css";

const ScanningPage = forwardRef(function ScanningPage(
  { handleHide, setInputValue },
  ref
) {
  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 60,
      qrbox: 250,
    });

    const success = (decodedText, decodedResult) => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear scanner: ", error);
      });
      setInputValue(decodedText); // Set the input value and trigger the onChange event
      html5QrcodeScanner.clear();
      handleHide(); // Close the scanning window
    };

    const error = (err) => {
      console.warn(err);
    };

    html5QrcodeScanner.render(success, error);

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear scanner on unmount: ", error);
      });
    };
  }, [handleHide, setInputValue]);

  return (
    <dialog ref={ref} className={classes.container}>
      <div>
        <p className={classes.close} onClick={handleHide}>
          &times;
        </p>
      </div>
      <div id="reader" style={{ height: "490px", width: "600px" }}></div>
    </dialog>
  );
});

export default ScanningPage;
