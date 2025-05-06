import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Set up app name from environment variable or default value
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Create Inertia app
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Cek jika halaman berada di folder adminPages
        if (name.startsWith('adminPages/')) {
            return resolvePageComponent(
                `./Pages/adminPages/${name.replace('adminPages/', '')}.jsx`,
                import.meta.glob('./Pages/adminPages/**/*.jsx') // Periksa folder adminPages
            );
        }

        // Jika tidak, cari halaman di folder Pages biasa
        return resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx') // Periksa folder Pages
        );
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Wrap the App with Router so Link can work properly
        root.render(
            <Router>
                <App {...props} />
            </Router>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
