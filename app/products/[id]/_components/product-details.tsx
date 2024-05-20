"use client"

import { calculateProductTotalPrice, formatCurreny } from "@/app/_components/_helpers/price";
import Cart from "@/app/_components/cart";
import DEliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import { AlertDialogFooter, AlertDialogHeader } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import ProductList from "@/app/components/product-list";
import { Card } from "@/app/components/ui/card";
import { Prisma, } from "@prisma/client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true;
        };
    }>

    complementaryProducts: Prisma.ProductGetPayload<{
        include: {
            restaurant: true;
        };
    }>[];
}

const ProductDetails = ({product, complementaryProducts,
 } : ProductDetailsProps) => {
    const [quantity, setQuantity] =
     useState(1);
    const [isCartOpen, setIsCartOpen] =
     useState(false);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = 
    useState(false);
    

    const { addProductToCart, products } = useContext(CartContext);
   
   
    const addToCart = ({emptyCart } : { emptyCart?: boolean }) => {
        addProductToCart({product, quantity, emptyCart});
        setIsCartOpen(true);
    }

    const handleAddToCartClick = () => {

        const hasDifferentRestaurantProduct = products.some(
            (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
        );

        if (hasDifferentRestaurantProduct) {
            return setIsConfirmationDialogOpen(true);
        }

        addToCart({
            emptyCart: false,
        });
    };


    const handleIncreaseQuantityClick = () => 
        setQuantity(currentState => currentState + 1);
    const handleDecreaseQuantityClick = () => 
        setQuantity(currentState => {
            if (currentState === 1) return 1;
        
        
        return currentState - 1;
    });


    return (        
        <>
    <div className="relative z-50 mt-[1-5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
    {/*RESTAURANTE*/}
        <div className="flex items-center gap-[0.375rem] pxx-5">

            <div className="relative h-6 w-6">
            <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
             />


    </div>
    <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
        </div>
    {/* NOME DO PRODUTO */}
        <h1 className="mb-2 mt-1 text-xl font-semibold px-5">{product.name}
        </h1>
   
    {/*PREÇO DO PRODUTO E QUANTIDADE*/}
    <div className="flex justify-between px-5">


     <div>   
        <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">
            {formatCurreny(calculateProductTotalPrice(product))}
        </h2>

            {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
            )}
            </div>

            {product.discountPercentage > 0 &&(

            <p className="text-sm text-muted-foreground">
             De:   {formatCurreny(Number(product.price))}
            </p>
            )}
       </div>   

       <div className="flex items-center text-center gap-3">
        <Button 
        size="icon"
        variant="ghost"
        className="border border-solid border-muted-foreground"
        onClick={handleDecreaseQuantityClick}>
            <ChevronLeftIcon />
        </Button>
       <span className="w-4">{quantity}</span>
        <Button size="icon" onClick={handleIncreaseQuantityClick}>
            <ChevronRightIcon />
        </Button>
       </div>

    </div>

    <div className="px-5">
        <DEliveryInfo restaurant={product.restaurant} />
    </div>


    <div className="mt-6 space-y-3">
        <h3 className="font-semibold px-5">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
    </div>

    <div className="mt-6 space-y-3">
        <h3 className="font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
    </div>
    <div className="mt-6 px-5">
        <Button className="w-full font-semibold" 
        onClick={handleAddToCartClick}>
        Adicionar à sacola 
        </Button>
    </div>
   </div>  
   
   <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>

    <SheetContent className="w-[90vw]">

        <SheetHeader>
        <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>

        <Cart setIsOpen={setIsCartOpen} />
    </SheetContent>
   </Sheet>

   <AlertDialog
   open={isConfirmationDialogOpen}
   onOpenChange={setIsConfirmationDialogOpen}
   >
   <AlertDialogContent>
    <AlertDialogHeader>
        <AlertDialogTitle>
            Você só pode adicionar itens de um restaurante por vez!
        </AlertDialogTitle>
        <AlertDialogDescription>
            Deseja mesmo adicionar esse produto? Isso limpará a sua sacola.
        </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={() => addToCart({ emptyCart: true})}>
            Esvaziar sacola e adicionar
        </AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
   </AlertDialog>
   </>
 );
};
 
export default ProductDetails;