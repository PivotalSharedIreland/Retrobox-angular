import {bootstrap}    from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from "angular2/http";
import 'rxjs/Rx'
import RetroList from "./retrolist/retrolist";
import RetroStore from "./store/retrostore";

bootstrap(RetroList, [HTTP_PROVIDERS, RetroStore]);
