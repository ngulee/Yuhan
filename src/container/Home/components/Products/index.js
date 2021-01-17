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
  max-width: 300px;
`;
const ProductPriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
`;
const ProductPrice = styled.span`
  display: inline-block;
  margin-right: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const ProductCountTip = styled.span`
  white-space: nowrap;
  margin-bottom: 1px;
  font-size: 14px;
  font-weight: 600;
`;

const AVAILABLE_TIP_DOWN_LIMIT = 100;

const Index = () => {
  const context = useContext(productsContext);
  const { products = [] } = context;

  const handleClickProduct = (product) => {
    console.log('product:', product)
  }

  return (
    <ProductsWrapper>
      {
        products.map((product, index) => {
          const {
            id,
            price,
            inventory,
            thumbnailUrl,
            shortDescription
          } = product;

          const { TotalQuantity = 0 } = inventory?.availabilityUsShipping?.data?.[0] || {};

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
                  {
                    parseInt(TotalQuantity) < AVAILABLE_TIP_DOWN_LIMIT ? <ProductCountTip>Only {TotalQuantity} Available</ProductCountTip> : null
                  }
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