export function AboutSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="mb-8">Why Choose Adoption?</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          When you adopt a pet, you're not just gaining a loyal companion—you're saving a life 
          and making room for another animal in need. Our rescued pets are health-checked, 
          vaccinated, and ready to become part of your family.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              {/* <Heart className="h-8 w-8 text-orange-600" /> */}
            </div>
            <h3>Save a Life</h3>
            <p className="text-gray-600">Every adoption saves a life and creates space for another rescue.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              {/* <Users className="h-8 w-8 text-blue-600" /> */}
            </div>
            <h3>Perfect Match</h3>
            <p className="text-gray-600">Our team helps match you with the perfect pet for your lifestyle.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              {/* <Home className="h-8 w-8 text-green-600" /> */}
            </div>
            <h3>Ready for Home</h3>
            <p className="text-gray-600">All pets are spayed/neutered, vaccinated, and health-checked.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              {/* <Award className="h-8 w-8 text-purple-600" /> */}
            </div>
            <h3>Ongoing Support</h3>
            <p className="text-gray-600">We provide lifetime support and resources for you and your pet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}