import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconChevronRight, IconPlus, IconMinus, IconX } from '@tabler/icons';
import Products from '../Products/Products';
import FavorateProducts from '../FavorateProducts/FavorateProducts';
import { productsContext } from '../../context';
import { fetchFourPics } from '../../api';

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
  const [fourProducts, setFourProducts] = useState([])

  const requestFourPics = async (parentTaxonomyPath = '') => {
    try {
      const fourPics = await fetchFourPics(parentTaxonomyPath);
      setFourProducts(fourPics);
    } catch (error) {
      
    }
  }

  const handleToggleSubmenItem = (subIndex, isExpanded) => {
    const deepCloneMenuItem = JSON.parse(JSON.stringify(activeMenuItem))
    deepCloneMenuItem.children[subIndex].isExpanded = isExpanded;
    setActiveMenuItem(deepCloneMenuItem);
  }

  const handleMainMenuItemMouseEnter = (menu) =>  {
    const { parentTaxonomyPath } = menu.children[0];
    console.log('parentTaxonomyPath:', parentTaxonomyPath);
    requestFourPics(parentTaxonomyPath);
    setActiveMenuItem(menu)
  }

  const handleLastMenuItemClick = (menu) => {
    console.log('LastMenuItemClick:', menu);
  }

  useEffect(() => {
    requestFourPics();
  }, []);

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
                    onMouseEnter={() => handleMainMenuItemMouseEnter(menu)}
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
                    <SubmenuItemOuter key={menu.taxonomyName} isExpanded={menu.isExpanded}>
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
                              <LastMenuItem key={menu.taxonomyName} onClick={() => handleLastMenuItemClick(menu)}>{menu.taxonomyName}</LastMenuItem>
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
          <productsContext.Provider value={{ products: fourProducts, name: 'b' }}>
            <Products />
          </productsContext.Provider>
          
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