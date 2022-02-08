import { useNativeBalance } from 'react-moralis';
import styled from 'styled-components';

function NativeBalance() {
  const { data: balance } = useNativeBalance('ETH');

  return <RoundedDiv>{balance.formatted}</RoundedDiv>;
}

export default NativeBalance;

const RoundedDiv = styled.div`
  height: 42px;
  background-color: #f5f5f5;
  /* background-color: var(--background-color, #f5f5f5); ); */
  background-color: #f2f2f6;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  white-space: 'nowrap';
  border-radius: 14px;
  color: #000;
  z-index: -1;
  font-size: 13px;
  width: 100%;
  padding-left: 40px;
  margin-left: -40px;
`;
