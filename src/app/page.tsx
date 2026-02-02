import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Lineup from '@/components/Lineup';
import Projects from '@/components/Projects';
import CompanyProfile from '@/components/CompanyProfile';
import Contact from '@/components/Contact';
import Career from '@/components/Career';
import Career from '@/components/Career';

import Mission from '@/components/Mission';
import News from '@/components/News';

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}> {/* Add padding for fixed navbar */}
        <Hero />
        <Mission />
        <Lineup />
        <CompanyProfile />
        <Career />
        <Projects />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
