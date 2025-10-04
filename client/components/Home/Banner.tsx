import { Button } from "@heroui/react";

export function Banner() {
    let bannerSrc = 'https://images.unsplash.com/photo-1526363269865-60998e11d82d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBhZG9wdGlvbiUyMGZhbWlseXxlbnwxfHx8fDE3NTY3OTU2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img src={bannerSrc} 
            alt="Happy family with adopted pet" 
            className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl mb-6 leading-tight">
          Find Your Perfect
          <span className="block text-orange-400">Furry Friend</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
          Give a loving home to rescued animals and discover unconditional love.
          Every pet deserves a second chance at happiness.
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl mb-2">500+</h3>
            <p className="text-gray-200">Pets Adopted</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl mb-2">50+</h3>
            <p className="text-gray-200">Available Now</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl mb-2">24/7</h3>
            <p className="text-gray-200">Support Available</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          size="lg"
          className="text-white hover:bg-white/20 rounded-full p-3">
          {/* <ArrowDown className="h-6 w-6" /> */}
        </Button>
      </div>
    </div>
  );
}