import styled from 'styled-components';
import widgetLogo from '../../assets/widget-logo.png';
import { Filters } from '../Filters';

export function Header() {
  return (
    <HeaderContainer>
      <StyledLogo src={widgetLogo} alt="logo" />
      <Filters />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  padding: 0 152px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const StyledLogo = styled.img`
  max-width: 300px;
  user-select: none;

  @media (max-width: 930px) {
    margin-bottom: 20px;
  }
`;
