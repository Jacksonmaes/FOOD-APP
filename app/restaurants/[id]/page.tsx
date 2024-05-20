import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./restaurants-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DEliveryInfo from "@/app/_components/delivery-info";
import CategoryItem from "@/app/_components/category-item";
import ProductList from "@/app/components/product-list";
import CartBanner from "./cart-banner";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";


interface RestaurantPagesProps {
    params:{
        id: string 
    }
}

const RestaurantPages = async ({params:{id}}: RestaurantPagesProps)  => {
    const restaurant = await db.restaurant.findUnique({
        where:{
            id,
        },
        include:{
            categories:{
                include:{
                    products:{
                        where:{
                            restaurantId: id,
                        },
                        include:{
                            restaurant:{
                                select:{
                                    name: true,
                                },
                            },
                        },
                    },
                },
            },
            products:{
                take:10,
                include:{
                    restaurant:{
                        select:{
                            name: true,
                        },
                    },
                },
            },
        },
    });

    if (!restaurant) {
        return notFound();
    }

    const session = await getServerSession(authOptions)
    const userFavoriteRastaurants = await db.userFavoriteRestaurant.findMany({
        where: {
            userId: session?.user.id,
        },
    })

    return (
    <div>
            <RestaurantImage restaurant={restaurant}
            userFavoriteRastaurants={userFavoriteRastaurants} />

            <div className="flex relative z-50 mt-[1-5rem] rounded-tl-3xl bg-white rounded-tr-3xl items-center justify-between px-5 pt-5">
                <div className="flex items-center gap-[0.375rem]">
                <div className="relative h-8 w-8">
            <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-full object-cover"
             />
    </div>
    <h1 className="text-xl font-semibold">{restaurant.name}</h1>
            </div>
                
            <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
                <StarIcon size={12} className="fill-yellow-400 text-yellow-500"/>
                <span className="text-xs font-semibold">5.0</span>
            </div>
        </div>

            <div className="px-5">
                <DEliveryInfo restaurant={restaurant} />
            </div>

            <div className="mt-3 flex gap-4 overflow-x-scroll px-5">
                {restaurant.categories.map((category) => (
                <div 
                key={category.id} 
                className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
                >
                   <span className="text-xs text-muted-foreground">
                     {category.name} 
                     </span>
                </div>
            ))}
         </div>

         <div className="mt-6 space-y-4">
            <h2 className="px-5 font-semibold">Mais pedidos</h2>
            <ProductList products={restaurant.products} />
         </div>

         {restaurant.categories.map(category =>(
            
         <div className="mt-6 space-y-4" key={category.id}>
         <h2 className="px-5 font-semibold">category.name</h2>
         <ProductList products={category.products} />
      </div>


         ))}

         <CartBanner restaurant={restaurant} />

    </div>
    );
};
 
export default RestaurantPages;