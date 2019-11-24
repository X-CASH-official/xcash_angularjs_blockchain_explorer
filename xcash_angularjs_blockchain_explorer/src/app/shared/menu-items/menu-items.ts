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
        icon: 'fa fa-key'
      },
      {
        state: 'VerifyReserveProof',
        short_label: 'S',
        name: 'Verify Reserve Proof',
        type: 'link',
        icon: 'fa fa-key'
      },
      {
        state: 'CreateIntegratedAddress',
        short_label: 'S',
        name: 'Create Integrated Address',
        type: 'link',
        icon: 'fa fa-shopping-cart'
      },
      {
        state: 'SendHexadecimalTX',
        short_label: 'S',
        name: 'Send Hexadecimal TX',
        type: 'link',
        icon: 'fa fa-send'
      },
      {
        state: 'SegregatedFunds',
        short_label: 'S',
        name: 'Segregated Funds',
        type: 'link',
        icon: 'fa fa-database'
      },
      {
        state: 'NodesList',
        short_label: 'S',
        name: 'Nodes List',
        type: 'link',
        icon: 'fa fa-cloud'
      },
      {
        state: 'Price',
        short_label: 'S',
        name: 'Price',
        type: 'link',
        icon: 'fa fa-database'
      },
      {
        state: 'API',
        short_label: 'S',
        name: 'API',
        type: 'link',
        icon: 'fa fa-cloud'
      },
      {
        state: 'Statistics',
        short_label: 'S',
        name: 'Statistics',
        type: 'link',
        icon: 'fa fa-dashboard'
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
