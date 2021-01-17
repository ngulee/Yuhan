import React, { useContext } from 'react';
import styled from 'styled-components';
import { productsContext } from '../../context';

const ProductsWrapper = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;

const ProductItem = styled.div`
  display: flex;
  margin-top: ${({ index }) => index > 0 ? 10 : 0}px;
`;
const ProductRightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 10px;
`;

const ProductImg = styled.img`
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  background:#cccccc;
  border: 1px solid red;
`;
const ProductDiscription = styled.p`
  margin: 0;
  max-width: 200px;
`;
const ProductPriceWrapper = styled.div`
  margin-top: 10px;
`;
const ProductPrice = styled.span`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
`;

const ProductCountTip = styled.span`
`;

const Index = () => {
  const context = useContext(productsContext);
  const { products = [] } = context;

  const handleClickProduct = (product) => {
    
  }

  return (
    <ProductsWrapper>
      {
        products.map((product, index) => {
          const {
            id,
            price,
            thumbnailUrl,
            shortDescription
          } = product;

          return (
            <ProductItem 
              key={id} 
              index={index}
              onClick={() => handleClickProduct(product)}
            >
              <ProductImg src={thumbnailUrl} />
              <ProductRightSection>
                <ProductDiscription>{shortDescription}</ProductDiscription>
                <ProductPriceWrapper>
                  <ProductPrice>${price}</ProductPrice>
                </ProductPriceWrapper>
              </ProductRightSection>
            </ProductItem>
          )
        })
      }
    </ProductsWrapper>
  )
}

export default Index;