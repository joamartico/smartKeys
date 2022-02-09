import { IonContent, IonPage, IonTitle } from '@ionic/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Scroll } from '../components/StyledComponents';

let analyser;

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
  let matchesInARow = 0;
  let analyzing = false;
  let text = '';

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const canvasCtx = canvas.getContext('2d');
    let lastFrequency;

    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then(stream => {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();

        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 512;
        // analyser.smoothingTimeConstant = 0.9;

        frameLooper();
      });

    function frameLooper() {
      window.requestAnimationFrame(frameLooper);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const myDataArray = new Float32Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      analyser.getFloatFrequencyData(myDataArray);

      const greatestOnIndex = getIndexOfGreatestElement(myDataArray);
      let _mainFrecuency = greatestOnIndex * (22050 / bufferLength);
      _mainFrecuency = Math.floor(_mainFrecuency / 100) * 100 + 50;
      setMainFrecuency(_mainFrecuency);

      if (_mainFrecuency == 13150) {
        analyzing = true;
      }

      if (analyzing) {
        if (_mainFrecuency < 13150 && lastFrequency != _mainFrecuency) {
          const newChar = String.fromCharCode(127 - (_mainFrecuency - 350) / 100);
          text += newChar;
          console.log('newChar: ', newChar);
        }

        if (_mainFrecuency === 13250) {
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
        const barHeight = (myDataArray[i] + 140) * 2;
        canvasCtx.fillRect(i * (barWidth + 1), canvas.height - barHeight / 2, 2, barHeight / 2);
      }
    }
  }, []);

  return (
    <IonPage>
      <IonContent>
        <Scroll>
          <h1>Listening</h1>
          <Canvas id="canvas" width="800" />
          <p>Main Frecuency: {mainFrecuency} Hz</p>
        </Scroll>
      </IonContent>
    </IonPage>
  );
};

export default Listen;

const Canvas = styled.canvas`
  width: 100%;
  height: 150px;
  margin: auto;
  background: #f2f2f6;
  background: #5553;
`;

const chars = [
  ' ',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'ñ',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '.',
  '?',
  '!',
  ':',
  '(',
  ')',
  '$',
];
