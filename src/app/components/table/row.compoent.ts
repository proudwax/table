import {
  Component,
  Directive,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  HostBinding,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';

export const ROW_TEMPLATE = `<ng-container cellOutlet></ng-container>`;

@Directive({ selector: '[cellOutlet]' })
export class CellOutlet implements OnDestroy {
  /** The ordered list of cells to render within this outlet's view container */
  cells: any[];

  /** The data context to be provided to each cell */
  context: any;

  /**
   * Static property containing the latest constructed instance of this class.
   * Used by the CDK table when each CdkHeaderRow and CdkRow component is created using
   * createEmbeddedView. After one of these components are created, this property will provide
   * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
   * construct the cells with the provided context.
   */
  static mostRecentCellOutlet: CellOutlet | null = null;

  constructor(public _viewContainer: ViewContainerRef) {
    CellOutlet.mostRecentCellOutlet = this;
  }

  ngOnDestroy() {
    // If this was the last outlet being rendered in the view, remove the reference
    // from the static property after it has been destroyed to avoid leaking memory.
    if (CellOutlet.mostRecentCellOutlet === this) {
      CellOutlet.mostRecentCellOutlet = null;
    }
  }
}

@Component({
  selector: 'header-row, tr[header-row]',
  template: ROW_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class HeaderRowComponent {
  @HostBinding('attr.role') role = 'row';
}

@Component({
  selector: 'row, tr[row]',
  template: ROW_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class RowComponent {
  @HostBinding('attr.role') role = 'row';
}
