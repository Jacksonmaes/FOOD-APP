import { calculateProductTotalPrice, formatCurreny } from "@/app/_components/_helpers/price";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ArrowBigDownIcon, ArrowDownIcon, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
    params: {
        id: string;
    };
}

const ProductPage = async ({params: {id} }: ProductPageProps ) => {

    const product = await db.product.findUnique({
        where: {
            id,
        },
        include: {
            restaurant: true,
        },
    });

    if (!product) {
        return notFound();
    }
    
    const juices = await db.product.findMany({
        where: {
            category: {
                name: 'Sucos',
            },
        restaurant: {
            id: product?.restaurant.id,
        },
    },
    include: {
        restaurant: true,
    
    },
    });


    return ( 
    <div>
    <ProductImage product={product} />

        {/*TITULO E PREÇO*/}
    <ProductDetails product={product} complementaryProducts={juices} />

</div>
    );
};
 
export default ProductPage;