import Featured from '@/components/Featured';
import Header from '@/components/Header';
import Product from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';
import NewProducts from '@/components/NewProducts';
import Footer from '@/components/Footer';
import styled from 'styled-components';
import Layout from '@/components/Layout';

export default function HomePage({ featuredProduct, newProducts }) {
  // console.log('this is new p', newProducts)
  return (
    <>
      <Layout>
        <Featured product={featuredProduct} />
        <NewProducts products={newProducts} />
      </Layout>
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
