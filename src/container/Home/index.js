import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuItemDetail from './components/MenuItemDetailCard';
import { 
  getFormattedMenu,
} from './utils';
import { fetchHeaderNavs } from './api';


const HeaderNavWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  background-color: red;
`;

const HeaderNavItem = styled.div`
  display: inline-block;
  padding: 10px;
  cursor: default;
`;

const Home = () => {
  const [headerNavs, setHeaderNavs] = useState([]);

  const [activeMenu, setActiveMenu] = useState('');


  const handleMouseEnter = ({ parentTaxonomyPath, taxonomyName }, event) => {
    event.stopPropagation();
    setActiveMenu(taxonomyName);
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
      <HeaderNavWrapper>
        {
          headerNavs.map((headerNav, index) => {
            const { taxonomyName, children } = headerNav;
            return (
              <HeaderNavItem
                key={taxonomyName + index}
              >
                <span
                  onMouseEnter={(e) => handleMouseEnter(headerNav, e)}
                >{taxonomyName}</span>
                {
                  index > 0 && activeMenu === taxonomyName ?
                    < MenuItemDetail submenu={children} onMouseLeave={handleMouseLeave} /> : null
                }

              </HeaderNavItem>
            )
          })
        }
      </HeaderNavWrapper>
    </React.Fragment>
  )
}

export default Home;