<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

trait FetchCloudflareStreamVideosList
{
    protected function fetchCloudflareStreamVideosList(Request $request)
    {
        $cloudflare_account_id = env('CLOUDFLARE_ACCOUNT_ID');
        $cloudflare_stream_api_token = env('CLOUDFLARE_STREAM_API_TOKEN');
        $endpoint = "https://api.cloudflare.com/client/v4/accounts/$cloudflare_account_id/stream";

        $cloudflare_response = Http::withHeaders([
            "Authorization" => "bearer {$cloudflare_stream_api_token}",
        ])->get($endpoint);

        $videos = $cloudflare_response->json();
        $videosCollection = collect($videos['result']);

        return $videosCollection;
    }
}
