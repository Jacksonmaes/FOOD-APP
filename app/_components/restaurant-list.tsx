import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurent-item";
import { authOptions } from "../_lib/auth";

const RestaurantList = async () => {
    const session = await getServerSession(authOptions)

    const restaurants = await db.restaurant.findMany({take:10});
    const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
        where: { userId: session?.user?.id},
    });

    return ( 
        <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
            {restaurants.map((restaurant) => (
                <RestaurantItem
                key={restaurant.id} 
                restaurant={restaurant} 
                userId={session?.user?.id}
                userFavoriteRestaurants={userFavoritesRestaurants}
                />
            ))}
        </div>
    );
};

 
export default RestaurantList;