import {bootstrap} from 'angular2/platform/browser';
import RetroStore from './store/retrostore';
import RetroList from './retrolist/retrolist';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

bootstrap(RetroList, [HTTP_PROVIDERS, RetroStore]);
