<?php

namespace App\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Image;
use Illuminate\Support\Facades\Log;

class UploadsController {
    function index(Request $request) {
        $user = Auth::user();
        $images = Image::where('user_id', $user->id)->get();
        return response()->json($images);
    }

    function create(Request $request) {
        $user = Auth::user(); // Get the authenticated user

        $request->validate([
            'files.*' => ['required', 'file', 'max:5120'], // Validate each file in the array
            'files' => ['required', 'array', 'max:5'], // Ensure files is an array
        ]);

        // FORMDATA: this is needed, so that we can access the title of the article
        $title = $request->post('title'); 

        // for example, if the formdata has a description key, we need to do it like this, so we can access the content of the key
        // $description = $request->post('description');

        // Validation of the title is empty. This validation is handled specifically outside the validate,
        // because the title ist not in the $request object, but inside the $request->post('title')
        if (empty($title) || strlen($title) > 255) {
            return response()->json(['message' => 'The title field is invalid.'], 422);
        }

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
                'title' => $title, 
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