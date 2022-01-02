import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { useEffect, useMemo, useRef } from "react";
import { useCallback, useState } from "react/cjs/react.development";
import styled from "styled-components";

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

export function QrCodeScanner() {
  const videoRef = useRef(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [resultList, setResultList] = useState([]);

  const qrCodeReader = useMemo(() => new BrowserMultiFormatReader(), []);

  useEffect(() => {
    qrCodeReader.listVideoInputDevices().then((videoInputDevices) => {
      setSelectedDeviceId(videoInputDevices[0].deviceId);
      setVideoDevices(videoInputDevices);
    });
  }, [qrCodeReader]);

  const handleAddResult = useCallback((result) => {
    setResultList((currentList) => {
      if (currentList.indexOf(result) === -1) {
        return [result, ...currentList];
      }
      return currentList;
    });
  }, []);

  const handleDecode = useCallback(
    (result, err) => {
      if (result) {
        handleAddResult(result.text);
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error(err);
      }
    },
    [handleAddResult]
  );

  const startRecording = useCallback(() => {
    qrCodeReader.decodeFromVideoDevice(
      selectedDeviceId,
      videoRef.current,
      handleDecode
    );
  }, [handleDecode, qrCodeReader, selectedDeviceId]);

  const resetRecording = useCallback(() => {
    qrCodeReader.reset();
    setResultList([]);
  }, [qrCodeReader]);

  return (
    <div>
      <ButtonsWrapper>
        <button onClick={startRecording}>Start</button>
        <button onClick={resetRecording}>Reset</button>
        <select
          placeholder="Select video device..."
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
        >
          {videoDevices.map(({ label, deviceId }) => (
            <option key={label} value={deviceId}>
              {label}
            </option>
          ))}
        </select>
      </ButtonsWrapper>
      <video ref={videoRef} height="300"></video>
      <ul>
        {resultList.map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
    </div>
  );
}
