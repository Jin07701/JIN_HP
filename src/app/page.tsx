import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Lineup from '@/components/Lineup';
import Projects from '@/components/Projects';
import CompanyProfile from '@/components/CompanyProfile';
import Contact from '@/components/Contact';
import Career from '@/components/Career';


import Mission from '@/components/Mission';
import News from '@/components/News';
import { supabase } from '@/lib/supabase';

async function getSiteSettings() {
  const { data } = await supabase.from('site_settings').select('setting_key, setting_value');
  const settingsObj: Record<string, string> = {};
  if (data) {
    data.forEach(item => {
      settingsObj[item.setting_key] = item.setting_value;
    });
  }
  return settingsObj;
}

export const revalidate = 0; // Disable cache to see CMS changes immediately

export default async function Home() {
  const settings = await getSiteSettings();
  
  // Fetch dynamic collections
  const { data: newsData } = await supabase.from('news').select('*').order('created_at', { ascending: false });
  const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  const { data: careersData } = await supabase.from('careers').select('*').order('year', { ascending: false });

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}> {/* Add padding for fixed navbar */}
        <Hero settings={settings} />
        <Mission />
        <Lineup />
        <CompanyProfile settings={settings} />
        <Career careers={careersData || []} />
        <Projects projects={projectsData || []} />
        <News news={newsData || []} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
