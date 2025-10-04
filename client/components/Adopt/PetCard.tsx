import { Badge, Button, Card, CardBody, CardFooter, Chip, Image } from "@heroui/react";
import { Heart, MapPin } from "lucide-react";
import { Pet } from "../../app/data/pets";

interface PetCardProps {
  pet: Pet;
  onViewDetails: (pet: Pet) => void;
  onFavorite: (petId: string) => void;
  isFavorited: boolean;
}

export function PetCard({ pet, onViewDetails, onFavorite, isFavorited }: PetCardProps) {
  const renderChip = (text: string) => {
    return (
      <Chip 
        key={text}
        size="sm"
        className="bg-white/90 text-gray-800">
        {text}
      </Chip>
    )
  }

  return (
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
              className="w-full h-[400px] object-cover"
              shadow="sm"
              src={pet.image}
              width="100%"
            />
          </CardBody>
          <CardFooter className="flex flex-col p-4 h-[40%]">
                <div className="flex w-full items-center justify-between">
                    <h2 className="text-md font-semibold">{pet.name}</h2>
                    <span className="text-sm text-gray-600">{pet.gender}</span>
                </div>
                
                <div className="flex w-full text-sm text-gray-500 mt-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {pet.location}
                </div>

                <div className="flex w-full text-sm text-gray-500 mt-2">
                  {[pet.typeText, pet.age, pet.size].map((attr) => renderChip(attr))}
                </div>

                <div className="flex flex-wrap w-full text-sm text-gray-500 mt-2">
                  {pet.personality.map((attr) => renderChip(attr))}
                </div>
                
                <div className="flex flex-wrap w-full text-sm text-left text-gray-500 mt-2">
                    <div className="text-truncate-4">{pet.description}</div>
                </div>
          </CardFooter>
        </Card>
  );
}