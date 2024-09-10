<?php

namespace App\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentsController {
  function index(Request $request) {
    $query = Comment::query();

    $userId = $request->input('user_id');
    if ($userId) $query->where('user_id', $userId);

    $articleId = $request->input('article_id');
    if ($articleId) $query->where('article_id', $articleId);

    $query->orderBy('created_at', 'desc');

    return $query->get();
  }

  function create(Request $request) {
    $payload = Comment::validate($request);
    return Auth::user()->comments()->create($payload);
  }

  function update(Request $request) {
    $id = $request->input('id');
    $comment = Auth::user()->comments()->findOrFail($id);
    $payload = Comment::validate($request);
    $comment->update($payload);
    return $comment;
  }

  function destroy(Request $request) {
    $id = $request->input('id');
    $comment = Auth::user()->comments()->findOrFail($id);
    $comment->delete();
    return $comment;
  }
}
