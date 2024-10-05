<?php

namespace App\Http\Controllers;

use App\Traits\FetchCloudflareStreamVideosList;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    use FetchCloudflareStreamVideosList;

    /**
     * Display the user's video uploads
     */
    public function index(Request $request): Response
    {
        $videos = $this->fetchCloudflareStreamVideosList($request);

        return Inertia::render('Videos/List', [
            'status' => session('status'),
            'videos' => $videos
        ]);
    }

    /**
     * Display the video upload form
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Videos/Create', [
            'status' => session('status'),
            'csrfToken' => csrf_token()
        ]);
    }
}
