import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import Projects from '@/components/Projects';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function ProjectsPage() {
    const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
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
                <Projects projects={projectsData || []} />

                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center', color: '#666' }}>
                    <p>※ 詳細な開発実績やNotion記事の内容をここに反映いたします。</p>
                </div>

            </main>
            <Footer />
        </>
    );
}
