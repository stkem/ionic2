import {Component, View as NgView, bootstrap} from 'angular2/angular2';
import {View} from 'ionic/components/view/view';
import {Content} from 'ionic/components/content/content';
import {List} from 'ionic/components/list/list';


@Component({ selector: '[ion-app]' })
@NgView({
  templateUrl: 'main.html',
  directives: [View, Content, List]
})
class IonicApp {
  constructor() {
    console.log('IonicApp Start')
  }
}

bootstrap(IonicApp)