<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class UploadController extends Controller
{
  /**
   * Get Cloudstream Upload URL
   */
  public function getUploadURL(Request $request)
  {
    $cloudflare_account_id = env('CLOUDFLARE_ACCOUNT_ID');
    $cloudflare_stream_api_token = env('CLOUDFLARE_STREAM_API_TOKEN');
    $endpoint = "https://api.cloudflare.com/client/v4/accounts/{$cloudflare_account_id}/stream?direct_user=true";

    $cloudflare_response = Http::withHeaders([
      "Authorization" => "bearer {$cloudflare_stream_api_token}",
      "Tus-Resumable" => "1.0.0",
      "Upload-Length" => $request->header('Upload-Length'),
      "Upload-Metadata" => $request->header("Upload-Metadata"),
    ])->post($endpoint);

    $upload_url = $cloudflare_response->getHeader('Location')[0];

    http_response_code(201);

    $cloudflare_response_headers = $cloudflare_response->getHeaders();
    foreach ($cloudflare_response_headers as $name => $values) {
      foreach ($values as $value) {
        header($name . ': ' . $value);
      }
    }

    header('Access-Control-Expose-Headers: Location');
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Origin: *');
    header('Location: ' . $upload_url, true, 201);


    echo json_encode(['message' => 'Upload URL created successfully']);

    exit();
  }
}
