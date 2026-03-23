
export interface SuccessStory {
  id: string;
  petName: string;
  petType: string;
  familyName: string;
  location: string;
  adoptionDate: string;
  story: string;
  beforeImage: string;
  afterImage: string;
  rating: number;
  tags: string[];
}


export const successStories: SuccessStory[] = [
    {
      id: "1",
      petName: "Bella",
      petType: "Dog",
      familyName: "The Johnson Family",
      location: "Austin, TX",
      adoptionDate: "March 2024",
      story: "Bella came to us as a scared, malnourished puppy. The Johnson family fell in love with her gentle spirit despite her rough start. Six months later, Bella is thriving as a therapy dog, bringing joy to nursing home residents and proving that rescue dogs make the most grateful companions.",
      beforeImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80",
      afterImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80",
      rating: 5,
      tags: ["Therapy Dog", "Transformation", "Family Pet"]
    },
    {
      id: "2",
      petName: "Shadow",
      petType: "Cat",
      familyName: "Maria Rodriguez",
      location: "Denver, CO",
      adoptionDate: "January 2024",
      story: "Shadow was a senior cat who had been overlooked for months. Maria, a retired teacher, was looking for a calm companion. Their bond was instant, and Shadow now spends his days sunbathing by the window and providing comfort during Maria's book club meetings.",
      beforeImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
      afterImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80",
      rating: 5,
      tags: ["Senior Pet", "Companion", "Second Chance"]
    },
    {
      id: "3",
      petName: "Rocky & Luna",
      petType: "Dog",
      familyName: "The Chen Family",
      location: "Seattle, WA",
      adoptionDate: "February 2024",
      story: "This bonded pair had been returned twice before finding the Chens. The family was patient with Rocky's anxiety and Luna's protective nature. Now they're inseparable adventure buddies, hiking trails and camping with their active family every weekend.",
      beforeImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
      afterImage: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&q=80",
      rating: 5,
      tags: ["Bonded Pair", "Adventure", "Multiple Pets"]
    },
    {
      id: "4",
      petName: "Whiskers",
      petType: "Cat",
      familyName: "The Thompson Family",
      location: "Portland, OR",
      adoptionDate: "April 2024",
      story: "Whiskers was found as a stray with a broken leg. After surgery and rehabilitation, he needed a special home. The Thompsons have three young children who learned about compassion and responsibility while helping Whiskers heal. He's now the family's beloved mascot.",
      beforeImage: "https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400&q=80",
      afterImage: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&q=80",
      rating: 5,
      tags: ["Special Needs", "Healing", "Kids & Pets"]
    },
    {
      id: "5",
      petName: "Coco",
      petType: "Rabbit",
      familyName: "Alex Kim",
      location: "San Francisco, CA",
      adoptionDate: "May 2024",
      story: "Coco was surrendered when her previous owner couldn't care for her anymore. Alex, a college student, was looking for a quieter companion for apartment living. Coco has become the perfect study buddy, sitting quietly nearby during late-night cramming sessions.",
      beforeImage: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80",
      afterImage: "https://images.unsplash.com/photo-1621070176818-020816b38103?w=400&q=80",
      rating: 5,
      tags: ["Small Pet", "Student Life", "Apartment Living"]
    },
    {
      id: "6",
      petName: "Max",
      petType: "Dog",
      familyName: "The Williams Family",
      location: "Phoenix, AZ",
      adoptionDate: "June 2024",
      story: "Max was a high-energy dog who needed an active family. The Williams family, with teenage kids involved in sports, was perfect. Max now runs with them every morning, plays fetch in the yard, and has even learned to skateboard alongside the kids!",
      beforeImage: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400&q=80",
      afterImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80",
      rating: 5,
      tags: ["High Energy", "Active Family", "Sports"]
    }
  ];
