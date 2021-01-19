import styled from 'styled-components';


export const CategoriesOuter = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  filter: drop-shadow(0px 2px 14.5px rgba(57,57,57,0.2));
  background-color: rgba(0, 0, 0, 0.2);
`;

export const CategoriesInner = styled.div`
  box-sizing: border-box;
  padding: 0 10px 10px 10px;
  display: flex;
  min-width: 684px;
  height: 100vh;
  filter: drop-shadow(0px 2px 14.5px rgba(57,57,57,0.2));
  background-color: #ffffff;
`;


export const MainMenuItemsWrapper = styled.div`
  box-sizing: border-box;
  border-right: 2px solid #cccccc;
  margin-right: 2px;
`;
export const MainMenuItem = styled.div`
  padding-left:10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background: transparent;
  background: ${({ isActived }) => (isActived ? '#cccccc' : 'transparent')};
  text-decoration: ${({ isActived }) => (isActived ? 'underline' : 'none')};
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  margin-bottom: 10px;
  height: 70px;
  font-size: 20px;
  font-weight: 600;
`;

export const ProductsTitle = styled.div`
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  height: 70px;
  margin-left: 20px;
  margin-bottom: 10px;
`;

export const ContentLeftSection = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 250px;
  border-right: 1px solid #cccccc;
`;

export const CloseAllCateGoriesIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const ContentMiddleSection = styled.div`
  padding-left: 10px;
`;

export const SubmenuItemOuter = styled.div`
  background-color: ${({ isExpanded }) => (isExpanded ? '#aaaaaa' : 'transparent')};
  border-radius: ${({ isExpanded }) => (isExpanded ? '5px' : '0')};
`;
export const SubmenuItemInner = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
`;

export const SubmenuItem = styled.div`
  width: 300px;
  padding: 4px 0;
  font-weight: ${({ isExpanded }) => (isExpanded ? '600' : '400')};
`;

export const ContentRightSection = styled.div`
  box-sizing: border-box;
`;

export const LastMenuItem = styled.div`
  font-weight: 600;
  font-size: 13px;
  margin-left: 25px;
`;