<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  function up() {
    Schema::create('personal_access_tokens', function (Blueprint $table) {
      $table->id();
      $table->morphs('tokenable');
      $table->string('name');
      $table->string('token', 64)->unique();
      $table->text('abilities')->nullable();
      $table->timestamp('last_used_at')->nullable();
      $table->timestamp('expires_at')->nullable();
      $table->timestamp('created_at');
      $table->timestamp('updated_at');
    });
  }

  function down() {
    Schema::dropIfExists('personal_access_tokens');
  }
};
