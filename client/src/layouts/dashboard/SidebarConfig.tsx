import { PATH_DASHBOARD } from 'routes/paths';
import SvgIconStyle from 'components/common/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  dashboard: getIcon('ic_dashboard'),
  car: getIcon('ic_dashboard'),
  booking: getIcon('ic_dashboard'),
  contract: getIcon('ic_dashboard'),
  insurance: getIcon('ic_dashboard'),
  addon: getIcon('ic_dashboard'),
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
      // MANAGEMENT : CAR
      {
        title: 'car',
        path: PATH_DASHBOARD.car.root,
        icon: ICONS.car,
        children: [
          { title: 'list', path: PATH_DASHBOARD.car.list },
          { title: 'create', path: PATH_DASHBOARD.car.new },
        ]
      },
      // MANAGEMENT : Booking
      {
        title: 'booking',
        path: PATH_DASHBOARD.booking.root,
        icon: ICONS.booking,
        children: [
          { title: 'list', path: PATH_DASHBOARD.booking.list },
        ]
      },
      // MANAGEMENT : Contract
      {
        title: 'contract',
        path: PATH_DASHBOARD.contract.root,
        icon: ICONS.contract,
        children: [
          { title: 'list', path: PATH_DASHBOARD.contract.list },
          { title: 'create', path: PATH_DASHBOARD.contract.new },
        ]
      },
      // MANAGEMENT : Insurance
      {
        title: 'insurance',
        path: PATH_DASHBOARD.insurance.root,
        icon: ICONS.insurance,
        children: [
          { title: 'list', path: PATH_DASHBOARD.insurance.list },
          { title: 'create', path: PATH_DASHBOARD.insurance.new },
        ]
      },
      // MANAGEMENT : Addon
      {
        title: 'addon',
        path: PATH_DASHBOARD.addon.root,
        icon: ICONS.addon,
        children: [
          { title: 'list', path: PATH_DASHBOARD.addon.list },
          { title: 'create', path: PATH_DASHBOARD.addon.new },
        ]
      },
    ]
  },
];

export default sidebarConfig;
