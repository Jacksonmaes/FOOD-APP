import { Prisma } from "@prisma/client";
import ProductItem from "../_components/product-item";


interface ProductListProps {
    products: Prisma.ProductGetPayload<{
        include:{
            restaurant:{
                select:{
                    name: true;
                };
            };
        };
    }>[]
}

const ProductList =  ({products}: ProductListProps) => {
  
    return (
        <div className="flex gap-4 overflow-x-scroll px-5  ">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};
 
export default ProductList;