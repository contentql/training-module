import MainLayout from 'src/layouts/main';
import ElearningContactView from 'src/sections/_elearning/view/elearning-contact-view';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Contact',
};

export default function EcommerceContactPage() {
  return (
    <MainLayout>
      <ElearningContactView />
    </MainLayout>
  );
}
