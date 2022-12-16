import { IonContent, IonIcon, IonPage, IonTitle } from '@ionic/react';
import { mic, micOff } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon, Scroll } from '../components/StyledComponents';

let analyser, source, audioContext, canvas, canvasCtx;

function getIndexOfGreatestElement(array) {
  let max = array[0];
  let index = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
      index = i;
    }
  }
  return index;
}

const Listen = () => {
  const [mainFrecuency, setMainFrecuency] = useState(0);
  const [recording, setRecording] = useState(false);
  let analyzing = false;
  let text = '';
  let lastFrequency;

  function toggleRecording() {
    if (recording) {
      analyser.disconnect();
      source.disconnect();
      // window.cancelAnimationFrame(frameLooper);
      setRecording(false);
    } else {
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      analyser.fftSize = 512;
      frameLooper();
      setRecording(true);
    }
  }

  useEffect(() => {
    canvas = document.getElementById('canvas');
    canvasCtx = canvas.getContext('2d');
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then(stream => {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();

        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 512;
        // analyser.smoothingTimeConstant = 0.9;

        setRecording(true);

        frameLooper();
      });
  }, []);

  function frameLooper() {
    window.requestAnimationFrame(frameLooper);

    const bufferLength = analyser.frequencyBinCount;
    // const dataArray = new Uint8Array(bufferLength);
    const freqArray = new Float32Array(bufferLength);
    // analyser.getByteFrequencyData(dataArray);
    analyser.getFloatFrequencyData(freqArray);

    const greatestOnIndex = getIndexOfGreatestElement(freqArray);
    let _mainFrecuency = greatestOnIndex * (22050 / bufferLength);
    _mainFrecuency = Math.floor(_mainFrecuency / 100) * 100 + 50;
    setMainFrecuency(_mainFrecuency);

    if (_mainFrecuency == 9650) { // antes era 10450
      analyzing = true;
      console.log('analyzing')
    }

    if (analyzing && _mainFrecuency != 250) {
      if (lastFrequency != _mainFrecuency && _mainFrecuency < 10450) {
        const charCode =
          127 - ((_mainFrecuency > 7850 ? _mainFrecuency - 600 : _mainFrecuency) - 350) / 100;
        let newChar = String.fromCharCode(charCode);
        console.log(charCode)
        newChar = _mainFrecuency == 350 ? ' ' : newChar;
        text += newChar;
        console.log('newChar: ', newChar);
      }

      if (_mainFrecuency === 9750) { // antes era 10550
        alert(text);
        analyzing = false;
        text = '';
      }
    }

    lastFrequency = _mainFrecuency;

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = '#ad4';

    const barWidth = 2;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (freqArray[i] + 140) * 2;
      canvasCtx.fillRect(i * (barWidth + 1), canvas.height - barHeight / 2, 2, barHeight / 2);
    }
  }

  return (
    <IonPage>
      <IonContent>
        <Scroll>
          <h1>Listening</h1>

          <Graph>
            <Canvas id="canvas" width="800" />
            <p>Main Frecuency: {mainFrecuency} Hz</p>
          </Graph>

          <Microphone icon={recording ? mic : micOff} size={30} iconColor="black" onClick={() => toggleRecording()} />
        </Scroll>
      </IonContent>
    </IonPage>
  );
};

export default Listen;

const Graph = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const Microphone = styled(Icon)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  margin: auto;
  padding: 15px;
  margin-top: 100px;

`;

const Canvas = styled.canvas`
  width: 100%;
  height: 150px;
  margin: auto;
  background: #f2f2f6;
  background: #5553;
`;
