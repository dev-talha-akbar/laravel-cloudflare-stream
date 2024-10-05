import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import { useState } from "react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

function createUppy(csrfToken: string) {
    const uppy = new Uppy({
        debug: true,
        autoProceed: true,
    }).use(Tus, {
        endpoint: route("upload.getUploadURL"),
        onShouldRetry() {
            return false;
        },
        chunkSize: 150 * 1024 * 1024,
    });

    return uppy;
}

export default function Create({
    csrfToken,
}: PageProps<{ csrfToken: string }>) {
    const [uppy] = useState(createUppy(csrfToken));

    return (
        <AuthenticatedLayout>
            <Head title="Upload new videos" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Upload new videos
                    </h2>
                    <Dashboard uppy={uppy} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
