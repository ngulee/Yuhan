import styled from 'styled-components';

export const ProductsWrapper = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;

export const ProductItem = styled.div`
  display: flex;
  margin-top: ${({ index }) => index > 0 ? 10 : 0}px;
`;
export const ProductRightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 10px;
`;

export const ProductImg = styled.img`
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  background:#cccccc;
  border: 1px solid red;
`;
export const ProductDiscription = styled.p`
  margin: 0;
  max-width: 300px;
`;
export const ProductPriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
`;
export const ProductPrice = styled.span`
  display: inline-block;
  margin-right: 10px;
  font-size: 18px;
  font-weight: 600;
`;

export const ProductCountTip = styled.span`
  white-space: nowrap;
  margin-bottom: 1px;
  font-size: 14px;
  font-weight: 600;
`;