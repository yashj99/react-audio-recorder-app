
//@ts-nocheck
import { useState, useRef } from 'react';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import './AudioRecorder.css';

function AudioRecorderWithNoLibrary() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder| null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = event => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = handleStopRecording;
    audioChunksRef.current = [];
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    const audioURL = URL.createObjectURL(audioBlob);
    setAudioURL(audioURL);
    setIsRecording(false);

    // Downloading the WAV file
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = audioURL;
    a.download = 'custom_audio.wav';
    document.body.appendChild(a);
    a.click();
    //window.URL.revokeObjectURL(audioURL);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
    } else {
      handleStartRecording();
    }
  };

  return (
    <div className='audio-recorder-main-container'>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <IconButton color="primary" onClick={handleToggleRecording}>
        {isRecording ? <StopCircleIcon />: <MicIcon />}
      </IconButton>
      {isRecording ? <p>Stop Recording</p> : <p>Click the mic to start recording</p>}
      {audioURL && <audio src={audioURL} controls />}
    </div>
    </div>
  );
}

export default AudioRecorderWithNoLibrary;