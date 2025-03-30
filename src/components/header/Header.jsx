import styled from 'styled-components';
import widgetLogo from '../../assets/widget-logo.png';

export function Header() {
  return (
    <HeaderContainer>
      <StyledLogo src={widgetLogo} alt="logo" />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled.img`
  max-width: 300px;
  user-select: none;

  @media (max-width: 930px) {
    margin-bottom: 20px;
  }
`;
