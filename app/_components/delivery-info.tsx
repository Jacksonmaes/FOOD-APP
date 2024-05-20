import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurreny } from "./_helpers/price";
import { Restaurant } from "@prisma/client";

interface DEliveryInfoProps {
    restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}

const DEliveryInfo = ({restaurant}: DEliveryInfoProps) => {
    return (  
        <>

        <Card className="flex justify-around mt-6 py-3">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-muted-foreground">
                    <span className="text-xs">Entrega</span>
                    <BikeIcon size={14} />
                </div>
                {Number(restaurant.deliveryFee) > 0 ? (
                    <p className="text-xs font-semibold">
                        {formatCurreny(Number(restaurant.deliveryFee))}
                    </p>
                ) :(
                    <p className="text-sm font-semibold">Grátis</p>
                
                )}
            </div>
    
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-muted-foreground">
                    <span className="text-xs">Entrega</span>
                    <TimerIcon size={14} />
                </div>
        
                    <p className="text-sm font-semibold">
                        {restaurant["deliveryTimeMinutes"]} min
                    </p> 
            </div>
        </Card>
        </>
    );
}
 
export default DEliveryInfo;