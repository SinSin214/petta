'use client';
import { Badge, Button } from "@heroui/react";
import { useState } from "react";
import { successStories } from "../data/stories";
import { StoryCard } from "@/components/Stories/StoryCard";
import Link from "next/link";

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
                        <Link href={`/stories/${story.id}`} className="block" key={story.id}>
                            <StoryCard key={story.id} story={story} />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}