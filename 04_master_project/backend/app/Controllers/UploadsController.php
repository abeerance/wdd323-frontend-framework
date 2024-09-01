<?php

namespace App\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Image;

class UploadsController {
    function create(Request $request, $article_id) {
        $user = Auth::user(); // Get the authenticated user

        // Validate the file input only, no need to validate user_id
        $request->validate([
            'file' => ['required', 'file', 'max:2048'], // Validate file
        ]);

        $file = $request->file('file');

        // Get the original filename and extension
        $originalFilename = $file->getClientOriginalName();
        $filename = pathinfo($originalFilename, PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();

        // Generate a unique filename using a random string
        $uniqueFilename = $filename . '_' . Str::random(16) . '.' . $extension;
        $pathname = 'uploads/' . $user->id . '/' . $uniqueFilename;

        // Store the file with the unique pathname
        Storage::putFileAs(
            'uploads/' . $user->id,
            $file,
            $uniqueFilename
        );

        // Save the file information in the database
        Image::create([
            'pathname' => $pathname,
            'article_id' => $article_id,
            'user_id' => $user->id, // Associate the image with the user
        ]);

        return response()->json(['pathname' => $pathname, 'article_id' => $article_id, 'user_id' => $user->id], 201);
    }

    function destroy(Request $request, $id) {
        $user = Auth::user(); // Get the authenticated user

        // Find the image by its ID and ensure it belongs to the authenticated user
        $image = Image::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        // Get the pathname from the database
        $pathname = $image->pathname;

        // Check if the file exists in storage
        if (Storage::exists($pathname)) {
            // Delete the file from storage
            Storage::delete($pathname);
        }

        // Delete the reference in the database
        $image->delete();

        return response()->json(['deleted' => $pathname, 'id' => $id], 200);
    }
}