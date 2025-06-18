<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\UrlGenerator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(UrlGenerator $url): void
    {
        if(config('app.env') !== 'local')
        {
            $url->forceSchema('https');
        }

        DB::listen(function ($query) {
            \Log::info($query->sql, $query->bindings);
        });
    }
}
