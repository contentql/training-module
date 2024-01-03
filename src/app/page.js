import { ToastContainer } from 'react-toastify';

import MainLayout from 'src/layouts/main';
import ElearningLandingView from 'src/sections/_elearning/view/elearning-landing-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Ryzolve Training Module',
};

export default function HomePage() {
  return (
    <MainLayout>
      <ElearningLandingView />
      <ToastContainer />
    </MainLayout>
  );
}
