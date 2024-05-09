import Center from './Center';
import styled from 'styled-components';
import ProductBox from './ProductBox';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px ;
  /* padding-top: 30px; */
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 500;
`;

export default function NewProducts({ products }) {
  // console.log('this is products in Product prop', products);
  return (
    <>
      <Center>
        <Title>New Arrivals</Title>
        <ProductsGrid>
          {products?.length > 0 &&
            products.map((product, index) => 
              <ProductBox key={`${product._id}-${index}`} {...product} />
            )}
        </ProductsGrid>
      </Center>
    </>
  );
}
