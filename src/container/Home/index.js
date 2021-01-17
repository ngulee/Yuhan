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
  align-items: center;
  height: 60px;
`;

const HeaderMenuItem = styled.div`
  position: relative;
  display: inline-block;
  padding: 10px;
  cursor: default;
  &:nth-child(n+3):hover > span {
    border-bottom: 1px solid #000000;
  }
`;




const Home = () => {
  const [headerNavs, setHeaderNavs] = useState([]);

  const [activeMenu, setActiveMenu] = useState('');

  const [products, setProducts] = useState([])


  const handleMouseEnter = async ({ parentTaxonomyPath, taxonomyName }, event) => {
    event.stopPropagation();
    setActiveMenu(taxonomyName);
    const threePics = await fetchTreePics(parentTaxonomyPath);

    setProducts([...threePics]);
  }

  const handleMouseLeave = () => {
    setTimeout(() => {
      setActiveMenu('')
    }, 200);
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
      </HeaderMenuWrapper>
    </React.Fragment>
  )
}

export default Home;