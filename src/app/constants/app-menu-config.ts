import { MenuItem } from 'primeng/api';

const APP_MENU_CONFIG: MenuItem[] = [
  {
    label: 'Dashboard',
    routerLink: '/dashboard',
  },
  {
    label: 'Giám sát',
    routerLink: '/monitoring',
  },
  {
    label: 'Nhận dạng',
    routerLink: '/recognition',
  },
  {
    label: 'Bản đồ',
    routerLink: '/map',
  },
  {
    label: 'Quản lý',
    routerLink: '/management',
  },
];

const USER_MENU_CONFIG: MenuItem[] = [
  {
    label: 'Profile',
    icon: 'pi pi-user',
    routerLink: '/profile',
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
  },
];

export { APP_MENU_CONFIG, USER_MENU_CONFIG };
