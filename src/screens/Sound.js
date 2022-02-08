import { IonContent, IonPage } from '@ionic/react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Scroll } from '../components/StyledComponents';

let frequencies = [250, 1450, 750, 5050];

const Sound = () => {
  useEffect(() => {
    soundFrequencies();
  }, []);

  async function soundFrequencies() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.start(0);
    await frequencies.forEach(async (freq, i) => {
      setTimeout(() => {
        oscillator.frequency.value = freq;
      }, 600 * i);
    });
    oscillator.stop(0.6 * 4);
  }

  return (
    <IonPage>
      <IonContent>
        <Scroll>
          <h1>Sounding</h1>
          <PlayButton onClick={() => soundFrequencies()}>Play</PlayButton>
        </Scroll>
      </IonContent>
    </IonPage>
  );
};

const PlayButton = styled.div`
  display: flex;
  margin: auto;
  margin-top: 300px;
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
