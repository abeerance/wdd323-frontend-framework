<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        // Create the images table
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('pathname')->unique();
            $table->foreignId('article_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps(); 
        });
    }

    public function down() {
        Schema::dropIfExists('images');
    }
};