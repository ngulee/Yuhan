import React, { useState, useEffect } from 'react';
import { IconLayoutGrid } from '@tabler/icons';
import MenuItemDetail from './components/MenuItemDetailCard/MenuItemDetailCard';
import AllCategories from './components/CategoriesList/CategoriesList';
import { getFormattedMenu } from './utils';
import { fetchHeaderNavs, fetchTreePics } from './api';
import { productsContext } from './context';

import {
  HeaderMenuWrapper,
  HeaderMenuItem,
  HeaderMenuInnerWrapper,
} from './HeaderMenu.style';


const Home = () => {
  let timer;

  const [headerNavs, setHeaderNavs] = useState([]);

  const [activeMenu, setActiveMenu] = useState('');

  const [products, setProducts] = useState([]);

  const [allCategoriesVisible, setAllCategoriesVisible] = useState(false);


  const handleMouseEnter = async ({ parentTaxonomyPath, taxonomyName }, event) => {
    if (timer) clearTimeout(timer);
    event.stopPropagation();
    setActiveMenu(taxonomyName);
    try {
      const threePics = await fetchTreePics(parentTaxonomyPath);
      setProducts([...threePics]);
    } catch (error) {
      setProducts([]);
    }
  }

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setActiveMenu('')
    }, 200);
  }

  const handleMenuItemMouseLeave = () => {
    setActiveMenu('')
  }

  const handleClickAllCatefories = async (isShow) => {
    setAllCategoriesVisible(isShow);
  }

  useEffect(() => {
    async function fetchData () {
      const sourceMenuData = await fetchHeaderNavs();
      const menuData = getFormattedMenu([sourceMenuData]);
      setHeaderNavs(menuData);
    }

    fetchData();
    
  }, []);

  return (
    <React.Fragment>
      <HeaderMenuWrapper>
        <HeaderMenuItem>
          <IconLayoutGrid />
        </HeaderMenuItem>
        <HeaderMenuInnerWrapper onMouseLeave={handleMenuItemMouseLeave}>
          {
            headerNavs.map((headerNav, index) => {
              const params = {};
              const { taxonomyName, children } = headerNav;

              if(index === 0) {
                Object.assign(params, {
                  onClick: () => handleClickAllCatefories(true)
                })
              }
              
              return (
                <HeaderMenuItem
                  key={taxonomyName}
                  { ...params }
                >

                  <span
                    onMouseEnter={(e) => handleMouseEnter(headerNav, e)}
                  >{taxonomyName}</span>
                  {
                    index > 0 && activeMenu === taxonomyName ?
                      <productsContext.Provider value={{ products, name: 'a' }}>
                        < MenuItemDetail
                          menuIndex={index}
                          submenu={children}
                          onMouseLeave={handleMouseLeave}
                        />
                      </productsContext.Provider>
                      : null
                  }
                </HeaderMenuItem>
              )
            })
          }
        </HeaderMenuInnerWrapper>
      </HeaderMenuWrapper>
      {
        allCategoriesVisible ? (
           <AllCategories 
              headerMenu={headerNavs.slice(1)}
              onClose={() => handleClickAllCatefories(false)}
            />
        ) : null
      }
    </React.Fragment>
  )
}

export default Home;