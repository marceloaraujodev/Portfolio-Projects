import Featured from '@/components/Featured';
import Header from '@/components/Header';
import Product from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';
import NewProducts from '@/components/NewProducts';
import Footer from '@/components/Footer';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;


export default function HomePage({ featuredProduct, newProducts }) {
  // console.log('this is new p', newProducts)
  return (
    <>
      <div>
        <Header />
        <Wrapper>

            <Featured product={featuredProduct} />
            <NewProducts products={newProducts} />

        </Wrapper>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '663bbdf58cf7d3a4cd34950a';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    // stringfy turns into string, then parse to convert into objct
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
