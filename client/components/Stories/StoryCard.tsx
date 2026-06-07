import { Card, CardContent, Chip } from "@heroui/react";
import { Calendar, MapPin } from "lucide-react";
import type { SuccessStory } from "@/app/data/stories";

type StoryCardProps = {
  story: SuccessStory;
};

export function StoryCard({ story }: StoryCardProps) {
  const renderImage = (imageSrc: string, text: string) => {
    return (
      <div className="relative">
        <img src={imageSrc} alt={text} className="aspect-square object-cover" />
        <Chip className="absolute bottom-2 left-2 z-10" size="sm">
          {text}
        </Chip>
      </div>
    );
  };

  return (
      <Card className="overflow-hidden md:flex lg:flex-row lg:aspect-4/1 md:aspect-3/1 sm:aspect-1/1 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-medium">
        <div className="h-full grid grid-cols-2 gap-1 lg">
          {renderImage(story.beforeImage, "Before")}
          {renderImage(story.afterImage, "After")}
        </div>

        <CardContent className="h-full p-4 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="mb-1">
                {story.petName} & {story.familyName}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {story.adoptionDate}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {story.location}
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed text-truncate-4">{story.story}</p>

          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <Chip key={tag} variant="secondary" className="text-xs">
                {tag}
              </Chip>
            ))}
          </div>
        </CardContent>
      </Card>
  );
}
