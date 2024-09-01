<?php

namespace App\Models;

use Bootstrap\Column;
use Bootstrap\Model;
use Illuminate\Http\Request;

class Tag extends Model {
  #[Column] public int $id;
  #[Column] public string $name;
  #[Column] public string $created_at;
  #[Column] public string $updated_at;

  static function validate(Request $request) {
    return $request->validate([
      'name' => ['required', 'min:1', 'max: 99', 'unique:tags,name'],
    ]);
  }
}
