<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('visits', function (Blueprint $table) {
            $table->unsignedBigInteger('pic_id')->nullable()->after('user_id');
            $table->foreign('pic_id')->references('id')->on('pics')->onDelete('set null');
            $table->dropColumn('meet_with');
        });
    }

    public function down()
    {
        Schema::table('visits', function (Blueprint $table) {
            $table->string('meet_with')->after('agenda');
            $table->dropForeign(['pic_id']);
            $table->dropColumn('pic_id');
        });
    }
}; 