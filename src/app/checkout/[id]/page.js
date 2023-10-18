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
      <ElearningCheckoutView courseId={params.id} />
    </MainLayout>
  );
}

ElearningCoursesPage.propTypes = {
  params: PropTypes.object,
};
