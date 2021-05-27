import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../Context';
import ElementModal from './ElementModal';

const Element = props => {
  const {
    symbol,
    name,
    atomic_mass,
    atomic_number,
    category,
    electronegativity,
    density,
    electron_affinity,
    boil_temperature,
    melt_temperature,
    radio,
  } = props;

  const { property, searchText, setElementModal, propertiesMaxVal } = useContext(Context);
  const [mouseOver, setMouseOver] = useState(false);

  const getGreen = () => {
    var greenPercentage = 1;
    var totalPercentages = 0;

    property.map((property, i) => {
      switch (property) {
        case 'Atomic Mass':
          totalPercentages = totalPercentages + atomic_mass / propertiesMaxVal[i];
          // greenPercentage = greenPercentage * (atomic_mass / propertiesMaxVal[i]);
          break;

        case 'Density':
          totalPercentages = totalPercentages + density / propertiesMaxVal[i];
          break;

        case 'Electronegativity':
          totalPercentages = totalPercentages + electronegativity / propertiesMaxVal[i];
          break;

        case 'Electron Affinity':
          totalPercentages = totalPercentages + electron_affinity / propertiesMaxVal[i];
          break;

        case 'Boil Temperature':
          totalPercentages = totalPercentages + boil_temperature / propertiesMaxVal[i];
          break;

        case 'Melt Temperature':
          totalPercentages = totalPercentages + melt_temperature / propertiesMaxVal[i];
          break;
      }
    });
    greenPercentage = totalPercentages / property.length;
    return (1 - greenPercentage) * 255;
  };

  const isElementSearched = () => {
    if (searchText != '' && searchText != undefined && symbol && name) {
      if (
        symbol.toLowerCase().startsWith(searchText.toLowerCase()) ||
        name.toLowerCase().startsWith(searchText.toLowerCase())
      ) {
        if (property == 'Atomic Mass') return 'ff';
        else return '1';
      } else {
        if (property == 'Atomic Mass') return '30';
        else return '0.4';
      }
    } else {
      if (property == 'Atomic Mass') {
        if (mouseOver) return 'ff';
        else return '50';
      } else return '1';
    }
  };

  return (
    <>
      <ElementWrapper
        category={category}
        propertiesMaxVal={propertiesMaxVal}
        green={getGreen()}
        property={property}
        electronegativity={electronegativity}
        electron_affinity={electron_affinity}
        density={density}
        boil_temperature={boil_temperature}
        melt_temperature={melt_temperature}
        opacity={isElementSearched()}
        onClick={() => setElementModal(props)}
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <Row>
          <AtomicNumber>{atomic_number}</AtomicNumber>
          {/* SI ES PANTALLA MUY CHICA:  */}
          {window.screen.height < 670 && <Symbol>{symbol}</Symbol>}
        </Row>

        <Column>
          {/* SI ES PANTALLA GRANDE:  */}
          {window.screen.height > 671 && <Symbol>{symbol}</Symbol>}

          <Name>{name}</Name>

          <PropertyValue>
            {property == 'Atomic Mass' && atomic_mass?.toFixed(4)}
            {property == 'Density' && density?.toFixed(2)}
            {property == 'Electron Affinity' && electron_affinity?.toFixed(2)}
            {property == 'Boil Temperature' && boil_temperature?.toFixed(2)}
            {property == 'Melt Temperature' && melt_temperature?.toFixed(2)}
            {property == 'Electronegativity' && electronegativity?.toFixed(2)}
          </PropertyValue>
        </Column>
      </ElementWrapper>
    </>
  );
};

export default Element;

const ElementWrapper = styled.div`
  height: 13%;
  width: 100%;
  margin-bottom: 10%;
  transition: 0.3s ease-in;
  cursor: pointer;
  background: ${props => {
    if (props.property == 'Atomic Mass') {
      if (props.category == 'alkali metal') return `#ff0000${props.opacity}`;
      if (props.category == 'alkaline earth metal') return `#ff7700${props.opacity}`;
      if (props.category == 'transition metal') return `#ffff00${props.opacity}`;
      if (props.category == 'post-transition metal') return `#00ff00${props.opacity}`;
      if (props.category == 'metalloid') return `#00ffff${props.opacity}`;
      if (props.category == 'nonmetal') return `#6666ff${props.opacity}`;
      if (props.category == 'noble gas') return `#ff00ff${props.opacity}`;
      else return '#ddddddaa';
    } else {
      return `rgb(255, ${props.green}, 0 , ${props.opacity})`;
    }

    // console.log(
    //   `rgb(255, ${(1 - propertiesElementVal() / props.propertiesMaxVal) * 250}, 0 , ${
    //     props.opacity
    //   })`)
    // };
    // case 'Electronegativity':
    //   if (props.electronegativity == null) return '#ddddddaa';
    //   else return `rgb(255, ${(1 - props.electronegativity / 4) * 330}, 0 ,${props.opacity})`;
    //   break;

    // case 'Density':
    //   if (props.density == null) return '#ddddddaa';
    //   else return `rgb(255, ${(1 - props.density / 23) * 255}, 0, ${props.opacity})`;
    //   break;

    // case 'Electron Affinity':
    //   if (props.electron_affinity == null) return '#ddddddaa';
    //   else return `rgb(255, ${(1 - props.electron_affinity / 330) * 255}, 0, ${props.opacity})`;
    //   break;

    // case 'Boil Temperature':
    //   if (props.boil_temperature == null) return '#ddddddaa';
    //   else return `rgb(255, ${(1 - props.boil_temperature / 6500) * 255}, 0, ${props.opacity})`;
    //   break;

    // case 'Melt Temperature':
    //   if (props.melt_temperature == null) return '#ddddddaa';
    //   else return `rgb(255, ${(1 - props.melt_temperature / 3300) * 255}, 0, ${props.opacity})`;
    //   break;
  }};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  /* justify-content: space-around; */
`;

const Column = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  padding-top: 10px;
  padding-bottom: 10px;
  /* margin-top: -15px; */
`;
const Row = styled.div`
  width: 70%;
  padding-left: 13%;
  padding-right: 13%;
  padding-top: 13%;
  height: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AtomicNumber = styled.p`
  font-size: 1.5vh;
  /* font-size: 1.8vh; */
  font-size: 87%;
  font-weight: bold;
  /* height: 25px; */
  margin-right: auto;
`;

const Symbol = styled.p`
  /* font-size: 16px; */
  font-size: 2vh;
  font-weight: bold;
  margin: 0;
  display: flex;
  display: inline;
`;

const Name = styled.p`
  font-size: 10px;
  margin: 0;
`;

const PropertyValue = styled.p`
  font-size: 10px;
  margin: 0;
`;
