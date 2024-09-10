<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  function up() {
    // main table
    Schema::create('tags', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->timestamp('created_at');
      $table->timestamp('updated_at');
    });

    // pivot table
    Schema::create('article_tag', function (Blueprint $table) {
      $table->id();
      $table->foreignId('article_id')->constrained()->cascadeOnDelete();
      $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
    });
  }

  function down() {
    Schema::dropIfExists('tags');
    Schema::dropIfExists('article_tag');
  }
};
