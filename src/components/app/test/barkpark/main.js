import {bootstrap} from 'angular2/core'
import {For, Component, Template, Parent} from 'angular2/angular2'
import {FormBuilder, Validators, FormDirectives, CongrolGroup} from 'angular2/forms';

import {Log} from 'ionic2/util'

import {NavViewport, View, Button, Input, Tabs, Tab, Content, NavPane, Aside} from 'ionic2/ionic2'

@Component({
  selector: 'login-page'
})
@Template({
  url: 'pages/login.html',
  directives: [View, FormDirectives, Button, Input]
})
export class LoginPage {
  constructor( @Parent() viewport: NavViewport ) { //, fb: FormBuilder ) {

    this.viewport = viewport
    Log.log('LOGIN PAGE')

    var fb = new FormBuilder()

    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  doLogin(event) {
    Log.log('Doing login')
    event.preventDefault();
    console.log(this.loginForm.value);
    //this.viewport.push(SecondPage)
  }
  doSignup(event) {
    this.viewport.push(SignupPage)

  }
}

@Component({
  selector: 'signup-page'
})
@Template({
  url: 'pages/signup.html',
  directives: [View, FormDirectives, Button, Input]
})
export class SignupPage {
  constructor( @Parent() viewport: NavViewport ) { //, fb: FormBuilder ) {

    this.viewport = viewport
    Log.log('SIGNUP PAGE')

    var fb = new FormBuilder()

    this.signupForm = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  doLogin(event) {
    this.viewport.pop()
  }
  doSignup(event) {
    Log.log('Doing signup')
    event.preventDefault();
    console.log(this.signupForm.value);

    this.viewport.push(AppPage)
    //this.viewport.push(SecondPage)
  }
}



@Component({
  selector: 'app-page'
})
@Template({
  url: 'pages/app.html',
  directives: [View, FormDirectives, Button, Input, Tabs, Tab]
})
export class AppPage {
  constructor( @Parent() viewport: NavViewport ) { //, fb: FormBuilder ) {
    this.viewport = viewport
    this.streamTab = StreamTab
  }
}

@Component({ selector: 'stream-tab' })
@Template({
  url: 'pages/tabs/home.html',
  directives: [For, View, Content]
})
class StreamTab {
  constructor(navPane: NavPane) {
    this.navPane = navPane;
    this.posts = [
      {'title': 'Just barked my first bark'},
      {'title': 'Went poopy' }
    ];
  }
  selectPost(post) {
    this.navPane.push(PostDetail, {
      post
    }, {
      transition: '3dflip'
    })
  }
}

@Component({ selector: 'post-detail-tab' })
@Template({
  url: 'pages/posts/detail.html',
  directives: [View, Content]
})
class PostDetail {
  constructor(navPane: NavPane) {
    this.navPane = navPane
  }
  selectItem() {
    this.navPane.push(PostDetailTab)
  }
}


/**
 * Main app entry point
 */
@Component({ selector: '[ion-app]' })
@Template({
  directives: [NavViewport],
  url: 'main.html'
})
class IonicApp {
  constructor() {
    this.firstPage = AppPage//LoginPage
    console.log('IonicApp Start')
  }
}

bootstrap(IonicApp)
