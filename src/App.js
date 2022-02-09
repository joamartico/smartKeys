import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { MoralisProvider, useMoralis } from 'react-moralis';
import { Redirect, Route } from 'react-router-dom';
import Context from './Context';
import Main from './screens/Main';


import { useEffect } from 'react';
import { bookmark, home, person, search } from 'ionicons/icons';
import Listen from './screens/Listen';
import Sound from './screens/Sound';

const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    if (window.ethereum) {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    } else {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
        enableWeb3({ provider: 'walletconnect' });
    }
  }, [isAuthenticated, isWeb3Enabled]);
  
  return (
    <Context>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route path="/main" component={Main} />
            <Route path="/listen" component={Listen} />
            <Route path="/sound" component={Sound} />
            <Route render={() => <Redirect to="/main" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Context>
  );
};

export default App;
