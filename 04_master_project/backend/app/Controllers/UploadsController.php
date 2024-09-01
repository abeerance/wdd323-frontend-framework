<?php

namespace App\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;


// basic uploads example
class UploadsController {
  function create(Request $request, $article_id) {
    $user = Auth::user();
    $request->validate(['file' => ['required', 'max:2048']]);
    $file = $request->file('file');
    $pathname = Storage::putFileAs(
      'uploads/' . $user->id,
      $file,
      $file->getClientOriginalName(),
    );

    Image::create([
      'pathname' => $pathname,
      'article_id' => $article_id,
    ]);

    return $pathname;
  }

  function destroy(Request $request) {
    $user = Auth::user();
    $filename = $request->input('filename');
    $path = 'uploads/' . $user->id . '/' . $filename;
    if (!Storage::exists($path))
      return abort(404, 'file does not exist');
    Storage::delete($path);
    return $path;
  }
}
