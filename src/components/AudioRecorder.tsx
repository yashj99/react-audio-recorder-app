
import { useState } from 'react';;
import {AudioRecorder} from 'react-audio-voice-recorder';
import './AudioRecorder.css';

function AudioRecorderComponent() {
  const [audioURL, setAudioURL] = useState('');

  const addAudioElement = (blob:Blob) => {
    const url = URL.createObjectURL(blob);
    setAudioURL(url);

    // Download the WAV file
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'audio_with_lib.wav';
    document.body.appendChild(a);
    a.click();
    //window.URL.revokeObjectURL(url);
  };

  return (
    <div className='audio-recorder-main-container'>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
      />
      <div>
        {audioURL && <audio src={audioURL} controls />}
      </div>
    </div>
  );
}

export default AudioRecorderComponent;
