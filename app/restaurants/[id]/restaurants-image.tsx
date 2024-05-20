"use client"

import { isRestaurantFavorited } from "@/app/_components/_helpers/restaurant";
import { Button } from "@/app/_components/ui/button";
import useToggleFavoriteRestaurant from "@/app/_hooks/use-toggle-favorite-restaurant";
import { Product, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, ChevronsLeftIcon, ChevronsLeftRightIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { useRouter } from "next/navigation";

interface RestaurantImageProps {
    restaurant: Pick<Product, 'id' | 'name'  | "imageUrl" >;
    userFavoriteRastaurants: UserFavoriteRestaurant[];

}
const RestaurantImage = ({restaurant, userFavoriteRestaurants}
    : RestaurantImageProps) => {
    const {data} = useSession();
    const router = useRouter();

    const isFavorite = isRestaurantFavorited(restaurant.id, 
        userFavoriteRestaurants );
   
    const {handleFavoriteClick} =  useToggleFavoriteRestaurant({
        restaurantId: restaurant.id,
        userId: data?.user.id,
        
    })

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
            className="absolute right-4 top-4 rounded-full bg-gray-700"
            onClick={handleFavoriteClick}
            >

                <HeartIcon size={20} className="fill-white" />
            </Button>

</div> 
);
};
 
export default RestaurantImage;