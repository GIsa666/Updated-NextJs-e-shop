export const revalidate=0

import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import NullData from "./components/products/NullData";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title='Ooops! No products found. 
      Click "All" to clear filters ' />
    );
  }

  function shuffleArray(array:any) {
    for (let i = array.length-1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i],array[j]]=[array[j],array[i]]
    }
    return array
  }
const shuffledProducts=shuffleArray(products)

  return (
    <main>
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grod-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product: any) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
      </Container>
    </main>
  );
}
