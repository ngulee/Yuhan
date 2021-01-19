import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

  const handleShopNow = (id) => {
    console.log('productId:', id);
  }

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
                onClick={() => handleShopNow(id)}
              >Shop Now</ShopNowButton>
            </ProductWrapper>
          )
        })
      }
    </ProductsWrapper>
  );
};

FavorateProducts.propTypes = {
  activeMenuItem: PropTypes.object.isRequired
}

export default FavorateProducts;