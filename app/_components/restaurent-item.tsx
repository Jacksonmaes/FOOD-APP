"use client"

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurreny } from "./_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { favoriteRestaurant } from "../_actions/restaurant";
import { toast } from "sonner";
import { Herr_Von_Muellerhoff } from "next/font/google";


interface RestaurantItemProps{
    userId?: string;
    restaurant: Restaurant;
    className?: string;
    userFavoriteRestaurants: UserFavoriteRestaurant[];
    
}
const RestaurantItem = (
    {restaurant, 
        className, 
        userId, 
        userFavoriteRestaurants,
     }: RestaurantItemProps) => {
        const isFavorite = userFavoriteRestaurants.some(
            (fav) => fav.restaurantId === restaurant.id
        );

    const handleFavoriteClick = async () => {
        if(!userId) return;
        try{
            if(isFavorite){
        await favoriteRestaurant(userId, restaurant.id);
        return toast.success("Restaurante removido dos favoritos");
        }
        toast.success("Restaurant favoritado com sucesso!");
     } catch (error) {
        toast.error("Erro ao favoritar o restaurante.");
        }
    };

    return (
        <div className={cn("min-w-[266px] max-w[266px]",className)} 
        >
        <div className="w-full space-y-3">
            <div className="relative h-[136px] w-full">
              <Link href={`/restaurants/${restaurant.id}`}>
              
               <Image 
                src={restaurant.imageUrl}
                fill
                className="rounded-lg object-cover"
                alt={restaurant.name}
                 />
             </Link>

            <div className="absolute rounded-full left-2 top-2 gap-[2px] left-0 top-0 bg-primary px-2 py-[2px] bg-white flex items-center">
                <StarIcon size={12} className="fill-yellow-400 text-yellow-500"/>
                <span className="text-xs font-semibold">5.0</span>
            </div>

            {userId && (
            <Button 
            size="icon"
            className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
            onClick={handleFavoriteClick}
            >
                <HeartIcon size={16} className="fill-white" />
            </Button>

            )}

            <div>
                <h3 className="text-sm font-semibold">{restaurant.name}</h3>
                <div className="flex gap-3">
                <div className="flex gap-1 items-center">
                    <BikeIcon className="text-primary" size={14}/>
                    <span className="text-xs text-muted-foreground">
                        {Number(restaurant.deliveryFee)=== 0
                        ? "Entrega grátis"
                        : formatCurreny(Number(restaurant.deliveryFee))}
                    </span>
                </div>

                <div className="flex gap-1 items-center">
                    <TimerIcon className="text-primary" size={14}/>
                    <span className="text-xs text-muted-foreground">
                        {restaurant.deliveryTimeMinutes} min
                    </span>
                </div>
                </div>
            </div>
            </div>

        </div>
        </div>
         
    );
};
 
export default RestaurantItem;