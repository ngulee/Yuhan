import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconChevronRight, IconPlus, IconMinus, IconX } from '@tabler/icons';
import Products from '../Products/Products';
import FavorateProducts from '../FavorateProducts/FavorateProducts';

import { 
  CategoriesOuter,
  CategoriesInner,
  ContentLeftSection,
  CloseAllCateGoriesIconWrapper,
  SectionTitle,
  MainMenuItemsWrapper,
  MainMenuItem,
  ContentMiddleSection,
  SubmenuItemOuter,
  SubmenuItemInner,
  SubmenuItem,
  LastMenuItem,
  ContentRightSection,
  ProductsTitle,
} from './CategoriesList.style';

const defaultValue = { taxonomyName: '', children: [] };

function CategoriesList({ headerMenu = [], onClose = () => {} }) {

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

CategoriesList.propTypes = {
  headerMenu: PropTypes.array,
  onClose: PropTypes.func
}
export default CategoriesList;