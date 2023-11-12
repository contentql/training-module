import Script from 'next/script';

import MainLayout from 'src/layouts/main';
import ElearningPurchaseCompletedView from 'src/sections/_elearning/view/elearning-purchase-completed-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Purchase Completed',
};

export default function ElearningPurchaseCompletedPage() {
  return (
    <MainLayout>
      <Script
        type="text/javascript"
        src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js"
      />
      <ElearningPurchaseCompletedView />;
    </MainLayout>
  );
}
