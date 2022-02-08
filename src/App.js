import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { MoralisProvider, useMoralis } from 'react-moralis';
import { Redirect, Route } from 'react-router-dom';
import Context from './Context';
import Main from './screens/Main';
import Tabs from './components/Tabs';

import { useEffect } from 'react';
import { bookmark, home, person, search } from 'ionicons/icons';
import Listen from './screens/Listen';
import Sound from "./screens/Sound";

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
            <Route path="/listen" component={Listen} />
            <Route path="/sound" component={Sound} />
            <Route
              path="/tabs"
              render={() => (
                <Tabs
                  tabs={[
                    {
                      url: '/tabs/main',
                      label: 'Main',
                      component: Main,
                      icon: home,
                    },
                    {
                      url: '/tabs/search',
                      label: 'Search',
                      component: Main,
                      icon: search,
                    },
                    {
                      url: '/tabs/favs',
                      label: 'Favs',
                      component: Main,
                      icon: bookmark,
                    },
                    {
                      url: '/tabs/user',
                      label: 'User',
                      component: Main,
                      icon: person,
                    },
                  ]}
                />
              )}
            />
            <Route render={() => <Redirect to="/tabs/main" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Context>
  );
};

export default App;
