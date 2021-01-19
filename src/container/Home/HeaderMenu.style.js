import styled from 'styled-components';

export const HeaderMenuWrapper = styled.div`
  position: relative;
  display: flex;
  height: 60px;
`;

export const HeaderMenuInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  height:100%;
`;

export const HeaderMenuItem = styled.div`
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 10px;
  height: 100%;
  cursor: default;
  &:nth-child(n+2):hover > span {
    border-bottom: 1px solid #000000;
  }
  &:nth-child(1) {
    cursor: pointer;
  }
`;