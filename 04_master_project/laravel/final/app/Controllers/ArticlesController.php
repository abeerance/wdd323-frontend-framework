<?php

namespace App\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticlesController {
  function index(Request $request) {
    $query = Article::query();

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

    // return $query->toSql();
    return $query->get();
  }

  function create(Request $request) {
    $payload = Article::validate($request);
    $article = Auth::user()->articles()->create($payload);
    return $article;
  }

  function update(Request $request) {
    $id = $request->input('id');
    $article = Auth::user()->articles()->findOrFail($id);
    $payload = Article::validate($request);
    $article->update($payload);
    return $article;
  }

  function destroy(Request $request) {
    $id = $request->input('id');
    $article = Auth::user()->articles()->findOrFail($id);
    $article->delete();
    return $article;
  }
}
