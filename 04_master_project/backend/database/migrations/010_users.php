<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  function up() {
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('email');
      $table->string('password');
      $table->timestamp('created_at');
      $table->timestamp('updated_at');
    });
  }

  function down() {
    Schema::dropIfExists('users');
  }
};
