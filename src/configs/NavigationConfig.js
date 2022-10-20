import { 
  DashboardOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  PictureOutlined,
  GiftOutlined,
  ShopOutlined,
  TeamOutlined,
  MailOutlined,
  MobileOutlined,
  SettingOutlined,
  FileTextOutlined,
  DeploymentUnitOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const mainNavTree = [{
  key: 'main',
  path: `${APP_PREFIX_PATH}/main`,
  title: 'sidenav.main',
  icon: DashboardOutlined,
  breadcrumb: true,
  submenu: [
    {
      key: 'dashboard',
      path: `${APP_PREFIX_PATH}/main/dashboard`,
      title: 'sidenav.main.dashboard',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'catalog',
      path: `${APP_PREFIX_PATH}/main/catalog`,
      title: 'sidenav.main.catalog',
      icon: ShoppingCartOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'products',
          path: `${APP_PREFIX_PATH}/main/catalog/products`,
          title: 'sidenav.main.catalog.products',
          // icon: DashboardOutlined,
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'categories',
          path: `${APP_PREFIX_PATH}/main/catalog/categories`,
          title: 'sidenav.main.catalog.categories',
          // icon: DashboardOutlined,
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'collections',
          path: `${APP_PREFIX_PATH}/main/catalog/collections`,
          title: 'sidenav.main.catalog.collections',
          // icon: DashboardOutlined,
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'combo',
          path: `${APP_PREFIX_PATH}/main/catalog/combo`,
          title: 'sidenav.main.catalog.combo',
          // icon: DashboardOutlined,
          breadcrumb: false,
          submenu: []
        },
      ]
    },
    {
      key: 'orders',
      path: `${APP_PREFIX_PATH}/main/orders`,
      title: 'sidenav.main.orders',
      icon: ShoppingOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'clients',
      path: `${APP_PREFIX_PATH}/main/clients`,
      title: 'sidenav.main.clients',
      icon: UserOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'list',
          path: `${APP_PREFIX_PATH}/main/clients/list`,
          title: 'sidenav.main.clients.list',
          // icon: DashboardOutlined,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'groups',
          path: `${APP_PREFIX_PATH}/main/clients/groups`,
          title: 'sidenav.main.clients.groups',
          // icon: DashboardOutlined,
          breadcrumb: true,
          submenu: []
        },
      ]
    },
    {
      key: 'banners',
      path: `${APP_PREFIX_PATH}/main/banners`,
      title: 'sidenav.main.banners',
      icon: PictureOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'promo_code',
      path: `${APP_PREFIX_PATH}/main/promo_code`,
      title: 'sidenav.main.promo_code',
      icon: GiftOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'offline_points',
      path: `${APP_PREFIX_PATH}/main/offline_points`,
      title: 'sidenav.main.offline_points',
      icon: ShopOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'list_points',
          path: `${APP_PREFIX_PATH}/main/offline_points/addresses`,
          title: 'sidenav.main.offline_points.addresses',
          // icon: DashboardOutlined,
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'groups_points',
          path: `${APP_PREFIX_PATH}/main/offline_points/geofences`,
          title: 'sidenav.main.offline_points.geofences',
          // icon: DashboardOutlined,
          breadcrumb: false,
          submenu: []
        },
      ]
    },
    {
      key: 'employees',
      path: `${APP_PREFIX_PATH}/main/employees`,
      title: 'sidenav.main.employees',
      icon: TeamOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'mailing_lists',
      path: `${APP_PREFIX_PATH}/main/mailing_lists`,
      title: 'sidenav.main.mailing_lists',
      icon: MailOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'scheduler',
      path: `${APP_PREFIX_PATH}/main/scheduler`,
      title: 'sidenav.main.scheduler',
      icon: DeploymentUnitOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const systemsNavTree = [{
  key: 'systems',
  path: `${APP_PREFIX_PATH}/systems`,
  title: 'sidenav.systems',
  icon: SettingOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'settings',
      path: `${APP_PREFIX_PATH}/systems/settings`,
      title: 'sidenav.systems.settings',
      icon: SettingOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'mobile_app',
      path: `${APP_PREFIX_PATH}/systems/mobile_app`,
      title: 'sidenav.systems.mobile_app',
      icon: MobileOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'logs',
      path: `${APP_PREFIX_PATH}/systems/logs`,
      title: 'sidenav.systems.logs',
      icon: FileTextOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const navigationConfig = [
  ...mainNavTree,
  ...systemsNavTree
]

export default navigationConfig;
