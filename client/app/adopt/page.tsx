'use client';
import { Filter } from "@/components/Adopt/Filter";
import { PetCard } from "@/components/Adopt/PetCard";
import { samplePets } from '../data/pets';
import { Button } from "@heroui/react";

export default function Adopt() {
  return (
        <div>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center my-12">
              <h2 className="mb-4">Meet Our Available Pets</h2>
              <p className="text-xl text-gray-600">
                Every pet has a unique story and personality. Find the one that speaks to your heart.
              </p>
            </div>

            <div className="mb-14">
              <Filter />
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[1fr]">
              {samplePets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onViewDetails={() => {}}
                  onFavorite={() => {}}
                  isFavorited={false}
                />
              ))}
            </div>

            {/* {filteredPets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500 mb-4">No pets match your current filters.</p>
                <Button onPress={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    onViewDetails={setSelectedPet}
                    onFavorite={handleFavorite}
                    isFavorited={favorites.has(pet.id)}
                  />
                ))}
              </div>
            )} */}
          </div>
        </section>

        {/* <PetModal
          pet={selectedPet}
          isOpen={!!selectedPet}
          onClose={() => setSelectedPet(null)}
          onFavorite={handleFavorite}
          isFavorited={selectedPet ? favorites.has(selectedPet.id) : false}
        /> */}
        </div>
  );
}
