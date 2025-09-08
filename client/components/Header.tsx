'use client';
import { useState } from "react";
// import { useRouter } from 'next/router';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";

// interface HeaderProps {
//     onScrollToAdoption: () => void;
// }

export function Header(
    // { onScrollToAdoption }: HeaderProps
) {
    // const { asPath } = useRouter();
    // const [isOpen, setIsOpen] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const navItems = [
        { label: "Home", link: '/', action: scrollToTop },
        { label: "Adopt", link: '/adopt', action: () => {} },
        { label: "Stories", link: '/stories', action: () => { } },
        { label: "Volunteer", link: '/volunteer', action: () => { } },
        { label: "About", link: '/about', action: () => { } },
        { label: "Contact", link: '/contact', action: () => { } },
    ];

    const renderNavItem = (item: any, isMobile = false) => {
        return (
            <NavbarItem
                key={item.label}
            // isActive={asPath === item.link}
            >
                <Link color="foreground" href={item.link}>
                    {item.label}
                </Link>
            </NavbarItem>
        );
    };

    return (
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white/95 border-b shadow-sm">
            <NavbarBrand>
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {navItems.map((item) => renderNavItem(item))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>


        // <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
        //   <div className="max-w-7xl mx-auto px-4">
        //     <div className="flex items-center justify-between h-16">
        //       {/* Logo */}
        //       <button onClick={scrollToTop} className="flex items-center space-x-3">
        //         <div className="bg-orange-500 p-2 rounded-full">
        //           <Heart className="h-6 w-6 text-white fill-current" />
        //         </div>
        //         <div>
        //           <h1 className="text-xl font-semibold text-gray-900">PawsomeAdoptions</h1>
        //           <p className="text-xs text-gray-600">Find Your Forever Friend</p>
        //         </div>
        //       </button>

        //       {/* Desktop Navigation */}
        //       <nav className="hidden md:flex items-center space-x-8">
        //         {menuItems.map((item) => renderNavItem(item))}
        //       </nav>

        //       {/* Desktop CTA Buttons */}
        //       <div className="hidden md:flex items-center space-x-4">
        //         <div className="flex items-center space-x-4 text-sm text-gray-600">
        //           <div className="flex items-center space-x-1">
        //             <Phone className="h-4 w-4" />
        //             <span>(555) 123-PETS</span>
        //           </div>
        //           <div className="flex items-center space-x-1">
        //             <MapPin className="h-4 w-4" />
        //             <span>Open Daily</span>
        //           </div>
        //         </div>
        //         <Button 
        //           onClick={onScrollToAdoption}
        //           className="bg-orange-500 hover:bg-orange-600"
        //         >
        //           Adopt Now
        //         </Button>
        //       </div>

        //       {/* Mobile Menu */}
        //       <Sheet open={isOpen} onOpenChange={setIsOpen}>
        //         <SheetTrigger asChild className="md:hidden">
        //           <Button variant="ghost" size="sm">
        //             <Menu className="h-6 w-6" />
        //           </Button>
        //         </SheetTrigger>
        //         <SheetContent side="right" className="w-80">
        //           <nav className="space-y-4">
        //             {menuItems.map((item) => renderNavItem(item, true))}
        //           </nav>

        //           <div className="mt-8 space-y-4">
        //             <div className="p-4 bg-gray-50 rounded-lg">
        //               <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
        //                 <Phone className="h-4 w-4" />
        //                 <span>(555) 123-PETS</span>
        //               </div>
        //               <div className="flex items-center space-x-2 text-sm text-gray-600">
        //                 <MapPin className="h-4 w-4" />
        //                 <span>Open Daily 9AM-6PM</span>
        //               </div>
        //             </div>

        //             <Button 
        //               onClick={() => {
        //                 onScrollToAdoption();
        //                 setIsOpen(false);
        //               }}
        //               className="w-full bg-orange-500 hover:bg-orange-600"
        //             >
        //               Adopt Now
        //             </Button>
        //           </div>
        //         </SheetContent>
        //       </Sheet>
        //     </div>
        //   </div>
        // </header>
    );
}