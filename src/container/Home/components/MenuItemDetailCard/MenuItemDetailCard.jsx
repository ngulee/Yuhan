import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { IconChevronRight } from '@tabler/icons';
import { filtersSubmenu, childrenDivideIntoGroups } from '../../utils';
import Products from '../Products/Products';

import {
  SubmenuWrapper,
  SubmenuLeftSection,
  SubenItem,
  SubmenuRightSection,
  RightSectionHeader,
  RightSectionContent,
  ContentLeft,
  LastMenuColumns,
  LastMenuItem,
  ContenRight,
} from './MenuItemDetailCard.style';

function MenuItemDetailCard ({
  submenu = [],
  menuIndex = 0,
  onMouseLeave = () => {}
}) {

  submenu = filtersSubmenu(submenu);

  const [activeItem, setActiveItem] = useState(
    submenu[0] ||
    { taxonomyName: '', children: [] }
  );
  const [wrapperHeight, setWrapperHeight] = useState(-1);

  const submenuWrapper = useRef();

  const handleSubmenuItemMouseEnter = (submenItem) => {
    if (submenItem.taxonomyName === activeItem.taxonomyName) return;
    setActiveItem(submenItem);
  }

  /**
   * 三季菜单点击事件
   * @param {Object} column 点击菜单信息
   */
  const handleClickLastMenuItem = (column) => {
    console.log('taxonomyName:', column.taxonomyName);
  }


  useEffect(() => {
    if (submenu.length <= 0 || !activeItem.taxonomyName) return;

    const clientheight = submenuWrapper.current?.clientHeight;

    if (clientheight) {
      setWrapperHeight(clientheight);
    }
    
  }, [submenu, activeItem]);

  return (
    <SubmenuWrapper 
      className='submenu-wrapper'
      menuIndex={menuIndex}
      ref={submenuWrapper}
      onMouseLeave={onMouseLeave}
    >
      <SubmenuLeftSection height={wrapperHeight}>
        {
          submenu.map((submenItem) => {
            const { taxonomyName, children } = submenItem;
            return (
              <SubenItem
                isActived={taxonomyName === activeItem.taxonomyName}
                onMouseEnter={() => handleSubmenuItemMouseEnter(submenItem)}
              >
                <span>{taxonomyName}</span>
                <div style={{
                  flexShrink: 0
                }}>
                  <IconChevronRight size={24} />
                </div>
              </SubenItem>
            )
          })
        }
      </SubmenuLeftSection>
      {
        activeItem.children.length > 0 ? (
          <SubmenuRightSection>
            <RightSectionHeader>
              {activeItem.taxonomyName}
            </RightSectionHeader>
            <RightSectionContent height={wrapperHeight}>
              <ContentLeft>
                {
                  childrenDivideIntoGroups(activeItem.children).map((columns, index) => {
                    return (
                      <LastMenuColumns key={index} index={index}>
                        {
                          columns.map((column) => {
                            const { taxonomyName } = column;
                            return (
                              <LastMenuItem 
                                key={taxonomyName}
                                onClick={() => handleClickLastMenuItem(column)}
                              >{taxonomyName}</LastMenuItem>
                            )
                          })
                        }
                      </LastMenuColumns>
                    )
                  })
                }
              </ContentLeft>
              <ContenRight>
                <Products />
              </ContenRight>
            </RightSectionContent>
          </SubmenuRightSection>
        ) : null
      }
    </SubmenuWrapper>
  )
}

MenuItemDetailCard.propTypes = {
  submenu: PropTypes.array,
  menuIndex: PropTypes.number,
  onMouseLeave: PropTypes.func
}

export default MenuItemDetailCard;