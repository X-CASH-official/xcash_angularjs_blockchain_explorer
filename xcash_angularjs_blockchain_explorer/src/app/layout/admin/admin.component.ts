import {Component, Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import {MenuItems} from '../../shared/menu-items/menu-items';
import {httpdataservice} from '../../services/http-request.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('notificationBottom', [
      state('an-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('an-animate',
        style({
          overflow: 'hidden',
          height: AUTO_STYLE,
        })
      ),
      transition('an-off <=> an-animate', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        width: '300px',
        // transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        width: '0',
        // transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('mobileHeaderNavRight', [
      state('nav-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('nav-on',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('nav-off <=> nav-on', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  public navType: string;
  public themeLayout: string;
  public verticalPlacement: string;
  public verticalLayout: string;
  public pcodedDeviceType: string;
  public verticalNavType: string;
  public verticalEffect: string;
  public vnavigationView: string;
  public freamType: string;
  public sidebarImg: string;
  public sidebarImgType: string;
  public layoutType: string;

  public headerTheme: string;
  public pcodedHeaderPosition: string;

  public liveNotification: string;
  public liveNotificationClass: string;

  public profileNotification: string;
  public profileNotificationClass: string;

  public chatSlideInOut: string;
  public innerChatSlideInOut: string;

  public searchWidth: number;
  public searchWidthString: string;

  public navRight: string;
  public windowWidth: number;
  public chatTopPosition: string;

  public toggleOn: boolean;
  public navBarTheme: string;
  public activeItemTheme: string;
  public pcodedSidebarPosition: string;

  public menuTitleTheme: string;
  public dropDownIcon: string;
  public subItemIcon: string;

  public configOpenRightBar: string;
  public displayBoxLayout: string;
  public isVerticalLayoutChecked: boolean;
  public isSidebarChecked: boolean;
  public isHeaderChecked: boolean;
  public headerFixedMargin: string;
  public sidebarFixedHeight: string;
  public itemBorderStyle: string;
  public subItemBorder: boolean;
  public itemBorder: boolean;

  public config: any;
  
  constructor(public menuItems: MenuItems,private httpdataservice: httpdataservice,public router: Router) {
    this.navType = 'st1';
    this.themeLayout = 'horizontal'; // vertical
    this.verticalPlacement = 'left';
    this.verticalLayout = 'wide';
    this.pcodedDeviceType = 'desktop';
    this.verticalNavType = 'expanded';
    this.verticalEffect = 'shrink';
    this.vnavigationView = 'view1';
    this.freamType = 'theme1';
    this.sidebarImg = 'false';
    this.sidebarImgType = 'img1';
    this.layoutType = 'dark';

    this.headerTheme = 'theme1';
    this.pcodedHeaderPosition = 'fixed';

    this.liveNotification = 'an-off';
    this.profileNotification = 'an-off';

    this.chatSlideInOut = 'out';
    this.innerChatSlideInOut = 'out';

    this.searchWidth = 0;

    this.navRight = 'nav-on';

    this.windowWidth = window.innerWidth;
    this.setHeaderAttributes(this.windowWidth);

    this.toggleOn = true;
    this.navBarTheme = 'theme1';
    this.activeItemTheme = 'theme1';
    this.pcodedSidebarPosition = 'fixed';
    this.menuTitleTheme = 'theme6';
    this.dropDownIcon = 'style1';
    this.subItemIcon = 'style1';

    this.displayBoxLayout = 'd-none';
    this.isVerticalLayoutChecked = false;
    this.isSidebarChecked = true;
    this.isHeaderChecked = true;
    this.headerFixedMargin = '56px';
    this.sidebarFixedHeight = 'calc(100vh - 56px)';
    this.itemBorderStyle = 'none';
    this.subItemBorder = true;
    this.itemBorder = true;

    this.setMenuAttributes(this.windowWidth);
    this.setHeaderAttributes(this.windowWidth);
  }

  ngOnInit() {
    this.setBackgroundPattern('pattern1');
    this.resizetxdatasearch();
  }

  onResize(event) {
    this.windowWidth = event.target.innerWidth;
    this.setHeaderAttributes(this.windowWidth);
    this.resizetxdatasearch();

    let reSizeFlag = true;
    if (this.pcodedDeviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.pcodedDeviceType === 'phone' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    /* for check device */
    if (reSizeFlag) {
      this.setMenuAttributes(this.windowWidth);
    }
  }

  setHeaderAttributes(windowWidth) {
    if (windowWidth < 992) {
      this.navRight = 'nav-off';
    } else {
      this.navRight = 'nav-on';
    }
  }

  setMenuAttributes(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.pcodedDeviceType = 'tablet';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else if (windowWidth < 768) {
      this.pcodedDeviceType = 'phone';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.pcodedDeviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
  }

  toggleHeaderNavRight() {
    this.navRight = this.navRight === 'nav-on' ? 'nav-off' : 'nav-on';
    this.chatTopPosition = this.chatTopPosition === 'nav-on' ? '112px' : '';
    if (this.navRight === 'nav-off' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.navRight === 'nav-off' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  toggleLiveNotification() {
    this.liveNotification = this.liveNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.liveNotificationClass = this.liveNotification === 'an-animate' ? 'active' : '';

    if (this.liveNotification === 'an-animate' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.liveNotification === 'an-animate' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  toggleProfileNotification() {
    this.profileNotification = this.profileNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.profileNotificationClass = this.profileNotification === 'an-animate' ? 'active' : '';

    if (this.profileNotification === 'an-animate' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.profileNotification === 'an-animate' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  notificationOutsideClick(ele: string) {
    if (ele === 'live' && this.liveNotification === 'an-animate') {
      this.toggleLiveNotification();
    } else if (ele === 'profile' && this.profileNotification === 'an-animate') {
      this.toggleProfileNotification();
    }
  }

  toggleChat() {
    this.chatSlideInOut = this.chatSlideInOut === 'out' ? 'in' : 'out';
    if (this.innerChatSlideInOut === 'in') {
      this.innerChatSlideInOut = 'out';
    }
  }

  toggleInnerChat() {
    this.innerChatSlideInOut = this.innerChatSlideInOut === 'out' ? 'in' : 'out';
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  resizetxdatasearch() {
    document.querySelector('#main-search').classList.add('open');
    this.searchWidth = window.innerWidth / 1.8;
    this.searchWidthString = this.searchWidth + 'px';
   /*const searchInterval = setInterval(() => {
      if (this.searchWidth >= 200) {
        clearInterval(searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth + 15;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);*/
  }

  cleartxdatasearch() {
    (<HTMLInputElement>document.getElementById("txdatasearchtextbox")).value = "";    
  }

  txdatasearch(txdata:string) {
    var data:string = "settings=" + txdata;
    (<HTMLInputElement>document.getElementById("txdatasearchtextbox")).value = "";  
    this.httpdataservice.post_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_BLOCKCHAIN_DATA_SETTINGS,data).subscribe(
      (res) =>
      {
        if (JSON.stringify(res).indexOf("Error") !== -1 || (Object.keys(res).length === 0 && res.constructor === Object))
        {
          this.openMyModal('effect-1');
        }
        else
        {
          var settings = res["settings"];
          if (settings === "block_height" || settings === "block_hash")
          {              
             this.router.navigate(['/Block'],{queryParams:{"data":txdata}}); 
          }
          else if (settings === "block_reward_transaction")
          {              
             this.router.navigate(['/BlockRewardTransaction'],{queryParams:{"data":txdata}}); 
          }
          else if (settings === "transaction")
          {              
             this.router.navigate(['/Transaction'],{queryParams:{"data":txdata}}); 
          }
          else if (settings === "encrypted_payment_id" || settings === "unencrypted_payment_id" || settings === "public_address" || settings === "stealth_address" || settings === "tx_public_key" || settings === "tx_private_key")
          {              
             this.router.navigate(['/TXSearchResults'],{queryParams:{"data":settings + "|" + txdata}}); 
          }         
        }        
      },
      (error) => 
      {
        this.openMyModal('effect-1');
      }
    );
  }

  toggleOpened() {
    if (this.windowWidth < 992) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
      if (this.navRight === 'nav-on') {
        this.toggleHeaderNavRight();
      }
    }
    this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    document.querySelector('#main_navbar').classList.toggle('show-menu');
  }

  onClickedOutsideSidebar(e: Event) {
    if ((this.windowWidth < 992 && this.toggleOn && this.verticalNavType !== 'offcanvas') || this.verticalEffect === 'overlay') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
      document.querySelector('#main_navbar').classList.remove('show-menu');
    }
  }

  toggleRightbar() {
    this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
  }

  setNavBarTheme(theme: string) {
    if (theme === 'themelight1') {
      this.navBarTheme = 'themelight1';
      this.menuTitleTheme = 'theme1';
      this.sidebarImg = 'false';
    } else {
      this.menuTitleTheme = 'theme6';
      this.navBarTheme = 'theme1';
      this.sidebarImg = 'false';
    }
  }

  setLayoutType(type: string) {
    this.layoutType = type;
    if (type === 'dark') {
      this.headerTheme = 'theme1';
      this.sidebarImg = 'false';
      this.navBarTheme = 'theme1';
      this.menuTitleTheme = 'theme6';
      document.querySelector('body').classList.add('dark');
    } else if (type === 'light') {
      this.sidebarImg = 'false';
      this.headerTheme = 'theme5';
      this.navBarTheme = 'themelight1';
      this.menuTitleTheme = 'theme1';
      document.querySelector('body').classList.remove('dark');
    } else if (type === 'img') {
      this.sidebarImg = 'true';
      this.headerTheme = 'theme1';
      this.navBarTheme = 'theme1';
      this.menuTitleTheme = 'theme6';
      document.querySelector('body').classList.remove('dark');
    }
  }

  setVerticalLayout() {
    this.isVerticalLayoutChecked = !this.isVerticalLayoutChecked;
    if (this.isVerticalLayoutChecked) {
      this.verticalLayout = 'box';
      this.displayBoxLayout = '';
    } else {
      this.verticalLayout = 'wide';
      this.displayBoxLayout = 'd-none';
    }
  }

  setBackgroundPattern(pattern: string) {
    document.querySelector('body').setAttribute('themebg-pattern', pattern);
  }

  setSidebarPosition() {
    this.isSidebarChecked = !this.isSidebarChecked;
    this.pcodedSidebarPosition = this.isSidebarChecked === true ? 'fixed' : 'absolute';
    this.sidebarFixedHeight = this.isHeaderChecked === true ? 'calc(100vh + 56px)' : 'calc(100vh - 56px)';
  }

  setHeaderPosition() {
    this.isHeaderChecked = !this.isHeaderChecked;
    this.pcodedHeaderPosition = this.isHeaderChecked === true ? 'fixed' : 'relative';
    this.headerFixedMargin = this.isHeaderChecked === true ? '56px' : '';
  }

}
