import { IonContent, IonPage, IonTitle } from '@ionic/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Scroll } from '../components/StyledComponents';

let analyser;

let frequencies = [250, 1450, 750, 5050];

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
  // const [matchesInARow, setMatchesInARow] = useState(0);
  let matchesInARow = 0;

  function areSimilarFrequencies(frequencyA, frequencyB) {
    console.log('match freq A: ', frequencyA, 'with freq B', frequencyB);
    const diff = Math.abs(frequencyA - frequencyB);
    console.log('match diff: ', diff);
    if (diff < 50) {
      console.log('MATCH');
      return true;
      // setMatchesInARow(prev => prev + 1);
      // matchesInARow++;
    } else {
      return false;
      // setMatchesInARow(0);
      // matchesInARow = 0;
    }
  }

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const canvasCtx = canvas.getContext('2d');

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
        analyser.smoothingTimeConstant = 0.9;

        setInterval(() => {
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          const myDataArray = new Float32Array(bufferLength);
          analyser.getByteFrequencyData(dataArray);
          analyser.getFloatFrequencyData(myDataArray);

          console.log('dataArray', dataArray);
          console.log('myDataArray', myDataArray);
          // const _mainFrecuency = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          // hay n barras desde 20 a 19367 hz
          // cada barra abarca (19347 / n) hz
          // greatestOnIndex * lo que abarca cada barra = mainFrecuency

          const greatestOnIndex = getIndexOfGreatestElement(myDataArray);
          const _mainFrecuency = greatestOnIndex * (22050 / myDataArray.length);
          //   const _mainFrecuency = (greatestOnIndex + 1) * 20;
          setMainFrecuency(_mainFrecuency);

          canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
          canvasCtx.fillStyle = '#ad4';

          const barWidth = canvas.width / bufferLength - 1;
          let posX = 0;

          for (let i = 0; i < bufferLength; i++) {
            // const barHeight = myDataArray[i];
            const barHeight = (myDataArray[i] + 140) * 2;
            // canvasCtx.fillRect(i * 5, canvas.height - barHeight / 2, 4, barHeight / 2);
            canvasCtx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
            posX += barWidth + 1;
          }

          if (areSimilarFrequencies(_mainFrecuency, frequencies[matchesInARow])) {
            // setMatchesInARow(prev => prev + 1);
            matchesInARow++;
          } else {
            if (
              matchesInARow != 0 &&
              areSimilarFrequencies(_mainFrecuency, frequencies[matchesInARow - 1])
            ) {
              return;
            }
            // setMatchesInARow(0);
            matchesInARow = 0;
          }
          console.log('matchesInARow', matchesInARow);
        }, 100);

        // frameLooper();
      });

    function frameLooper() {
      window.requestAnimationFrame(frameLooper);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const myDataArray = new Float32Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      analyser.getFloatFrequencyData(myDataArray);

      console.log('dataArray', dataArray);
      console.log('myDataArray', myDataArray);
      // const _mainFrecuency = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      // hay n barras desde 20 a 19367 hz
      // cada barra abarca (19347 / n) hz
      // greatestOnIndex * lo que abarca cada barra = mainFrecuency

      const greatestOnIndex = getIndexOfGreatestElement(myDataArray);
      const _mainFrecuency = greatestOnIndex * (22050 / myDataArray.length);
      //   const _mainFrecuency = (greatestOnIndex + 1) * 20;
      setMainFrecuency(_mainFrecuency);

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.fillStyle = '#ad4';

      const barWidth = canvas.width / bufferLength - 1;
      let posX = 0;

      for (let i = 0; i < bufferLength; i++) {
        // const barHeight = myDataArray[i];
        const barHeight = (myDataArray[i] + 140) * 2;
        // canvasCtx.fillRect(i * 5, canvas.height - barHeight / 2, 4, barHeight / 2);
        canvasCtx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
        posX += barWidth + 1;
      }

      setInterval(() => {
        if (areSimilarFrequencies(_mainFrecuency, frequencies[matchesInARow])) {
          // setMatchesInARow(prev => prev + 1);
          matchesInARow++;
        } else {
          if (
            matchesInARow != 0 &&
            areSimilarFrequencies(_mainFrecuency, frequencies[matchesInARow - 1])
          ) {
            return;
          }
          // setMatchesInARow(0);
          matchesInARow = 0;
        }
        console.log('matchesInARow', matchesInARow);
      }, 10000);
    }
  }, []);

  return (
    <IonPage>
      <IonContent>
        <Scroll>
          <h1>Listening</h1>
          <Canvas id="canvas"></Canvas>
          <p>Main Frecuency: {mainFrecuency} Hz</p>
          {/* <p>Matches in a row: {matchesInARow}</p> */}
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
