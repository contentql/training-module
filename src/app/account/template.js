'use client';

import PropTypes from 'prop-types';

import MainLayout from 'src/layouts/main';
import AccountLayout from 'src/layouts/account';
import ProtectedRoute from 'src/routes/components/protected-route';

// ----------------------------------------------------------------------

export default function Template({ children }) {
  return (
    <ProtectedRoute>
      <MainLayout>
        <AccountLayout>{children}</AccountLayout>
      </MainLayout>
    </ProtectedRoute>
  );
}

Template.propTypes = {
  children: PropTypes.node,
};
