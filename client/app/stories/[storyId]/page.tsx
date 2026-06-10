import { Badge, Card, CardContent, Chip } from "@heroui/react";
import { Calendar, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { successStories } from "@/app/data/stories";

type StoryDetailPageProps = {
  params: Promise<{
    storyId: string;
  }>;
};

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { storyId } = await params;
  const story = successStories.find((item) => item.id === storyId);

  if (!story) {
    console.log(`Story with ID ${storyId} not found.`);
    return
  }

  return (
    <div>
      
    </div>
  );
}
