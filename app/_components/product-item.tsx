import { Prisma, Product } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurreny } from "./_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface ProductItemProps {
    product: Prisma.ProductGetPayload<{
        include:{
            restaurant:{
                select:{
                    name: true;
                };
            };
        };
    }>;
    className?: string;
}
const ProductItem = ({product, className}: ProductItemProps) => {
   return (
    <Link className={cn("w-[150px] min-w[150px]", className)} 
    href={`/products/${product.id}`}
    > 
    <div className="w-full space-y-2">
        <div className="relative aspect-square w-full">
            <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill 
            className="rounded-lg object-cover shadow-md"/>

            {product.discountPercentage && (
            <div className="absolute rounded-full left-2 top-2 gap-[2px] text-white left-0 top-0 bg-primary px-2 py-[2px] flex items-center">
                <ArrowDownIcon size={12} />
                <span className="text-xs font-semibold">{product.discountPercentage}%
                </span>

            </div>
            )}
        </div>

        <div>
            <h2 className="truncate text-sm">{product.name}</h2>
            <div className="flex items-center gap-1">
           
        <h3 className="font-semibold">
            {formatCurreny(calculateProductTotalPrice(product))}
          
        </h3>
        {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-forgeround line-through">
                {formatCurreny(Number(product.price))}
       
            </span>
        )}
      </div>

      <span className="block text-xs text-muted-foreground">
        {product.restaurant.name}</span>

    </div>
 </div>
 </Link>

   );
};
 
export default ProductItem;