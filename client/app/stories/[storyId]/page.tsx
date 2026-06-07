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
    <div></div>
    // <div className="min-h-screen bg-gray-50 pt-20">
    //   <section className="py-8 px-4">
    //     <div className="max-w-4xl mx-auto">
    //       {/* <Link href="/stories" className="text-sm text-green-700 hover:text-green-800">
    //         Back to stories
    //       </Link> */}

    //       <Badge className="mt-4 mb-4 bg-green-100 text-green-800">Success Story</Badge>
    //       <h1 className="mb-2">{story.petName} & {story.familyName}</h1>

    //       <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
    //         <div className="flex items-center gap-1">
    //           <Calendar className="h-4 w-4" />
    //           {story.adoptionDate}
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <MapPin className="h-4 w-4" />
    //           {story.location}
    //         </div>
    //         <Chip size="sm" variant="secondary">{story.petType}</Chip>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="px-4 pb-16">
    //     <div className="max-w-4xl mx-auto grid gap-6">
    //       <Card className="overflow-hidden">
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
    //           <div className="relative">
    //             <img src={story.beforeImage} alt={`${story.petName} before adoption`} className="aspect-square object-cover" />
    //             <Chip className="absolute bottom-2 left-2 z-10" size="sm">
    //               Before
    //             </Chip>
    //           </div>

    //           <div className="relative">
    //             <img src={story.afterImage} alt={`${story.petName} after adoption`} className="aspect-square object-cover" />
    //             <Chip className="absolute bottom-2 left-2 z-10" size="sm">
    //               After
    //             </Chip>
    //           </div>
    //         </div>

    //         <CardContent className="p-6">
    //           <p className="text-gray-700 leading-8">{story.story}</p>

    //           <div className="flex flex-wrap gap-2 mt-6">
    //             {story.tags.map((tag) => (
    //               <Chip key={tag} variant="secondary" className="text-xs">
    //                 {tag}
    //               </Chip>
    //             ))}
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </section>
    // </div>
  );
}
