import Center from '@/components/Center';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProductsGrid from '@/components/ProductsGrid';
import Title from '@/components/Title';
import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/models/Product';

export default function products({ products }) {
  return (
    <>
      <Layout>
        <Center>
          <Title title="All Products" />
          <ProductsGrid products={products} />
        </Center>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  // console.log(products)

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
