import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

const ScanningPage = () => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
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
    <div>
      <h1>QR Code Scanning in React</h1>
      {scanResult ? (
        <div>
          Success: <a href={scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader" style={{ width: "600px" }}></div>
      )}
    </div>
  );
};

export default ScanningPage;
