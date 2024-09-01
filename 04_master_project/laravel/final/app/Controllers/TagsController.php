<?php

namespace App\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TagsController {
  function index(Request $request) {
    return Tag::all();
  }

  function create(Request $request) {
    $payload = Tag::validate($request);
    return Tag::create($payload);
  }

  function assign(Request $request) {
    $articleId = $request->input('article_id');
    $tagIds = $request->input('tag_ids');
    $article = Auth::user()->articles()->findOrFail($articleId);
    $article->tags()->sync($tagIds);
    $article->save();
    return $article->fresh();
  }
}
