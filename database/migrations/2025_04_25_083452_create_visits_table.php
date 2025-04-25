<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->date('visit_date');
            $table->time('visit_time_start');
            $table->time('visit_time_end');
            $table->string('building_type');
            $table->string('building_category');
            $table->string('agenda');
            $table->string('meet_with');
            $table->text('notes')->nullable();
            $table->string('phone');
            $table->string('email');
            $table->string('status')->default('pending');  // pending, approved, rejected, expired
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
