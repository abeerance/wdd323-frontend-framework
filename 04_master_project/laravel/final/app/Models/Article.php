<?php

namespace App\Models;

use Bootstrap\Column;
use Bootstrap\Model;
use Illuminate\Http\Request;

class Article extends Model {
  #[Column] public int $id;
  #[Column] public string $title;
  #[Column] public string $content;
  #[Column] public int $user_id;
  #[Column] public string $created_at;
  #[Column] public string $updated_at;

  function tags() {
    return $this->belongsToMany(Tag::class);
  }

  protected $with = ['tags'];

  static function validate(Request $request) {
    $post = $request->method() === 'POST';
    return $request->validate([
      'title' => [$post ? 'required' : 'sometimes', 'min:1', 'max: 200'],
      'content' => [$post ? 'required' : 'sometimes', 'min:1', 'max: 60000'],
    ]);
  }
}
