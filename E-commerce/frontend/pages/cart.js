import Button from '@/components/Button';
import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center';
import Header from '@/components/Header';
import Table from '@/components/Table';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  ;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .05);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, .1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  img{
    max-width: 80px;
    max-height: 80px;
  }
`;


export default function cartPage() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then((response) => {
        setProducts(response.data);
        console.log(response.data);
      });
    }
  }, [cartProducts]);

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>You cart is empty</div>}
            {products?.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              {products.map((product, index) => (
                      <tr key={index}>
                        <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt='' />
                        </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>
                        <td>{cartProducts.filter((id) => id === product._id).length}</td>
                        <td>${cartProducts.filter((id) => id === product._id).length * product.price}</td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          )}

          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Address 2" />
              <input type="number" placeholder="zip code" />
              <Button $block={1} $black={1}>
                Checkout
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
