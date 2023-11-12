import Script from 'next/script';

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
      <Script
        type="text/javascript"
        src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js"
      />
      <MainLayout>
        <ElearningCheckoutView />
      </MainLayout>
    </ProtectedRoute>
  );
}
