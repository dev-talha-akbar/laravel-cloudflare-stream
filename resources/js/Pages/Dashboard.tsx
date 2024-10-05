import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    auth,
    videoCount,
    videoTotalDuration,
    videoTotalSize,
}: PageProps<{
    videoCount: number;
    videoTotalDuration: number;
    videoTotalSize: number;
}>) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="py-6 text-gray-900 text-2xl font-semibold">
                        Welcome back, {auth.user.name}.{" "}
                        <NavLink href={route("videos.create")}>
                            Upload a new video
                        </NavLink>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white border p-4 rounded-xl flex flex-col">
                            <div className="font-semibold">
                                No. of videos uploaded
                            </div>
                            <p className="text-6xl">{videoCount}</p>
                        </div>
                        <div className="bg-white border p-4 rounded-xl flex flex-col">
                            <div className="font-semibold">
                                Total video duration (in minutes)
                            </div>
                            <p className="text-6xl">
                                {(videoTotalDuration / 60).toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-white border p-4 rounded-xl flex flex-col">
                            <div className="font-semibold">
                                Total video size (in GB)
                            </div>
                            <p className="text-6xl">
                                {(
                                    videoTotalSize /
                                    (1024 * 1024 * 1024)
                                ).toFixed(2)}{" "}
                                GiB
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
