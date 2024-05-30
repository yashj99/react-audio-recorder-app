import AudioRecorderComponent from "./components/AudioRecorder";
import AudioRecorderWithNoLibrary from "./components/AudioRecorderWithNoLibrary";

function App() {
  return (
    <>
      <div style={{ display: "flex",flexDirection:'column'}}>
        <div>
          <h1> Audio Recorder with package</h1>
          <AudioRecorderComponent />
        </div>
        <div>
          <h1>Audio Recorder using Web Api</h1>
          <AudioRecorderWithNoLibrary />
        </div>
      </div>
    </>
  );
}

export default App;
