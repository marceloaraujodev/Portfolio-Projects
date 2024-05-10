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
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

export default function cartPage() {
  const { cartProducts, addProduct, removeProduct, setCartProducts} = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then((response) => {
        setProducts(response.data);
        // console.log(response.data);
      });
    }else{
      // clears cart after last item is deleted
      setProducts([]);
    }
  }, [cartProducts]);

  function addOneMoreProduct(id) { 
    addProduct(id)
  }

  function oneLessProduct(id){
    removeProduct(id)
  };

  let total = 0;
  // console.log('this cart product', cartProducts)
  for(const productId of cartProducts){
    // console.log(productId)
    //// if no price add 0 as default
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price
  }

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
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => oneLessProduct(product._id) }>-</Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => addOneMoreProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
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
              <Button $block $black={1}>
                Checkout
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
