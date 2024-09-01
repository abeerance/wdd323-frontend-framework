<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Article extends Model {
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'user_id',
    ];

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function images() {
        return $this->hasMany(Image::class);
    }

    protected $with = ['tags', 'images']; // Eager load tags and images

    static function validate(Request $request) {
        $post = $request->method() === 'POST';
        return $request->validate([
            'title' => [$post ? 'required' : 'sometimes', 'min:1', 'max:200'],
            'content' => [$post ? 'required' : 'sometimes', 'min:1', 'max:60000'],
        ]);
    }
}