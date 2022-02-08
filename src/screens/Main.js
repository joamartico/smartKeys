import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButtons,
  IonButton,
  useIonRouter,
} from '@ionic/react';

import { useState, useEffect } from 'react';
import { useMoralisQuery } from 'react-moralis';
import styled from 'styled-components';
import Account from '../components/Account';
import Chain from '../components/Chain';
import NativeBalance from '../components/NativeBalance';
import { Padding, Scroll } from '../components/StyledComponents';
import useQuery from '../hooks/useQuery';

const Main = () => {
  const router = useIonRouter()

  

  return (
    <IonPage>
      <IonHeader>
        <Toolbar>
          <ToolbarButton width="55%">
            <Chain mobile /> <NativeBalance />
          </ToolbarButton>

          <ToolbarButton width="45%">
            <Account />
          </ToolbarButton>
        </Toolbar>
      </IonHeader>

      <IonContent className="scroll" fullscreen>
      

        <Options>
          <OptionButton onClick={() => router.push("/listen")}>Listen</OptionButton>
          <OptionButton onClick={() => router.push("/sound")}>Sound</OptionButton>
        </Options>

      </IonContent>
    </IonPage>
  );
};

export default Main;

const Options = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  align-items: center;
`;

const OptionButton = styled.div`
  width: 80%;
  height: 17%;
  border-radius: 20px;
  background-color: #ddd4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3% auto;
  max-width: 500px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const ToolbarButton = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  /* font-weight: 500;
  font-family: Roboto, sans-serif;
  font-size: 14px; */
  width: ${({ width }) => width || '100%'};
  padding: 0 10px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  /* font-weight: 500;
  font-family: Roboto, sans-serif;
  font-size: 14px; */
  width: 100%;
  z-index: 999999999999;
  height: 70px !important;
  backdrop-filter: blur(17px);
  -webkit-backdrop-filter: blur(17px);
  border-bottom: solid 1px #90909050;

  --background: none !important; /* COLOR DE LA BARRA DE ARRIBA CON ITEMS*/
  background: var(--blur-color) !important; /* COLOR DE TODA LA BARRA */
`;
