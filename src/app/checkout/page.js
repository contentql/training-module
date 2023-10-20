import MainLayout from 'src/layouts/main';
import ProtectedRoute from 'src/routes/components/protected-route';
import ElearningCheckoutView from 'src/sections/_elearning/view/elearning-checkout-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Checkout',
};

export default function ElearningCoursesPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <ElearningCheckoutView />
      </MainLayout>
    </ProtectedRoute>
  );
}
