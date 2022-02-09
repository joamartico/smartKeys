import { IonContent, IonInput, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Scroll } from '../components/StyledComponents';

function timeout(ms) {
  return new Promise(fulfill => {
    setTimeout(fulfill, ms);
  });
}

// const soundDuration = 300;
const soundDuration = 120;

const Sound = () => {
  const [text, setText] = useState();

  async function soundFrequencies() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);

    oscillator.start(0);

    oscillator.frequency.value = 9950;
    await timeout(soundDuration * 1);

    const textArr = Array.from(text);

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const inverseCharCode = charCode * -1 + 127;

      if (i != 0 && textArr[i] == textArr[i - 1]) {
        oscillator.frequency.value = await 250;
        await timeout(soundDuration);
      }

      const freq = charCode == 32 ? 350 : 350 + inverseCharCode * 100;
      oscillator.frequency.value = await freq;
      await timeout(soundDuration);
    }

    oscillator.frequency.value = await 10050;
    await timeout(soundDuration * 3);

    oscillator.stop();
  }

  return (
    <IonPage>
      <IonContent>
        <Scroll>
          <h1>Sound</h1>
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
