import React, { useRef, useState } from 'react';
import { Image, File, Mic, X } from 'lucide-react';
import { ReactMic } from 'react-mic'; // npm install react-mic

const Attachments = ({
  onClose,
  onFileSelected,
  onImageSelected,
  onVoiceRecorded
}) => {
  const fileInputRef = useRef();
  const imageInputRef = useRef();
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);

  // Handle file selection
  const handleFileClick = () => fileInputRef.current.click();
  const handleImageClick = () => imageInputRef.current.click();

  // Handle file/image input
  const handleFileChange = (e) => {
    if (e.target.files.length) {
      onFileSelected && onFileSelected(e.target.files[0]);
      onClose();
    }
  };
  const handleImageChange = (e) => {
    if (e.target.files.length) {
      onImageSelected && onImageSelected(e.target.files[0]);
      onClose();
    }
  };

  // Voice recording handlers
  const startRecording = () => setRecording(true);
  const stopRecording = () => setRecording(false);
  const onStop = (recorded) => {
    setRecordedBlob(recorded);
    onVoiceRecorded && onVoiceRecorded(recorded.blob);
    onClose();
  };

  return (
    <div className="absolute right-4 bottom-full mb-2 bg-white rounded-lg shadow-lg overflow-hidden z-20">
      <div className="p-2">
        <button
          className="flex items-center space-x-2 hover:bg-gray-100 rounded p-2 w-full text-left text-gray-900"
          onClick={handleImageClick}
        >
          <Image size={18} />
          <span>Send Photo</span>
        </button>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <button
          className="flex items-center space-x-2 hover:bg-gray-100 rounded p-2 w-full text-left text-gray-900"
          onClick={handleFileClick}
        >
          <File size={18} />
          <span>Send File</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button
          className="flex items-center space-x-2 hover:bg-gray-100 rounded p-2 w-full text-left text-gray-900"
          onClick={startRecording}
        >
          <Mic size={18} />
          <span>Voice Message</span>
        </button>
      </div>
      {/* Voice recorder modal */}
      {recording && (
        <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-30 p-4">
          <div className="flex items-center mb-2">
            <Mic className="text-blue-600 animate-pulse mr-2" size={28} />
            <span className="text-blue-600 font-bold">Recording...</span>
          </div>
          <ReactMic
            record={recording}
            className="w-full"
            onStop={onStop}
            strokeColor="#1976d2"
            backgroundColor="#e3f2fd"
          />
          <div className="flex space-x-2 mt-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={stopRecording}
            >
              Stop
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              onClick={() => {
                setRecording(false);
                onClose();
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attachments;
