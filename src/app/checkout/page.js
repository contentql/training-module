import MainLayout from 'src/layouts/main';
import ElearningCheckoutView from 'src/sections/_elearning/view/elearning-checkout-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Checkout',
};

export default function ElearningCoursesPage() {
  return (
    <MainLayout>
      <ElearningCheckoutView />
    </MainLayout>
  );
}
