'use client';
import { Badge, Button, Card, CardContent, Chip } from "@heroui/react";
import { useState } from "react";
import { successStories } from "../data/stories";
import { Calendar, MapPin } from "lucide-react";

export default function SuccessStoriesPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = [
        { value: "all", label: "All Stories" },
        { value: "Dog", label: "Dogs" },
        { value: "Cat", label: "Cats" },
        { value: "Other", label: "Other Pets" }
    ];

    const filteredStories = selectedCategory === "all"
        ? successStories
        : successStories.filter(story => story.petType === selectedCategory || (selectedCategory === "Other" && !["Dog", "Cat"].includes(story.petType)));

    const renderImage = (imageSrc: string, text: string) => {
        return (
            <div className="relative">
                <img
                    src={imageSrc}
                    alt={text}
                    className="aspect-square object-cover"
                />
                <Chip
                    className="absolute bottom-2 left-2 z-10"
                    size="sm">
                    {text}
                </Chip>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Banner Section */}
            <section className="py-8 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge className="mb-4 bg-green-100 text-green-800">Success Stories</Badge>
                    <h1 className="mb-6">Happy Tails & New Beginnings</h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Every adoption is a success story waiting to happen. Here are just a few of the thousands of happy endings
                        we&apos;ve been privileged to witness. These stories inspire us every day to continue our mission.
                    </p>
                </div>
            </section>

            {/* Filter Tabs */}
            <section className="px-4 mb-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <Button
                                key={category.value}
                                variant={selectedCategory === category.value ? "primary" : "secondary"}
                                onPress={() => setSelectedCategory(category.value)}>
                                {category.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories Grid */}
            <section className="px-4 pb-16">
                <div className="grid gap-8 max-w-6xl mx-auto">
                    {filteredStories.map((story) => (
                        <Card
                            key={story.id}
                            className={`overflow-hidden md:flex lg:flex-row lg:aspect-4/1 md:aspect-3/1 sm:aspect-1/1`}
                        >
                            <div className="h-full grid grid-cols-2 gap-1 lg">
                                {renderImage(story.beforeImage, 'Before')}
                                {renderImage(story.afterImage, 'After')}
                            </div>

                            <CardContent className="h-full p-4 flex flex-col justify-center">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="mb-1">{story.petName} & {story.familyName}</h3>
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
                    ))}
                </div>
            </section>
        </div>
    )
}