import styled from 'styled-components';

export const HEADER_MENU_INDEX = 8;

export const SubmenuWrapper = styled.div`
  position: absolute;
  top:99%;
  ${({ menuIndex }) => menuIndex > HEADER_MENU_INDEX ? 'right:0;' : ''}
  display:flex;
  min-height: 381px;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 14.5px rgba(57,57,57,0.2));
  background-color: #ffffff;
`;

export const SubmenuLeftSection = styled.div`
  box-sizing: border-box;
  padding: 10px;
  width: 300px;
  height: ${({ height }) => height > 0 ? `${height}px` : 'auto'};
  border-right: 3px solid #cccccc;
`;

export const SubmenuRightSection = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height > 0 ? `${height}px` : 'auto'};
  min-width:200px;
  padding: 30px;
`;

export const SubenItem = styled.div`
  padding-left:10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  border-radius: 5px;
  background: ${({ isActived }) => (isActived ? '#cccccc' : 'transparent')};
`;

export const RightSectionHeader = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-weight: 500;
  border-bottom: 2px solid #aaaaaa;
`;

export const RightSectionContent = styled.div`
  display: flex;
`;
export const ContentLeft = styled.div`
  display: flex;
`;
export const ContenRight = styled.div`
  display: flex;
`;

export const LastMenuColumns = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ index }) => (index > 0 ? '20px' : '0')};
`;
export const LastMenuItem = styled.span`
  margin: 10px 0;
  width: 200px;
  color: #ccc;
  &:hover {
    cursor: pointer;
    text-decoration: underline #ccc;
  }
`;