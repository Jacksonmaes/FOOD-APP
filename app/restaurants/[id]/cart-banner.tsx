"use client"
import { formatCurreny } from "@/app/_components/_helpers/price";
import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle,  } from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { Restaurant } from "@prisma/client";

import { useContext, useState } from "react";

interface CartBannerProps {
    restaurant: Pick<Restaurant, 'id'>
}

const CartBanner = ({restaurant}: CartBannerProps) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
   const {products, totalPrice, totalQuantity} = useContext(CartContext) ;

   const restaurantHasProductOnCart = products.some((product) => product.restaurantId === restaurant.id)

   if (!restaurantHasProductOnCart) return null

   return ( 
    <div className="fixed bg-white z-50 w-full bottom-0 left-0 p-5 pt-3">
        <div className="fex items-center justify-between">
            <div>

            <span className="text-xs text-muted-foreground">
                Total sem entrega
            </span>

            <h3 className="font-semibold">{formatCurreny(totalPrice)}{" "}
            <span className="text-xs text-muted-foreground">
                {" "}
                 / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
                 </span>
            </h3>
   </div>   


            <Button onClick={()=> setIsCartOpen(true)}>Ver sacola</Button>

        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
    
      <SheetContent className="w-[90vw]">
          <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
      </SheetContent>
     </Sheet>
      </div>
     </div>
    );
};
 
export default CartBanner;