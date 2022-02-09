import { IonContent, IonInput, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Scroll } from '../components/StyledComponents';

let frequencies = [350, 1450, 750, 5050];

const Sound = () => {
  const [text, setText] = useState();

  // useEffect(() => {
  //   soundFrequencies();
  // }, []);

  async function soundFrequencies() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);

    oscillator.start(0);

    // await setTimeout(() => {
      oscillator.frequency.value = 13050;
    // }, 150);

    await Array.from(text).map((char, i) => {
      console.log('char: ', char);
      const charCode = char.charCodeAt(0);
      console.log('charCode: ', charCode);

      setTimeout(() => {
        const freq = 350 + chars.indexOf(char) * 100;
        oscillator.frequency.value = freq;
      }, 300 * (i + 1));


      setTimeout(() => {
        oscillator.frequency.value = i == text.length - 1 && 13150;
      }, 300 * (i + 2));
    });
    

    // await frequencies.forEach(async (freq, i) => {
    //   setTimeout(() => {
    //     oscillator.frequency.value = freq;
    //   }, 150 * i);
    // });



    oscillator.stop(0.30 * (text.length + 2));
  }

  return (
    <IonPage>
      <IonContent>
        <Scroll>
          <h1>Sounding</h1>
          <TextInput
            type="text"
            placeholder="Write your text here"
            onIonChange={e => setText(e.detail.value)}
          />
          <PlayButton onClick={() => soundFrequencies()}>Play</PlayButton>
        </Scroll>
      </IonContent>
    </IonPage>
  );
};

const TextInput = styled(IonInput)`
  background: white;
  border-radius: 20px;
  padding: 8px !important;
  width: 95% !important;
`;

const PlayButton = styled.div`
  display: flex;
  margin: auto;
  margin-top: 20%;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 10%;
  background-color: #f5f5f550;
  box-shadow: 0px 0px 10px #000000;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  font-size: 1.5rem;
  font-weight: bold;
`;

export default Sound;

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
