import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'My Panel',
    main: [
      {
        state: 'Explorer',
        short_label: 'S',
        name: 'Explorer',
        type: 'link',
        icon: 'fa fa-cubes'
      },
      {
        state: 'TXPool',
        short_label: 'S',
        name: 'TX Pool',
        type: 'link',
        icon: 'fa fa-bars'
      },
      {
        state: 'DecodeTX',
        short_label: 'S',
        name: 'Decode TX',
        type: 'link',
        icon: 'fa fa-unlock'
      },
      {
        state: 'VerifySender',
        short_label: 'S',
        name: 'Verify Sender',
        type: 'link',
        icon: 'fa fa-check-circle'
      },
      {
        state: 'VerifyReserveProof',
        short_label: 'S',
        name: 'Verify Res. Proof',
        type: 'link',
        icon: 'fa fa-check-circle'
      },
      {
        state: 'CreateIntegratedAddress',
        short_label: 'S',
        name: 'Integr. Addr.',
        type: 'link',
        icon: 'fa fa-plus'
      },
      {
        state: 'SendHexadecimalTX',
        short_label: 'S',
        name: 'Send HEX TX',
        type: 'link',
        icon: 'fa fa-send'
      },
      {
        state: 'SegregatedFunds',
        short_label: 'S',
        name: 'Funds',
        type: 'link',
        icon: 'fa fa-database'
      },
      // {
      //   state: 'NodesList',
      //   short_label: 'S',
      //   name: 'Nodes',
      //   type: 'link',
      //   icon: 'fa fa-list'
      // },
      // {
      //   state: 'Price',
      //   short_label: 'S',
      //   name: 'Price',
      //   type: 'link',
      //   icon: 'fa fa-database'
      // },
      {
        state: 'Statistics',
        short_label: 'S',
        name: 'Stats',
        type: 'link',
        icon: 'fa fa-dashboard'

      },
      {
        state: 'API',
        short_label: 'S',
        name: 'API',
        type: 'link',
        icon: 'fa fa-cloud'
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
