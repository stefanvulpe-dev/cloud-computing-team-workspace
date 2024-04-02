import { UserCard } from './UserCard.tsx';
import { SidebarNav } from './SidebarNav.tsx';
import { AppLogo } from '../AppLogo.tsx';

export function SidebarContent() {
  return (
    <>
      <AppLogo logoWidth={'200px'} />
      <UserCard />
      <SidebarNav />
    </>
  );
}
