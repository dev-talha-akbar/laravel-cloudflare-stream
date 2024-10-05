import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function List({ videos }: PageProps<{ videos: [] }>) {
    return (
        <AuthenticatedLayout>
            <Head title="Uploaded videos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Uploaded videos{" "}
                        <NavLink href={route("videos.create")}>
                            Upload a new video
                        </NavLink>
                    </h2>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        {videos.map(
                            (video: {
                                thumbnail: string;
                                meta: { name: string };
                                status: {
                                    state: string;
                                };
                                created: string;
                                creator: string;
                                duration: string;
                            }) => (
                                <div className="flex gap-4 p-4 [&:not(:last-child)]:border-b">
                                    <img
                                        className="w-[200px]"
                                        src={video.thumbnail}
                                    />
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-4">
                                            <h2 className="text-xl">
                                                {video.meta.name}
                                            </h2>
                                            <div className="text-sm p-1 bg-blue-200 text-blue-900 rounded-lg">
                                                {video.status.state == "ready"
                                                    ? "Ready to stream"
                                                    : "Processing"}
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div>
                                                Duration: {video.duration}
                                            </div>
                                            <div>
                                                Created:{" "}
                                                {new Date(
                                                    video.created
                                                ).toLocaleDateString()}
                                            </div>
                                            <div>
                                                Creator:{" "}
                                                {video.creator ??
                                                    "No creator specified"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
