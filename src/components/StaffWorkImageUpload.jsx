// src/components/StaffWorkImageUpload.jsx
import React, { useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import Webcam from "react-webcam";

const StaffWorkImageUpload = ({ taskId, onImageUploaded }) => {
  const [uploadType, setUploadType] = useState("before");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);

  const webcamRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCapturedImage(URL.createObjectURL(file));
  };

  const captureWebcamImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowWebcam(false);
  };

  const uploadToFirebase = async (fileOrBlob, filename) => {
    const storageRef = ref(storage, `staff-work/photos/${filename}`);
    await uploadBytes(storageRef, fileOrBlob);
    return await getDownloadURL(storageRef);
  };

  const handleUpload = async () => {
    if (!capturedImage) return;
    setUploading(true);
    try {
      let blob;
      if (capturedImage.startsWith("blob:")) {
        const response = await fetch(capturedImage);
        blob = await response.blob();
      } else {
        const response = await fetch(capturedImage);
        blob = await response.blob();
      }

      const filename = `${taskId}_${uploadType}_${Date.now()}.jpg`;
      const url = await uploadToFirebase(blob, filename);

      const token = localStorage.getItem("token");
      const endpoint = `http://localhost:5000/api/housekeeping/tasks/${taskId}/images/${uploadType}`;
      await axios.post(
        endpoint,
        { imageUrls: [url] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (onImageUploaded) {
        onImageUploaded(taskId, uploadType, [url]);
      }

      setMessage(`${uploadType} image uploaded!`);
      setCapturedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4 p-4 border border-border rounded-lg bg-background/50">
      <h4 className="font-semibold mb-3 text-text">
        Upload {uploadType} Photo
      </h4>

      {/* Upload type selector */}
      <div className="flex space-x-2 mb-3">
        <button
          className={`px-3 py-1 rounded-lg font-medium transition-colors ${
            uploadType === "before"
              ? "bg-primary text-text"
              : "bg-white border border-border text-text/70 hover:bg-background"
          }`}
          onClick={() => setUploadType("before")}
        >
          Before
        </button>
        <button
          className={`px-3 py-1 rounded-lg font-medium transition-colors ${
            uploadType === "after"
              ? "bg-primary text-text"
              : "bg-white border border-border text-text/70 hover:bg-background"
          }`}
          onClick={() => setUploadType("after")}
        >
          After
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="mb-3 w-full text-sm text-text file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary file:text-text hover:file:bg-primary"
      />

      {!showWebcam ? (
        <button
          className="text-sm text-primary underline hover:text-hover mb-3"
          onClick={() => setShowWebcam(true)}
        >
          Use Webcam Instead
        </button>
      ) : (
        <div className="my-3">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full h-40 rounded-lg border border-border"
          />
          <button
            onClick={captureWebcamImage}
            className="w-full mt-2 py-2 bg-primary text-text rounded-lg hover:bg-hover transition-colors font-medium"
          >
            Capture
          </button>
        </div>
      )}

      {capturedImage && (
        <div className="my-3">
          <img
            src={capturedImage}
            alt="Preview"
            className="w-full h-24 object-cover rounded-lg border border-border"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !capturedImage}
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {uploading ? "Uploading..." : `Upload ${uploadType} Photo`}
      </button>

      {message && (
        <p
          className={`text-sm mt-2 ${
            message.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default StaffWorkImageUpload;
