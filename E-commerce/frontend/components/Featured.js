import styled from 'styled-components';
import Center from './Center';
import Button from './Button';
import ButtonLink from './ButtonLink';
import CartIcon from './icons/CartIcon';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2rem;
  @media screen and (min-width: 768px){
    font-size: 3rem;
  }
`;

const Descrip = styled.p`
  color: #aaa;
  font-size: 0.9rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 5px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1){
    order: 2;
  }
  @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr;
    div:nth-child(1){
      order:0;
    }
    img {
      max-height: 300px;
      max-width: 100%;
  }
  }
  
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;


export default function Featured({product}) {

  const {addProduct} = useContext(CartContext);

  function addFeaturedProductToCart(){
    addProduct(product._id)
  }
  
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Descrip>
              {product.description}
              </Descrip>
              <ButtonsWrapper>
                <ButtonLink href={'/product/' + product._id} $outline $white >
                  Read More
                </ButtonLink>
                <Button $white onClick={addFeaturedProductToCart}>
                  Add to Cart
                  <CartIcon />
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src="https://helios-i.mashable.com/imagery/reviews/03y8gbj1mqCuexgXxFJ5vyX/hero-image.fill.size_1248x702.v1623391330.jpg"></img>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
