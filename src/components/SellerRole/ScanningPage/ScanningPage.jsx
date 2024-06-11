import { Html5QrcodeScanner } from "html5-qrcode";
import { forwardRef, useEffect, useState } from "react";
import classes from "./ScanningPage.module.css";

const ScanningPage = forwardRef(function ScanningPage(props, ref) {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 60,
      qrbox: 250,
    });

    const success = (decodedText, decodedResult) => {
      console.log(`Code scanned = ${decodedText}`, decodedResult);
      setScanResult(decodedText);
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear scanner: ", error);
      });
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
  }, []);

  return (
    <dialog ref={ref} className={classes.container}>
      {scanResult ? (
        <div>
          Success: <a href={scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader" style={{ height: "490px", width: "600px" }}></div>
      )}
    </dialog>
  );
});

export default ScanningPage;
