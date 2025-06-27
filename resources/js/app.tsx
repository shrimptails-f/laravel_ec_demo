import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Layout from '@/layouts/layout';

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx');
        const page = (await resolvePageComponent(
            `./Pages/${name}.tsx`,
            pages,
        )) as {
            default: React.ComponentType & {
                layout?: (page: React.JSX.Element) => React.JSX.Element;
            };
        };

        // `layout` がない場合はデフォルトで `Layout` を適用
        page.default.layout =
            page.default.layout ||
            ((page: React.JSX.Element) => <Layout>{page}</Layout>);

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
