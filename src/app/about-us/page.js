import MainLayout from 'src/layouts/main';
import ComingSoonView from 'src/sections/status/view/coming-soon-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Coming Soon',
};

export default function ComingSoonPage() {
  const completedOn = '11/30/2023 23:59';

  return (
    <MainLayout>
      <div className="flex justify-center text-center">
        <div>
          <ComingSoonView date={completedOn} />
        </div>
      </div>
    </MainLayout>
  );
}
