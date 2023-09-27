import MainLayout from 'src/layouts/main';
import ComingSoonView from 'src/sections/status/view/coming-soon-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Coming Soon',
};

export default function ComingSoonPage() {
  return (
    <MainLayout>
      <div className="flex justify-center text-center">
        <div>
          <ComingSoonView />
        </div>
      </div>
    </MainLayout>
  );
}
