import {bootstrap} from 'angular2/platform/browser';
import TodoStore from './store/retrostore';
import TodoList from './retrolist/retrolist';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

bootstrap(TodoList, [HTTP_PROVIDERS, TodoStore]);
