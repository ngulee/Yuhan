import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconChevronRight } from '@tabler/icons';
import { fetchTreePics } from '../../api';
import { childrenDivideIntoGroups } from '../../utils';
import Products from '../Products';


const SubmenuWrapper = styled.div`
  position: absolute;
  top:60px;
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
`;


const Index = ({
  submenu = [],
  onMouseLeave = () => {}
}) => {
  let timer;

  const [pics, setPics] = useState([]);
  const [wrapperHeight, setWrapperHeight] = useState(-1);
  const [activeItem, setActiveItem] = useState({ taxonomyName: '', children: [] });

  const handleLastItemMouseEnter = async (taxonomyName) => {
    const threePics = await fetchTreePics(taxonomyName);
    setPics(threePics);
  }

  useEffect(() => {
    if (submenu.length <= 0) return;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      const submeneWrapper = document.querySelector('.submenu-wrapper');
      console.log('submeneWrapper:', submeneWrapper?.clientHeight)
      if (submeneWrapper?.clientHeight) {
        setWrapperHeight(submeneWrapper.clientHeight);
      }
    }, 0);
    
  }, [submenu, activeItem])
  console.log('submenu:', wrapperHeight)
  return (
    <SubmenuWrapper className='submenu-wrapper' onMouseLeave={onMouseLeave}>
      <SubmenuLeftSection height={wrapperHeight}>
        {
          submenu.map((submenItem) => {
            const { taxonomyName, children } = submenItem;
            return (
              children.length > 0 ? (
                <SubenItem
                  isActived={taxonomyName === activeItem.taxonomyName}
                  onMouseEnter={() => setActiveItem(submenItem)}
                >
                  <span>{taxonomyName}</span>
                  <div style={{
                    flexShrink: 0
                  }}>
                    <IconChevronRight size={24} />
                  </div>
                </SubenItem>
              ): null
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
                          columns.map(({ taxonomyName }) => {
                            return (
                              <LastMenuItem 
                                key={taxonomyName}
                                onMouseEnter={() => handleLastItemMouseEnter(taxonomyName)}
                              >{taxonomyName}</LastMenuItem>
                            )
                          })
                        }
                      </LastMenuColumns>
                    )
                  })
                }
              </ContentLeft>
              {
                pics.length > 0 ? (
                  <ContenRight>
                    <Products pics={pics} />
                  </ContenRight>
                ) : null
              }
            </RightSectionContent>
          </SubmenuRightSection>
        ) : null
      }
    </SubmenuWrapper>
  )
}

export default Index;