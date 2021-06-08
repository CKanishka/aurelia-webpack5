import 'vendor';
import { Aurelia, PLATFORM } from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
  try {
    aurelia.use
      .standardConfiguration()
      .developmentLogging()
      .plugin(PLATFORM.moduleName('aurelia-dialog'))

    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName('app'));
  } catch (ex) {
    document.body.textContent = ex.message + '\n' + ex.stack;
  }
}
