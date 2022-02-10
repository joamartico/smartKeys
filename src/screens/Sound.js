import { IonContent, IonInput, IonPage } from '@ionic/react';
import { play } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon, Scroll } from '../components/StyledComponents';

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

    oscillator.frequency.value = 10450;
    await timeout(soundDuration * 1);

    const textArr = Array.from(text);

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      console.log('charCode', charCode);
      const inverseCharCode = charCode * -1 + 127;

      if (i != 0 && textArr[i] == textArr[i - 1]) {
        oscillator.frequency.value = await 250;
        await timeout(soundDuration);
      }

      let freq = charCode == 32 ? 350 : 350 + inverseCharCode * 100;
      freq = freq > 7850 ? freq + 600 : freq;
      oscillator.frequency.value = await freq;
      await timeout(soundDuration);
    }

    oscillator.frequency.value = await 10550;
    await timeout(soundDuration * 3);

    oscillator.stop();
  }

  return (
    <IonPage>
      <IonContent>
        <Scroll>
          <h1>Sound</h1>

          <div>
            <TextInput
              type="text"
              placeholder="Write your text here"
              onIonChange={e => setText(e.detail.value)}
            />
          </div>

            <PlayButton onClick={() => soundFrequencies()}>
              <Icon icon={play} />
            </PlayButton>
        </Scroll>
      </IonContent>
    </IonPage>
  );
};

const TextInput = styled(IonInput)`
  background: white;
  border-radius: 20px;
  padding: 8px 15px !important;
  width: 90% !important;
margin-top: 150px;
`;

const PlayButton = styled.div`
  display: flex;
  margin: 0 auto;
margin-top: 80px;

  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
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
