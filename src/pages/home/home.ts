import {inject} from "aurelia-framework";
import { Dialog } from "services/dialog";

@inject(Dialog)
export class Home {
  /* Dependencies */
  dialog: Dialog;

  constructor(dialog:Dialog){
    this.dialog = dialog;
  }
  openDialog(){
    
  }
}
