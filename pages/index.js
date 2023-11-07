import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { moogoseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({ product }) {
  return (
    <div>
      <Header />
      <Featured product={product} />
    </div>
  );
}
export async function getServerSideProps() {
  const featuredProductId = "64ef827b325205e311834a94";
  await moogoseConnect();
  const product = await Product.findById(featuredProductId);
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
