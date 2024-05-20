"use client"

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ChevronsLeftIcon, ChevronsLeftRightIcon, HeartIcon } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";

interface RestaurantImageProps {
    restaurant: Pick<Product, 'name'  | "imageUrl" >

}


const RestaurantImage = ({restaurant}: RestaurantImageProps) => {

    const router = useRouter();

    const handleBackClick = () => router.back()


    return (     
   <div className="relative h-[250px] w-full" >
    <Image
    src={restaurant?.imageUrl} 
    alt={restaurant.name} 
    fill 
    className= "object-cover"
    />
    <Button className="absolute left-4 top-4 rounded-none-full bg-white text-foreground houver:text-white " 
    size="icon"
    onClick={handleBackClick}>
    
        <ChevronsLeftIcon/>
    </Button>

    <Button 
            size="icon"
            className="absolute right-4 top-4 rounded-full bg-gray-700 ">
                <HeartIcon size={20} className="fill-white" />
            </Button>

</div> 
);
};
 
export default RestaurantImage;