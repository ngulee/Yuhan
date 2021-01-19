import React, { useState } from 'react';
import styled from 'styled-components';
import { IconChevronRight, IconPlus, IconMinus, IconX } from '@tabler/icons';
import Products from '../Products';
import FavorateProducts from '../FavorateProducts/FavorateProducts';


const CategoriesOuter = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  filter: drop-shadow(0px 2px 14.5px rgba(57,57,57,0.2));
  background-color: rgba(0, 0, 0, 0.2);
`;

const CategoriesInner = styled.div`
  box-sizing: border-box;
  padding: 0 10px 10px 10px;
  display: flex;
  min-width: 684px;
  height: 100vh;
  filter: drop-shadow(0px 2px 14.5px rgba(57,57,57,0.2));
  background-color: #ffffff;
`;


const MainMenuItemsWrapper = styled.div`
  box-sizing: border-box;
  border-right: 2px solid #cccccc;
  margin-right: 2px;
`;
const MainMenuItem = styled.div`
  padding-left:10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background: transparent;
  background: ${({ isActived }) => (isActived ? '#cccccc' : 'transparent')};
  text-decoration: ${({ isActived }) => (isActived ? 'underline' : 'none')};
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  margin-bottom: 10px;
  height: 70px;
  font-size: 20px;
  font-weight: 600;
`;

const ProductsTitle = styled.div`
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  height: 70px;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const ContentLeftSection = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 250px;
  border-right: 1px solid #cccccc;
`;

const CloseAllCateGoriesIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ContentMiddleSection = styled.div`
  padding-left: 10px;
`;

const SubmenuItemOuter = styled.div`
  background-color: ${ ({ isExpanded }) => (isExpanded ? '#aaaaaa' : 'transparent')};
  border-radius: ${ ({ isExpanded }) => (isExpanded ? '5px' : '0')};
`;
const SubmenuItemInner = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
`;

const SubmenuItem = styled.div`
  width: 300px;
  padding: 4px 0;
  font-weight: ${ ({ isExpanded }) => (isExpanded ? '600' : '400')};
`;

const ContentRightSection = styled.div`
  box-sizing: border-box;
`;

const LastMenuItem = styled.div`
  font-weight: 600;
  font-size: 13px;
  margin-left: 25px;
`;

const defaultValue = { taxonomyName: '', children: [] };

const Index = ({ headerMenu = [], onClose = () => {} }) => {

  const [activeMenuItem, setActiveMenuItem] = useState(defaultValue);

  const handleToggleSubmenItem = (subIndex, isExpanded) => {
    const deepCloneMenuItem = JSON.parse(JSON.stringify(activeMenuItem))
    deepCloneMenuItem.children[subIndex].isExpanded = isExpanded;
    setActiveMenuItem(deepCloneMenuItem);
  }

  if (headerMenu.length === 0) return null;


  return (
    <CategoriesOuter className='outer'>
      <CategoriesInner className='inner'>
        <ContentLeftSection>
          <CloseAllCateGoriesIconWrapper>
            <IconX size={27} onClick={onClose} />
          </CloseAllCateGoriesIconWrapper>
          <SectionTitle>Shop Categories</SectionTitle>
          <MainMenuItemsWrapper>
            {
              headerMenu.map((menu) => {
                const { taxonomyName } = menu;
                return (
                  <MainMenuItem
                    key={taxonomyName}
                    isActived={activeMenuItem.taxonomyName === taxonomyName}
                    onMouseEnter={() => setActiveMenuItem(menu)}
                  >
                    <span>{taxonomyName}</span>
                    <div style={{
                      flexShrink: 0
                    }}>
                      <IconChevronRight size={24} />
                    </div>
                  </MainMenuItem>
                )
              })
            }
          </MainMenuItemsWrapper>
        </ContentLeftSection>
        {
          activeMenuItem.taxonomyName ? (
            <ContentMiddleSection>
              <SectionTitle>{activeMenuItem.taxonomyName}</SectionTitle>
              {
                activeMenuItem.children.map((menu, subIndex) => {
                  return (
                    <SubmenuItemOuter isExpanded={menu.isExpanded}>
                      <SubmenuItemInner>
                        <SubmenuItem isExpanded={menu.isExpanded}>{menu.taxonomyName}</SubmenuItem>
                          {
                          menu.isExpanded ?
                            <IconMinus size={24} onClick={() => handleToggleSubmenItem(subIndex, false)} /> :
                            <IconPlus size={24} onClick={() => handleToggleSubmenItem(subIndex, true) } />
                          }
                      </SubmenuItemInner>
                      {
                        menu.isExpanded ? (
                          menu.children.map((menu) => {
                            return (
                              <LastMenuItem>{menu.taxonomyName}</LastMenuItem>
                            )
                          })
                        ) : null
                      }
                    </SubmenuItemOuter>
                  )
                })
              }
            </ContentMiddleSection>
          ) : null
        }

        <ContentRightSection>
          {
            !activeMenuItem.taxonomyName ? 
              <SectionTitle>Trending Now</SectionTitle> : 
              <ProductsTitle>Trending at {activeMenuItem.taxonomyName}</ProductsTitle>
          }
          <Products />
          <FavorateProducts activeMenuItem={activeMenuItem}  />
        </ContentRightSection>
      </CategoriesInner>
    </CategoriesOuter>
  );
}

export default Index;