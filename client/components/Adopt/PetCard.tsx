import { Button, Card, CardBody, CardFooter, Image } from "@heroui/react";
import { Heart, MapPin } from "lucide-react";
import { Pet } from "../../app/data/pets";

interface PetCardProps {
  pet: Pet;
  onViewDetails: (pet: Pet) => void;
  onFavorite: (petId: string) => void;
  isFavorited: boolean;
}

export function PetCard({ pet, onViewDetails, onFavorite, isFavorited }: PetCardProps) {
  return (
    // <div data-slot="card" className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
    //   <div className="relative aspect-square">
    //     <Image
    //       src={pet.image}
    //       alt={`Photo of ${pet.name}`}
    //       className="w-full h-full object-cover"
    //     />
    //     <button
    //       onClick={() => onFavorite(pet.id)}
    //       className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
    //         isFavorited 
    //           ? "bg-red-500 text-white" 
    //           : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
    //       }`}
    //     >
    //     </button>
    //     <div className="absolute bottom-3 left-3 flex gap-2">
    //     </div>
    //   </div>
      
    //     <div data-slot="card-content"
    //         className="px-6 [&:last-child]:pb-6 p-4">
    //         <div className="flex items-center justify-between mb-2">
    //         <h3 className="text-lg font-semibold">{pet.name}</h3>
    //         <span className="text-sm text-gray-600">{pet.gender}</span>
    //         </div>
            
    //         <p className="text-sm text-gray-600 mb-2">{pet.breed}</p>
            
    //         <div className="flex items-center text-sm text-gray-500 mb-3">
    //         <MapPin className="h-3 w-3 mr-1" />
    //         {pet.location}
    //         </div>
            
    //         <div className="flex flex-wrap gap-1 mb-4">

    //         </div>
            
    //         <Button 
    //             onPress={() => onViewDetails(pet)} 
    //             className="w-full"
    //             variant="flat"
    //         >
    //         View Details
    //         </Button>
    //     </div>
    // </div>

    <Card 
        key={pet.id} 
        isPressable 
        shadow="sm" 
        className="h-full"
        onPress={() => console.log("item pressed")}
    >
        
          <CardBody className="overflow-visible p-0 pet-card-body">
            <Image
              alt={pet.name}
              className="w-full object-cover"
              shadow="sm"
              src={pet.image}
              width="100%"
            />
          </CardBody>
          <CardFooter className="flex flex-col h-[180px] p-4">
                <div className="flex w-full items-center justify-between">
                    <h3 className="text-md font-semibold">{pet.name}</h3>
                    <span className="text-sm text-gray-600">{pet.gender}</span>
                </div>
                
                <div className="flex w-full text-sm text-gray-500 my-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pet.location}
                </div>
                
                <div className="flex flex-wrap w-full text-sm text-left text-gray-500 ">
                    <div className="text-truncate-5">{pet.description}</div>
                </div>
          </CardFooter>
        </Card>
  );
}