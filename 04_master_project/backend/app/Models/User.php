<?php

namespace App\Models;

use Bootstrap\Column;
use Bootstrap\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class User extends Model {
  #[Column] public int $id;
  #[Column] public string $email;
  #[Column] public string $password;
  #[Column] public string $created_at;
  #[Column] public string $updated_at;

  function articles(): HasMany|Article {
    return $this->hasMany(Article::class);
  }

  function comments(): HasMany|Article {
    return $this->hasMany(Comment::class);
  }

  static function validate(Request $request, $userId = null) {
    $post = $request->method() === 'POST';
    return $request->validate([
        'email' => [$post ? 'required' : 'sometimes', 'email', 'unique:users,email,' . $userId],
        'password' => [$post ? 'required' : 'sometimes', 'min:8'],
    ]);
  }

  static function booted() {
    self::saving(function (User $user) {
      if ($user->isDirty('password'))
        $user->password = Hash::make($user->password);
    });
  }
}
