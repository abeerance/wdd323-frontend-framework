<?php

namespace App\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticlesController {
    function index(Request $request) {
        $query = Article::with(['tags', 'coverImage']); // Only eager load cover image, not all images

        // filter by id
        $id = $request->input('id');
        if ($id) return $query->where('id', $id)->firstOrFail();

        // filter by title
        $title = $request->input('title');
        if ($title) $query->where('title', 'like', "%$title%");

        // filter by user
        $userId = $request->input('user_id');
        if ($userId) $query->where('user_id', $userId);

        // filter by tags
        $tagIds = $request->input('tag_ids');
        if ($tagIds) {
            $tagIds = explode(',', $tagIds);
            $query->whereHas(
                'tags',
                fn($q) => $q->whereIn('tag_id', $tagIds),
                '>=',
                count($tagIds)
            );
        }

        // order
        $orderBy = $request->input('order_by', 'created_at');
        $orderDir = $request->input('order_dir', 'asc');
        $query->orderBy($orderBy, $orderDir);

        // limit, offset
        $limit = $request->input('limit');
        $offset = $request->input('offset');
        if ($limit) $query->limit($limit);
        if ($offset) $query->offset($offset);

        // return the results
        return $query->get();
    }

    function create(Request $request) {
        // Convert content JSON object to string if it's an array
        if (is_array($request->input('content'))) {
            $request->merge([
                'content' => json_encode($request->input('content')),
            ]);
        }

        $payload = Article::validate($request);

        // Handle cover image validation as before
        if ($request->has('image_id')) {
            $coverImage = Auth::user()->images()->find($request->input('image_id'));

            if (!$coverImage) {
                return response()->json(['error' => 'Invalid cover image ID.'], 422);
            }

            $payload['image_id'] = $coverImage->id;
        }

        $article = Auth::user()->articles()->create($payload);
        return $article;
    }

    function update(Request $request) {
      $id = $request->input('id');
      $article = Auth::user()->articles()->findOrFail($id);
  
      // Convert content JSON object to string if it's an array
      if (is_array($request->input('content'))) {
          $request->merge([
              'content' => json_encode($request->input('content')),
          ]);
      }
  
      $payload = Article::validate($request);
  
      // Handle cover image validation
      if ($request->has('cover_image_id')) {
          $coverImageId = $request->input('cover_image_id');
          $coverImage = Auth::user()->images()->findOrFail($coverImageId); 
  
          if (!$coverImage) {
              return response()->json(['error' => 'Invalid cover image ID.'], 422);
          }
  
          $payload['cover_image_id'] = $coverImage->id;
      }
  
      $article->update($payload);
  
      return response()->json($article, 200);
  }

    function destroy(Request $request) {
        $id = $request->input('id');
        $article = Auth::user()->articles()->findOrFail($id);
        $article->delete();
        return $article;
    }
}