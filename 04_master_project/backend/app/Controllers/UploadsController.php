<?php

namespace App\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Image;

class UploadsController {
    function index(Request $request) {
        $user = Auth::user();
        $images = Image::where('user_id', $user->id)->get();
        return response()->json($images);
    }

    function create(Request $request) {
        $user = Auth::user(); // Get the authenticated user

        // Validate that the input contains between 1 and 5 files
        $request->validate([
            'files.*' => ['required', 'file', 'max:5120'], // Validate each file
            'files' => ['required', 'array', 'max:5'], // Ensure there are at most 5 files
        ]);

        $uploadedImages = [];

        foreach ($request->file('files') as $file) {
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
            $image = Image::create([
                'pathname' => $pathname,
                'user_id' => $user->id, // Associate the image with the user
            ]);

            $uploadedImages[] = $image;
        }

        return response()->json(['images' => $uploadedImages], 201);
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