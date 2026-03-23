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
    const renderChip = (text: string, isDefault: boolean) => {
        return (
            <Chip
                key={text}
                size="sm"
                variant={isDefault ? "flat" : "bordered"}
                radius="sm"
                classNames={{
                    base: isDefault ? "" : "border",
                }}
                >
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
            isHoverable={true}
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
                <div className="flex w-full justify-between">
                    <span className="text-xl font-semibold">{pet.name}</span>
                    <span className="text-sm text-gray-600">{pet.gender}</span>
                </div>

                <div className="flex w-full text-sm text-gray-500 mt-2">
                    <MapPin className="h-3 w-3 mr-2 mt-1" />
                    {pet.location}
                </div>

                <div className="flex w-full text-sm text-gray-500 mt-3 gap-1">
                    {[pet.typeText, pet.age, pet.size].map((attr) => renderChip(attr, true))}
                </div>

                <div className="flex flex-wrap w-full text-sm text-gray-500 mt-3 gap-1">
                    {pet.personality.map((attr) => renderChip(attr, false))}
                </div>
            </CardFooter>
        </Card>
    );
}