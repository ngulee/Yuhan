import styled from 'styled-components';
import { Button } from "@chakra-ui/react"

export const ProductsWrapper = styled.div`

`;
export const ProductWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 20px;
  margin-top: 40px;
  margin-left: 20px;
  background-image: ${({ bgImg }) => `url(${bgImg})`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 350px;
  height: 350px;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 14.5px rgba(57,57,57,0.2));
`;

export const ProductLocation = styled.div`
  margin-top: 20px;
  text-align: right;
  font-size: 12px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const PriceDescription = styled.span`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 600;
  color: red;
`;
export const PriceNumber = styled.span`
  margin-top: 10px;
  font-weight: 600;
  color: red;
  text-align: right;
`;

export const ShopNowButton = styled(Button)`
  position: absolute;
`;