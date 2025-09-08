import { Button } from "@heroui/react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              {/* <Heart className="h-8 w-8 text-orange-500 fill-current mr-3" /> */}
              <h3 className="text-2xl font-semibold">PawsomeAdoptions</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We're dedicated to connecting loving families with rescued animals in need of forever homes. 
              Every adoption creates space for us to save another life.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                {/* <Facebook className="h-5 w-5" /> */}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                {/* <Twitter className="h-5 w-5" /> */}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                {/* <Instagram className="h-5 w-5" /> */}
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Adopt a Pet</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Adoption Process</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Donate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                {/* <MapPin className="h-4 w-4 mr-3 text-orange-500" /> */}
                <span className="text-sm">123 Rescue Street<br />Pet City, PC 12345</span>
              </div>
              <div className="flex items-center">
                {/* <Phone className="h-4 w-4 mr-3 text-orange-500" /> */}
                <span className="text-sm">(555) 123-PETS</span>
              </div>
              <div className="flex items-center">
                {/* <Mail className="h-4 w-4 mr-3 text-orange-500" /> */}
                <span className="text-sm">adopt@pawsome.com</span>
              </div>
              <div className="flex items-start">
                {/* <Clock className="h-4 w-4 mr-3 text-orange-500 mt-0.5" /> */}
                <div className="text-sm">
                  <p>Mon-Fri: 9AM-6PM</p>
                  <p>Sat-Sun: 10AM-4PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PawsomeAdoptions. All rights reserved. Made with ❤️ for animals in need.</p>
        </div>
      </div>
    </footer>
  );
}