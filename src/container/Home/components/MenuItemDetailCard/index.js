import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconChevronRight } from '@tabler/icons';
import { filtersSubmenu, childrenDivideIntoGroups } from '../../utils';
import Products from '../Products';

const HEADER_MENU_INDEX = 8;

const SubmenuWrapper = styled.div`
  position: absolute;
  top:60px;
  ${ ({ menuIndex }) => menuIndex > HEADER_MENU_INDEX ? 'right:0;' : '' }
  display:flex;
  min-height: 381px;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 14.5px rgba(57,57,57,0.2));
  background-color: #ffffff;
`;

const SubmenuLeftSection = styled.div`
  box-sizing: border-box;
  padding: 10px;
  width: 300px;
  height: ${({ height }) => height > 0 ? `${height}px` : 'auto'};
  border-right: 3px solid #cccccc;
`;

const SubmenuRightSection = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height > 0 ? `${height}px` : 'auto'};
  min-width:200px;
  padding: 30px;
`;

const SubenItem = styled.div`
  padding-left:10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  border-radius: 5px;
  background: ${({ isActived }) => (isActived ? '#cccccc' : 'transparent')};
`;

const RightSectionHeader = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-weight: 500;
  border-bottom: 2px solid #aaaaaa;
`;

const RightSectionContent = styled.div`
  display: flex;
`;
const ContentLeft = styled.div`
  display: flex;
`;
const ContenRight = styled.div`
  display: flex;
`;

const LastMenuColumns = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ index }) => (index > 0 ? '20px' : '0' )};
`;
const LastMenuItem = styled.span`
  margin: 10px 0;
  width: 200px;
  color: #ccc;
  &:hover {
    cursor: pointer;
    text-decoration: underline #ccc;
  }
`;


const Index = ({
  submenu = [],
  menuIndex = 0,
  onMouseLeave = () => {}
}) => {
  let timer;
  submenu = filtersSubmenu(submenu);
  const [wrapperHeight, setWrapperHeight] = useState(-1);
  const [activeItem, setActiveItem] = useState(
    submenu[0] ||
    { taxonomyName: '', children: [] }
  );

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
    if (submenu.length <= 0) return;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      const submeneWrapper = document.querySelector('.submenu-wrapper');
      if (submeneWrapper?.clientHeight) {
        setWrapperHeight(submeneWrapper.clientHeight);
      }
    }, 0);
    
  }, [submenu, activeItem]);

  return (
    <SubmenuWrapper 
      className='submenu-wrapper'
      menuIndex={menuIndex}
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

export default Index;