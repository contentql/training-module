import MainLayout from 'src/layouts/main';
import ElearningCartView from 'src/sections/_elearning/view/elearning-cart-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Cart Checkout',
};

export default function ElearningCoursesPage() {
  return (
    <MainLayout>
      <ElearningCartView />
    </MainLayout>
  );
}
