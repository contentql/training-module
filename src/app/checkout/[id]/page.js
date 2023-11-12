import Script from 'next/script';
import PropTypes from 'prop-types';

import MainLayout from 'src/layouts/main';
import ElearningCheckoutView from 'src/sections/_elearning/view/elearning-checkout-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Checkout',
};

export default function ElearningCoursesPage({ params }) {
  return (
    <MainLayout>
      <Script
        type="text/javascript"
        src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js"
      />
      <ElearningCheckoutView courseId={params.id} />
    </MainLayout>
  );
}

ElearningCoursesPage.propTypes = {
  params: PropTypes.object,
};
