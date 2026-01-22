import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import Projects from '@/components/Projects';
// We can reuse the Projects component or build a more detailed list here
// For now, reusing the component to ensure content appears immediately.

export default function ProjectsPage() {
    const breadcrumbs = [{ label: '実績紹介', href: '' }];

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 'var(--header-height)' }}>
                <SubpageHeader
                    titleEn="PROJECTS"
                    titleJa="実績紹介 "
                    breadcrumbs={breadcrumbs}
                />

                {/* Reuse the Projects section for now as the main content */}
                {/* Once Notion content is provided, we can detail this further */}
                <Projects />

                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center', color: '#666' }}>
                    <p>※ 詳細な開発実績やNotion記事の内容をここに反映いたします。</p>
                </div>

            </main>
            <Footer />
        </>
    );
}
