import { toast } from "sonner"
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
    
    interface UseToggleFavoriteRestaurantProps{
        userId?: string
        restaurantId: string
        restaurantIsFavorite?:boolean
       
    }

    const useToggleFavoriteRestaurant = ({userId, restaurantId, restaurantIsFavorite}: 
        UseToggleFavoriteRestaurantProps) =>{
    
    const handleFavoriteClick = async () => {
        if(!userId) return;

        try{
          
        await toggleFavoriteRestaurant(userId, restaurantId);
      toast.success(
        restaurantIsFavorite
        ? "Restaurante removido dos favoritos."
        : "Restaurante favoritado.",
      );
        }catch (error) {
            toast.error("Erro ao favoritar o restaurante.");
        }
     };
      
    return (  handleFavoriteClick);
}
 
export default useToggleFavoriteRestaurant;