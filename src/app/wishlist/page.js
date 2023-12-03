import MainLayout from 'src/layouts/main';
import EcommerceWishlistView from 'src/sections/wishlist/wishlist-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Wishlist',
};

export default function EcommerceWishlistPage() {
  return (
    <MainLayout>
      <EcommerceWishlistView />
    </MainLayout>
  );
}
