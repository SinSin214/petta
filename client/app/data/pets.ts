export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  size: string;
  gender: string;
  location: PetLocation;
  image: string;
  personalities: string[];
  description: string;
  typeId: string;
  typeText: string;
}

export interface PetLocation {
  id: string;
  address: string;
  districtId: string;
  provinceId: string;
}