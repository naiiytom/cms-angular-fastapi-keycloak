import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Editor Zone',
    group: true,
  },
  {
    title: 'Edit FAQ Dialogue',
    link: '/pages/edit/faq',
    icon: 'edit-outline',
  },
  {
    title: 'Edit KB Dialogue',
    link: '/pages/edit/kb',
    icon: 'edit-outline',
  },
  {
    title: 'Edit Keywords/Synonyms',
    link: '/pages/edit/synonym',
    icon: 'edit-outline',
  },
  {
    title: 'Insurance Premium Table',
    link: '/pages/edit/insurance-premium-table',
    icon: 'edit-outline',
  },
  {
    title: 'Disease Table',
    link: '/pages/edit/disease-table',
    icon: 'edit-outline',
  },
  {
    title: 'Export Zone',
    group: true,
  },
  {
    title: 'Export Edit Hitory',
    link: '/pages/export/edit-history',
    icon: 'file-outline',
  },
  {
    title: 'Export Chat Log',
    link: '/pages/export/chat-log',
    icon: 'file-outline',
  },
];
