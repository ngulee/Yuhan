import React, { useState, useEffect } from 'react';
import {
  ProductsWrapper,
  ProductWrapper,
  ProductLocation,
  PriceWrapper,
  PriceDescription,
  PriceNumber,
  ShopNowButton
} from './FavorateProducts.style';
import { fetchOnePics } from '../../api';


function FavorateProducts({ activeMenuItem = {} }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function requestOnePics () {
      const onePics = await fetchOnePics();
      setProducts(onePics)
    }

    requestOnePics();

  }, []);

  if (products.length === 0) return null;


  return (
    <ProductsWrapper>
      {
        products.map((product) => {
          const { id, price, thumbnailUrl } = product;
          return (
            <ProductWrapper
              key={id}
              bgImg={thumbnailUrl}
            >
              <ProductLocation>{activeMenuItem.taxonomyName}</ProductLocation>
              <PriceWrapper>
                <PriceDescription>Starter Set</PriceDescription>
                <PriceNumber>${price}</PriceNumber>
              </PriceWrapper>
              <ShopNowButton 
                borderRadius="200px"
                position="absolute"
                bottom="20px"
                color="#ffffff"
                colorScheme="red"
              >Shop Now</ShopNowButton>
            </ProductWrapper>
          )
        })
      }
    </ProductsWrapper>
  );
};

export default FavorateProducts;