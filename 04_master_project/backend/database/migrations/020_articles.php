<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  function up() {
    Schema::create('articles', function (Blueprint $table) {
      $table->id();
      $table->string('title');
      $table->json('content'); // Store the JSON content here
      $table->foreignId('user_id')->constrained()->cascadeOnDelete();
      $table->foreignId('image_id')->nullable()->constrained('images')->cascadeOnDelete(); // Allow null for cover_image_id
      $table->timestamp('created_at');
      $table->timestamp('updated_at');
  });
}

  function down() {
    Schema::dropIfExists('articles');
  }
};
