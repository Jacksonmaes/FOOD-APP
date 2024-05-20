import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
    category: Category;
}

const CategoryItem = ({category}: CategoryItemProps) => {

    return (
        <Link 
        href={`/categories/${category.id}/products`}
        className="flex justify-center items-center gap-3 rounded-full bg-white py-3 px-4 shadow-md "
        >
            <Image 
            src={category.imageUrl} 
            alt={category.name} 
            height={30} 
            width={30}
            />

            <span className="text-sm font-semibold">{category.name}</span>
        </Link>
      );
};
 
export default CategoryItem;