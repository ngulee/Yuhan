import React, { useContext } from 'react';
import { productsContext } from '../../context';
import {
  ProductsWrapper,
  ProductItem,
  ProductImg,
  ProductRightSection,
  ProductDiscription,
  ProductPriceWrapper,
  ProductPrice,
  ProductCountTip,
} from './Products.stye';


const AVAILABLE_TIP_DOWN_LIMIT = 100;

function Products() {
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

export default Products;