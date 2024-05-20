"use client"

import { formatCurreny } from "@/app/_components/_helpers/price"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Separator } from "@/app/_components/ui/separator"
import { CartContext } from "@/app/_context/cart"
import { OrderStatus, Prisma } from "@prisma/client"
import { ChevronRightCircle } from "lucide-react"
import Link from "next/link"
import {  useRouter } from "next/navigation"
import { useContext } from "react"



interface OrderItemProps {
    order: Prisma.OrderGetPayload<{
        include: {
            restaurant: true;
            products: {
                include: {
                    product: true;
                };
            };
        };
    }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
    switch(status) {
        case "CANCELED":
            return "Cancelado";
        case "COMPLETED":
            return "Entregue";
        case "CONFIRMED":
            return "Confirmado";
        case "DELIVERING":
            return "Em Transporte";
        case "PREPARING":
            return "Preparando";        
    }
};



const OrderItem = ({order}:OrderItemProps) => {

    const { addProductToCart} = useContext(CartContext);

    const router = useRouter();
    const handleRedoOrderClick = () =>{

    
        for (const orderProduct of order.products) {
            addProductToCart({
                product: {...orderProduct.product, restaurant: order.restaurant },
                quantity: orderProduct.quantity,
            });
        }

        router.push(`/restaurants/${order.restaurantId}`);
    };
    return (
        <Card>
            <CardContent className=" space-y-3p-5">
                <div 
                className={`rounded-full bg-[#EEEEEE] text-muted-foreground w-fit px-2 py-1 
                ${order.status !== "COMPLETED" && "bg-green-400 text-white"}`}
                >
                    <span 
                    className=" block text-xs font-semibold"
                    >
                        {getOrderStatusLabel(order.status)}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div 
                        className="flex items-center gap-2"
                        >
                        <Avatar 
                        className="h-6 w-6"
                        >
                            <AvatarImage 
                            src={order.restaurant.imageUrl} 
                            />
                        </Avatar>

                        <span className="text-sm font-semibold">
                            {order.restaurant.name}
                            
                        </span>
                    </div>

                    <Button 
                    variant="link"
                    size="icon"
                    className="h-5 w-5 text-block"
                    asChild
                    >
                        <Link href={`/restaurants/${order.restaurantId}`}>
                        <ChevronRightCircle />
                        </Link>
                        </Button>
                    </div>
                    
                    <div className="py-3">
                        <Separator />
                    </div>

                 <div >
                        {order.products.map((product) => (
                            <div key={product.id} className="flex items-center gap-2 ">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                               <span className="block text-xs text-white">
                                {product.quantity}
                                </span>
                            </div>    
                            <span className="text-muted-foreground text-xs">
                                {product.product.name}
                                </span>
                    </div>
                 ))}
             </div>    

             <div className="py-3">
                        <Separator />
            </div>

          <div className="flex items-center justify-between">
            <p className="text-sm">{formatCurreny(Number(order.totalPrice))}</p>
            <Button variant="ghost" 
            className="text-xs text-primary"
            size="sm"
            disabled={order.status !== "COMPLETED"}
            onClick={handleRedoOrderClick}
            >
                Refazer pedido
            </Button>
          </div>  
       </CardContent>
     </Card>
    );
}

 
export default OrderItem;