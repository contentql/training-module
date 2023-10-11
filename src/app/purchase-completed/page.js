import MainLayout from 'src/layouts/main';
import ElearningPurchaseCompletedView from 'src/sections/_elearning/view/elearning-purchase-completed-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Purchase Completed',
};

export default function ElearningPurchaseCompletedPage() {
  return (
    <MainLayout>
      <ElearningPurchaseCompletedView />;
    </MainLayout>
  );
}
