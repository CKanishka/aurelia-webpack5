import { PLATFORM } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";

export class App {
  appDate: Date = new Date();
  message = "Hello, welcome to Aurelia!";
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config
      .map([
        {
          route: ["", "/home"],
          name: "home",
          moduleId: PLATFORM.moduleName("./pages/home/home"),
          nav: true,
          settings: {
            text: "Home",
          },
        },
        {
          route: "/about",
          name: "about",
          moduleId: PLATFORM.moduleName("./pages/about/about"),
          nav: true,
          settings: {
            text: "About",
          },
        },
      ])
      .mapUnknownRoutes({ redirect: "home" });
  }
}
