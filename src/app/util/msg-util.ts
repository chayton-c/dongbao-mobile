import {CustomDialogComponent} from "../shared/components/custom-dialog-component/custom-dialog-component";
import {MatDialog} from "@angular/material/dialog";

export class MsgUtil {

  public static showErrorMsg(dialog: MatDialog, errorMsg: string): void {
    let matDialogRef = dialog.open(CustomDialogComponent, {
      data: {errorMsg: errorMsg}
    });
    setTimeout(() => matDialogRef.close(), 3000);
  }
}
