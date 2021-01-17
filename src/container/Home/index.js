import React, { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';
import { IconLayoutGrid } from '@tabler/icons';
import MenuItemDetail from './components/MenuItemDetailCard';
import { 
  getFormattedMenu,
} from './utils';
import { fetchHeaderNavs, fetchTreePics } from './api';
import { productsContext } from './context';


const HeaderMenuWrapper = styled.div`
  position: relative;
  display: flex;
  height: 60px;
`;

const HeaderMenuInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  height:100%;
`;

const HeaderMenuItem = styled.div`
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


const Home = () => {
  let timer;

  const [headerNavs, setHeaderNavs] = useState([]);

  const [activeMenu, setActiveMenu] = useState('');

  const [products, setProducts] = useState([])


  const handleMouseEnter = async ({ parentTaxonomyPath, taxonomyName }, event) => {
    console.log('handleMouseEnter:')
    if (timer) clearTimeout(timer);
    event.stopPropagation();
    setActiveMenu(taxonomyName);
    const threePics = await fetchTreePics(parentTaxonomyPath);

    setProducts([...threePics]);
  }

  const handleMouseLeave = () => {
    console.log('handleMouseLeave:')
    timer = setTimeout(() => {
      setActiveMenu('')
    }, 200);
  }

  const handleMenuItemMouseLeave = () => {
    setActiveMenu('')
  }

  useEffect(async () => {
    const sourceMenuData = await fetchHeaderNavs();
    const menuData = getFormattedMenu([sourceMenuData]);
    setHeaderNavs(menuData);
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
              const { taxonomyName, children } = headerNav;
              return (
                <HeaderMenuItem
                  key={taxonomyName + index}
                >

                  <span
                    onMouseEnter={(e) => handleMouseEnter(headerNav, e)}
                  >{taxonomyName}</span>
                  {
                    index > 0 && activeMenu === taxonomyName ?
                      <productsContext.Provider value={{ products }}>
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
    </React.Fragment>
  )
}

export default Home;