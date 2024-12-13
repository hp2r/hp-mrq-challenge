import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '@/components/Loading';

const SymbolsView = lazy(() => import('@/components/SymbolsView'));
const ProfileView = lazy(() => import('@/components/ProfileView'));
const StatementsView = lazy(() => import('@/components/StatementsView'));

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index element={<SymbolsView />} />
        <Route index path="profile" element={<ProfileView />} />
        <Route index path="statements" element={<StatementsView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
