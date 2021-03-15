import { WebSocketApplication } from "./application/WebSocketApplication";
import { Configuration } from "./application/Configuration";
import * as env from "./constants";

new WebSocketApplication(new Configuration(env)).start();
