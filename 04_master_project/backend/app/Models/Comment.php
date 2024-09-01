<?php

namespace App\Models;

use Bootstrap\Column;
use Bootstrap\Model;
use Illuminate\Http\Request;

class Comment extends Model {
  #[Column] public int $id;
  #[Column] public string $text;
  #[Column] public int $article_id;
  #[Column] public int $user_id;
  #[Column] public string $created_at;
  #[Column] public string $updated_at;

  static function validate(Request $request) {
    $post = $request->method() === 'POST';
    return $request->validate([
      'text' => ['required', 'min:1', 'max: 200'],
      'article_id' => [$post ? 'required' : 'exclude', 'exists:articles,id'],
    ]);
  }
}
