import React from 'react';
import styled from 'styled-components';

const buttonColor = {
  blue: {
    default: '#3f51b5',
    hover: '#283593'
  },
  red: {
    default: '#e91e63',
    hover: 'ad1457'
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  buttonColor: 'blue'
};

const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1; 
  `}
`;

const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

const TabGroup = () => {
  const [active, setActive] = useState(types[0]);
  return (
    <>
      <div>
        {types.map((type) => (
          <Tab key={type} active={active === type} onClick={() => setActive(type)}>
            {type}
          </Tab>
        ))}
      </div>
      <p />
      <p> Your Table: {active} </p>
    </>
  );
};

const types = ['Active', 'Inactive'];

const ToggleGroup = () => {
  const [active, setActive] = useState(types[0]);
  return (
    <div>
      {types.map((type) => (
        <ButtonToggle active={active === type} onClick={() => setActive(type)}>
          {type}
        </ButtonToggle>
      ))}
    </div>
  );
};

const ButtonTheme = () => {
  return (
    <>
      <div>
        <Button onClick={clickMe}>Button</Button>
      </div>
      <div>
        <Button buttonColor="red" onClick={clickMe}>
          Red theme
        </Button>
      </div>
      <div>
        <Button disabled onClick={clickMe}>
          Disabled
        </Button>
      </div>
      <a href="#" target="_blank">
        <Button>Link</Button>
      </a>
      <ToggleGroup />
      <TabGroup />
    </>
  );
};

export default ButtonTheme();
