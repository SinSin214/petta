 'use client';

import { Button, Card, CardContent, CardFooter, Chip } from "@heroui/react";
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
                variant={isDefault ? "soft" : "secondary"}
                className="text-xs"
            >
                {text}
            </Chip>
        );
    };

    return (
        <Card
            key={pet.id}
            className="h-full cursor-pointer"
            onClick={() => onViewDetails(pet)}
        >

            <CardContent className="overflow-visible p-0 pet-card-body">
                <img
                    alt={pet.name}
                    className="h-[400px] w-full object-cover"
                    src={pet.image}
                />
            </CardContent>
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

                <div className="mt-4 flex w-full items-center justify-between gap-3">
                    <Button variant="secondary" onPress={() => onViewDetails(pet)}>
                        View details
                    </Button>
                    <Button
                        isIconOnly
                        variant={isFavorited ? "primary" : "tertiary"}
                        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                        onPress={() => onFavorite(pet.id)}
                    >
                        <Heart className={isFavorited ? 'fill-current' : ''} size={18} />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}