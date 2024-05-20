import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurent-item";

const MyFavoritesRestaurants = async () => {
    const session =await  getServerSession(authOptions)

    if (!session) {
        return notFound()
    }
    const userFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            restaurant: true
        }

    })
    return ( 
        <>
        <Header />
        <div className="px-5 py-6">
            <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
    <div className="flex w-full flex-col gap-6 ">
        {userFavoriteRestaurant.length > 0 ? (
        userFavoriteRestaurant.map(({restaurant}) =>(
            <RestaurantItem
            key={restaurant.id} 
            restaurant={restaurant} 
            className="min-w-full max-w-full"
            userFavoriteRestaurants={userFavoriteRestaurant}
            />
        ))
    ) : (
        <h3 className="font-medium">Você ainda não marcou nenhum restaurante como favorito.</h3>
    )}
    </div>
    </div>
    </>
     );
}
 
export default MyFavoritesRestaurants; 