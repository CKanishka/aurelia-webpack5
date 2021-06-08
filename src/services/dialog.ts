import { DialogCancellableOpenResult, DialogOpenPromise, DialogService } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';

declare const $: any;
@autoinject()
export class Dialog {
  dialogService: DialogService;

  constructor(dialogService: DialogService) {
    this.dialogService = dialogService;
  }

  /**
   * Helper to open dialog.
   * @param viewModel The viewModel instance
   * @param model The viewModel Data
   */
  open(viewModel: any, model: any = {}): DialogOpenPromise<DialogCancellableOpenResult> {
    const dialog = this.dialogService.open({ viewModel, model });
    return dialog;
  }
}
