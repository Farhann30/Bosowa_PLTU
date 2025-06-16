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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable();
            $table->string('company_name')->nullable();
            $table->string('company_id_card')->nullable();
            $table->string('face_photo')->nullable();
            $table->string('id_card_photo')->nullable();
            $table->string('company_id_card_photo')->nullable();
            $table->enum('verification_status', ['pending', 'verified', 'rejected'])->default('pending');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone',
                'company_name',
                'company_id_card',
                'face_photo',
                'id_card_photo',
                'company_id_card_photo',
                'verification_status'
            ]);
        });
    }
};
