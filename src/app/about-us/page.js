import MainLayout from 'src/layouts/main';
import ElearningAboutView from 'src/sections/_elearning/view/elearning-about-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Coming Soon',
};

export default function ComingSoonPage() {
  return (
    <MainLayout>
      <ElearningAboutView />
    </MainLayout>
  );
}
