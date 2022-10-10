import {CustomDialogComponent} from "../shared/components/custom-dialog-component/custom-dialog-component";
import {MatDialog} from "@angular/material/dialog";

export class MsgUtil {

  public static showErrorMsg(dialog: MatDialog, errorMsg: string, duration?: number, title?: string): void {
    let matDialogRef = dialog.open(CustomDialogComponent, {
      data: {errorMsg: errorMsg, title: title}
    });
    setTimeout(() => matDialogRef.close(), duration ? duration : 3000);
  }
}
