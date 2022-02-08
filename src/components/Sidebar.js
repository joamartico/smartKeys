import { useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Account from "./Account";
import Chain from "./Chain";
import NativeBalance from "./NativeBalance";
import { Icon, Padding, Row } from './StyledComponents';

const Sidebar = ({ tabs }) => {
  const [actualUrl, setActualUrl] = useState();
  const router = useIonRouter();

  useEffect(() => {
    setActualUrl(router.routeInfo.pathname);
  }, [router.routeInfo.pathname]);


    return (
      <Wrapper  className="Sidebar">
        <Padding>
        <Row h={120}>
          <Image src="/icon.png" alt="icon" />
          <AppTitle>App Title</AppTitle>
        </Row>

        <WalletAccount>
          <Account />
          <Row>
            <Chain />
            <NativeBalance />
          </Row>
        </WalletAccount>

          {tabs.map((tab, index) => (
          <Tab
            active={tab.url == actualUrl}
            key={index}
            onClick={() => router.push(tab.url, 'none', 'replace')}
          >
            <Icon
              icon={tab.icon}
              marginRight={8}
              size={24}
              mode="ios"
              fill="outline"
              
            />{' '}
            {tab.label}
          </Tab>
        ))}
        </Padding>
      </Wrapper>
    );

};

export default Sidebar;

const Wrapper = styled.div`
  background: var(--sidebar-color);
  /* background: none !important; */
  /* backdrop-filter: blur(35px); */
  width: 300px;
  height: 100%;
  top: 0;
  z-index: 9999999;
  border-right: solid 1px var(--border-color);
`;

const Tab = styled.div`
  background: ${({ active }) => (active ? 'var(--sidebar-active-color)' : 'none')};
  /* color: #454545; */
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding-left: 8px;
  cursor: pointer;
  font-size: 16px;
`;


const AppTitle = styled.h1`
  /* margin-top: 5%; */
  font-size: 38px;
  font-weight: 700;
`;

const Image = styled.img`
  width: 75px;
  height: 75px;
  object-fit: cover;
  display: flex;
  margin-right: 10px;
`;

const WalletAccount = styled.div`
  margin-bottom: 40px;
  margin-top: -10px;
  width: 100%;
`;