import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef();

  const [result, setResult] = useState("");

  useEffect(() => {
    if (!result) return;
    let url;
    try {
      url = new URL(result);
    } catch (err) {
      console.log(err);
      return false;
    }
    window.location.href = url;
  }, [result]);

  function launchQR() {
    setResult("loading module...");
    import("qr-scanner").then((module) => {
      let id;
      setResult("module loaded");
      let QrScanner = module.default;
      const qrScanner = new QrScanner(videoRef.current, (result) => {
        setResult(result);
        qrScanner.stop();
        clearInterval(id);
      });
      setResult("Looking for results");
      qrScanner.start();
      id = setInterval(() => {
        setResult("no result found :(");
        qrScanner.stop();
      }, 5000);
    });
  }

  return (
    <div className={styles.container}>
      <h1>QR Code Reader</h1>
      <h2>{result}</h2>
      <button onClick={launchQR}>Launch</button>
      <video width="500" height="500" ref={videoRef} />
    </div>
  );
}
