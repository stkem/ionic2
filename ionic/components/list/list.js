import {Renderer, ElementRef} from 'angular2/angular2'
import {Component, Directive} from 'angular2/angular2';
import {View} from 'angular2/angular2';

import {IonicComponent} from 'ionic/config/component'


@Component({
  selector: 'ion-list'
})
@View({
  template: `<content></content>`
})
export class List {
  constructor() {

  }
  constructor(
    elementRef: ElementRef
  ) {
    this.domElement = elementRef.domElement;
    this.config = List.config.invoke(this);
  }
}

new IonicComponent(List, {
  propClasses: ['inset']
})
