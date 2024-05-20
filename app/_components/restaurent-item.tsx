import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurreny } from "./_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface RestaurantItemProps{
    restaurant: Restaurant
    className?: string;
}
const RestaurantItem = ({restaurant, className }: RestaurantItemProps) => {
    return (
        <Link className={cn("min-w-[266px] max-w[266px]",className)} 
        href={`/restaurants/${restaurant.id}`}
        >
        <div className="w-full space-y-3">
            <div className="relative h-[136px] w-full">
                <Image 
                src={restaurant.imageUrl}
                fill
                className="rounded-lg object-cover"
                alt="restaurant.name" 
                 />

            <div className="absolute rounded-full left-2 top-2 gap-[2px] left-0 top-0 bg-primary px-2 py-[2px] bg-white flex items-center">
                <StarIcon size={12} className="fill-yellow-400 text-yellow-500"/>
                <span className="text-xs font-semibold">5.0</span>
            </div>

            <Button 
            size="icon"
            className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ">
                <HeartIcon size={16} className="fill-white" />
            </Button>

            <div>
                <h3 className="text-sm font-semibold">{restaurant.name}</h3>
                <div className="flex gap-3">
                <div className="flex gap-1 items-center">
                    <BikeIcon className="text-primary" size={14}/>
                    <span className="text-xs text-muted-foreground">
                        {Number(restaurant.deliveryFee)=== 0
                        ? "Entrgea grátis"
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
        </Link>
         
    );
};
 
export default RestaurantItem;