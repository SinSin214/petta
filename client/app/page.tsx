import { AboutSection } from "@/components/AboutSection";
import { Banner } from "@/components/Banner";

export default function Home() {
	return (
		<div className="min-h-screen bg-gray-50">
		<Banner/>
		<AboutSection/>
		{/* <AboutSection /> */}

		{/* Adoption Section */}
		{/* <section ref={adoptionSectionRef} className="py-16 px-4">
			<div className="max-w-7xl mx-auto">
			<div className="text-center mb-12">
				<h2 className="mb-4">Meet Our Available Pets</h2>
				<p className="text-xl text-gray-600">
				Every pet has a unique story and personality. Find the one that speaks to your heart.
				</p>
			</div>

			<div className="mb-8">
				<SearchFilters
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
				animalType={animalType}
				onAnimalTypeChange={setAnimalType}
				ageFilter={ageFilter}
				onAgeFilterChange={setAgeFilter}
				sizeFilter={sizeFilter}
				onSizeFilterChange={setSizeFilter}
				onClearFilters={clearFilters}
				/>
			</div>

			{filteredPets.length === 0 ? (
				<div className="text-center py-12">
				<p className="text-xl text-gray-500 mb-4">No pets match your current filters.</p>
				<Button onClick={clearFilters} variant="outline">
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
			)}
			</div>
		</section> */}

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
