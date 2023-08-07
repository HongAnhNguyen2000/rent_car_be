import { PATH_DASHBOARD } from 'routes/paths';
import SvgIconStyle from 'components/common/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  dashboard: getIcon('ic_dashboard'),
};

const sidebarConfig = [
  // GENERAL
  {
    subheader: 'general',
    items: [
      {
        title: 'app',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
    ]
  },

  // MANAGEMENT
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'edit', path: PATH_DASHBOARD.user.editById },
          { title: 'account', path: PATH_DASHBOARD.user.account }
        ]
      },
    ]
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
  }
];

export default sidebarConfig;
