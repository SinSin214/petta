export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  size: string;
  gender: string;
  location: string;
  image: string;
  personality: string[];
  description: string;
  type: string;
}

export const samplePets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    breed: "Golden Retriever Mix",
    age: "Adult (3 years)",
    size: "Large",
    gender: "Male",
    location: "Downtown Shelter",
    image: "https://images.unsplash.com/photo-1617223777538-5698e655a613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZG9nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NzAyOTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    personality: ["Friendly", "Energetic", "Loyal", "Great with kids"],
    description: "Buddy is a loving golden retriever mix who adores people and other dogs. He's house-trained, walks well on a leash, and would make the perfect family companion. Buddy loves fetch, swimming, and cuddles on the couch. He's great with children and other pets.",
    type: "dog"
  },
  {
    id: "2",
    name: "Luna",
    breed: "Domestic Shorthair",
    age: "Young (1 year)",
    size: "Medium",
    gender: "Female",
    location: "East Side Center",
    image: "https://images.unsplash.com/photo-1701497856652-abfc7db0d444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBraXR0ZW4lMjBhZG9yYWJsZXxlbnwxfHx8fDE3NTY2OTE0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    personality: ["Playful", "Affectionate", "Independent", "Curious"],
    description: "Luna is a beautiful young cat with striking blue eyes and a playful spirit. She loves interactive toys, sunny windows, and gentle pets. Luna is litter-trained and would do well in a quiet home where she can be the center of attention.",
    type: "cat"
  },
  {
    id: "3",
    name: "Max",
    breed: "Border Collie Mix",
    age: "Adult (4 years)",
    size: "Medium",
    gender: "Male",
    location: "Westside Rescue",
    image: "https://images.unsplash.com/photo-1632351459705-22a52c7a3d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHBsYXlpbmd8ZW58MXx8fHwxNzU2NzE1NzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    personality: ["Smart", "Active", "Loyal", "Trainable"],
    description: "Max is an intelligent border .",
    type: "dog"
  },
  {
    id: "4",
    name: "Whiskers",
    breed: "Maine Coon Mix",
    age: "Senior (8 years)",
    size: "Large",
    gender: "Male",
    location: "Central Shelter",
    image: "https://images.unsplash.com/photo-1746428209256-9fa14b6dd473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNjdWUlMjBhbmltYWxzJTIwc2hlbHRlcnxlbnwxfHx8fDE3NTY3OTU2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    personality: ["Calm", "Gentle", "Loving", "Quiet"],
    description: "Whiskers is a distinguished senior cat with a gentle soul. He's perfect for someone looking for a calm, loving companion. Whiskers enjoys quiet moments, gentle brushing, and watching the world from a comfortable perch. He's great with seniors and families with older children.",
    type: "cat"
  },
  {
    id: "5",
    name: "Bella",
    breed: "Labrador Mix",
    age: "Young (2 years)",
    size: "Medium",
    gender: "Female",
    location: "North Rescue",
    image: "https://images.unsplash.com/photo-1617223777538-5698e655a613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZG9nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NzAyOTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    personality: ["Sweet", "Gentle", "Patient", "Loving"],
    description: "Bella is a sweet labrador mix with the most gentle temperament. She's perfect for families with young children and gets along well with other pets. Bella loves walks, playing fetch, and is always ready for cuddles and belly rubs.",
    type: "dog"
  },
  {
    id: "6",
    name: "Shadow",
    breed: "Black Cat",
    age: "Adult (3 years)",
    size: "Medium",
    gender: "Female",
    location: "South Center",
    image: "https://images.unsplash.com/photo-1701497856652-abfc7db0d444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBraXR0ZW4lMjBhZG9yYWJsZXxlbnwxfHx8fDE3NTY2OTE0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    personality: ["Mysterious", "Affectionate", "Playful", "Social"],
    description: "Shadow is a beautiful black cat who breaks all the stereotypes. She's incredibly social, loves meeting new people, and has a playful spirit. Shadow enjoys interactive toys, climbing trees, and curling up with her humans for movie nights.",
    type: "cat"
  }
];