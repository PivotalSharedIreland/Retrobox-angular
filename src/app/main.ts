import {bootstrap}    from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from "angular2/http";
import 'rxjs/Rx'
import RetroBoxApp from "./retroboxapp";

bootstrap(RetroBoxApp, [HTTP_PROVIDERS]);
