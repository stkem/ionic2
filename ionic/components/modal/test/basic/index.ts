import {App, Page, IonicApp, Config, Platform} from 'ionic/ionic';
import {Modal, ActionSheet, NavController, NavParams, Animation} from 'ionic/ionic';


@App({
  templateUrl: 'main.html'
})
class MyAppCmp {

  constructor(modal: Modal, app: IonicApp, config: Config, platform: Platform) {
    this.modal = modal;

    console.log('platforms', platform.platforms());
    console.log('mode', config.get('mode'));

    console.log('core', platform.is('core'))
    console.log('cordova', platform.is('cordova'))
    console.log('mobile', platform.is('mobile'))
    console.log('ipad', platform.is('ipad'))
    console.log('iphone', platform.is('iphone'))
    console.log('phablet', platform.is('phablet'))
    console.log('tablet', platform.is('tablet'))
    console.log('ios', platform.is('ios'))
    console.log('android', platform.is('android'))
    console.log('windows phone', platform.is('windowsphone'))

    platform.ready().then(() => {
      console.log('platform.ready')
    });
  }

  openModal() {
    this.modal.open(PlainPage);
  }

  openToolbarModal() {
    this.modal.open(ToolbarModal);
  }

  openModalChildNav() {
    this.modal.open(ContactModal, {
      handle: 'my-awesome-modal'
    });
  }

  openModalCustomAnimation() {
    this.modal.open(ContactModal, {
      enterAnimation: 'my-fade-in',
      leaveAnimation: 'my-fade-out'
    });
  }
}


@Page({
  template: `
    <p>Plain Page in a modal</p>
    <p>Not inside of ion-content</p>
    <p><button (click)="closeModal()">Close Modal</button></p>
  `
})
class PlainPage {
  constructor(private modal: Modal) {}

  closeModal() {
    this.modal.get().close();
  }
}

@Page({
  template: `
    <ion-toolbar>
      <ion-title>Modals</ion-title>
    </ion-toolbar>
    <ion-toolbar primary>
      <ion-title>Another toolbar</ion-title>
    </ion-toolbar>


    <ion-content padding>
        <button block danger (click)="closeModal()" class="e2eCloseToolbarModal">
          <icon close></icon>
          Close Modal
        </button>
    </ion-content>
  `
})
class ToolbarModal {
  constructor(private modal: Modal) {}

  closeModal() {
    this.modal.get().close();
  }
}


@Page({
  template: '<ion-nav [root]="rootView"></ion-nav>'
})
class ContactModal {
  constructor() {
    console.log('ContactModal constructor')
    this.rootView = ModalFirstPage;
  }
  onPageLoaded() {
    console.log('ContactModal onPageLoaded');
  }
  onPageWillEnter() {
    console.log('ContactModal onPageWillEnter');
  }
  onPageDidEnter() {
    console.log('ContactModal onPageDidEnter');
  }
  onPageWillLeave() {
    console.log('ContactModal onPageWillLeave');
  }
  onPageDidLeave() {
    console.log('ContactModal onPageDidLeave');
  }
  onPageWillUnload() {
    console.log('ContactModal onPageWillUnload');
  }
  onPageDidUnload() {
    console.log('ContactModal onPageDidUnload');
  }
}


@Page({
  template: `
    <ion-navbar *navbar><ion-title>First Page Header</ion-title><ion-nav-items primary><button class="e2eCloseMenu" (click)="closeModal()">Close</button></ion-nav-items></ion-navbar>
    <ion-content padding>
      <p>
        <button (click)="push()">Push (Go to 2nd)</button>
      </p>
      <p>
        <button (click)="openActionSheet()">Open Action Sheet</button>
      </p>
      <p>
        <button (click)="closeByHandeModal()">Close By Handle</button>
      </p>
      <f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f>
      <f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f>
    </ion-content>
  `
})
class ModalFirstPage {
  constructor(
    nav: NavController,
    modal: Modal,
    actionSheet: ActionSheet
  ) {
    this.nav = nav;
    this.modal = modal;
    this.actionSheet = actionSheet;
  }

  push() {
    this.nav.push(ModalSecondPage, { id: 8675309, myData: [1,2,3,4] }, { animation: 'ios' });
  }

  closeModal() {
    let modal = this.modal.get();
    modal.close();
  }

  closeByHandeModal() {
    let modal = this.modal.get('my-awesome-modal');
    modal.close();
  }

  openActionSheet() {
    this.actionSheet.open({
      buttons: [
        { text: 'Share This' },
        { text: 'Move' }
      ],
      destructiveText: 'Delete',
      titleText: 'Modify your album',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Canceled');
      },
      destructiveButtonClicked: () => {
        console.log('Destructive clicked');
      },
      buttonClicked: function(index) {
        console.log('Button clicked', index);
        if(index == 1) { return false; }
        return true;
      }
    }).then(actionSheetRef => {
      this.actionSheetRef = actionSheetRef;
    });
  }
}


@Page({
  template: `
    <ion-navbar *navbar><ion-title>Second Page Header</ion-title></ion-navbar>
    <ion-content padding>
      <p>
        <button (click)="nav.pop()">Pop (Go back to 1st)</button>
      </p>
      <f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f>
      <f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f><f></f>
    </ion-content>
  `
})
class ModalSecondPage {
  constructor(
    nav: NavController,
    params: NavParams
  ) {
    this.nav = nav;
    this.params = params;

    console.log('Second page params:', params);
  }

}


class FadeIn extends Animation {
  constructor(element) {
    super(element);
    this
      .easing('ease')
      .duration(450)
      .fadeIn();
  }
}
Animation.register('my-fade-in', FadeIn);

class FadeOut extends Animation {
  constructor(element) {
    super(element);
    this
      .easing('ease')
      .duration(250)
      .fadeOut();
  }
}
Animation.register('my-fade-out', FadeOut);
