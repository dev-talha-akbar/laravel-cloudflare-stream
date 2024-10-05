<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\FetchCloudflareStreamVideosList;
use Inertia\Inertia;

class DashboardController extends Controller
{
    use FetchCloudflareStreamVideosList;

    public function dashboard(Request $request)
    {
        $videos = $this->fetchCloudflareStreamVideosList($request);

        return Inertia::render('Dashboard', [
            'videoCount' => $videos->count(),
            'videoTotalDuration' => $videos->sum('duration'),
            'videoTotalSize' => $videos->sum('size')
        ]);
    }
}
