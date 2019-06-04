import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  HostBinding,
  TemplateRef
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

import {
  ColDirective,
  HeaderCellDirective,
  HeaderRowDirective,
  VirtualRowDirective,
  HeaderRowOutletDirective,
  RowOutletDirective,
  RowOutlet
} from './table.directive';
import { CellOutlet } from './row.compoent';

import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('525ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 1 }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TableComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() dataSource: any;
  @Input() trackBy: Function;
  @Input() tableHeight: number = 300;

  @HostBinding('@detailExpand') detailExpand = true;

  public headerCells: any[];
  public virtualRows: any[];
  public colWidth: any[];
  public virtualScrollItemSize: number;

  public columns: ColDirective[];

  public configPerfectScroll = {
    suppressScrollX: true,
    wheelSpeed: 1.2
  };

  @ViewChild(PerfectScrollbarDirective)
  perfectScrollbar?: PerfectScrollbarDirective;

  @ViewChild('headerSticky') nodeHeaderSticky: ElementRef;
  @ViewChild(HeaderRowOutletDirective)
  headerRowOutlet: HeaderRowOutletDirective;
  @ContentChildren(VirtualRowDirective)
  contentRows: QueryList<VirtualRowDirective>;
  @ContentChild(HeaderRowDirective) headerRow: HeaderRowDirective;
  @ContentChildren(ColDirective) contentCols: QueryList<ColDirective>;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tableHeight && changes.tableHeight.previousValue !== void 0) {
      this._isSticky(this.headerRow.sticky);
    }

    if (changes.dataSource && changes.dataSource.previousValue !== undefined) {
      Promise.resolve().then(_ => this._initTable());
    }
  }

  ngAfterViewInit() {
    this._isSticky(this.headerRow.sticky);
    this._initTable();
  }

  private _initTable(): void {
    this.virtualScrollItemSize = 0;

    /**
     * @return (string | number)[];
     */
    this.colWidth = this.headerRow.columns.map((name: string) => {
      const column = this.contentCols.find(
        (col: ColDirective) => col.name === name
      );

      return column.width !== void 0 ? column.width : 'auto';
    });

    /**
     * From array of Col with array headerCell to array HeaderRow with array headerCell
     * @return [ HeaderCellDirective[] ];
     */
    this.headerCells = this.headerRow.columns.reduce(
      (total: any[], name: string) => {
        const column = this.contentCols.find(col => col.name === name);

        column.headerCells.map(
          (headerCell: HeaderCellDirective, index: number) => {
            if (!Array.isArray(total[index])) {
              total[index] = [];
            }
            total[index].push(headerCell);
          }
        );

        return total;
      },
      []
    );

    this.headerCells.forEach((cells, i) =>
      this._renderRow(this.headerRowOutlet, this.headerRow.template, cells, i)
    );

    this.virtualRows = this.contentRows.map(row => {
      this.virtualScrollItemSize += row.height;

      const cells = row.columns.map(name => {
        const cell = this.contentCols.find(col => col.name === name);

        return cell.virtualCell;
      });

      return { ...row, virtualCells: cells };
    });

    setTimeout(() => {
      this.perfectScrollbar.scrollToTop();
    }, 1000 / 60);

    this._cdr.detectChanges();
  }

  private _isSticky(isSticky: boolean): void {
    if (isSticky) {
      setTimeout(() => {
        this.tableHeight -= this.nodeHeaderSticky.nativeElement.getBoundingClientRect().height;
        this._cdr.markForCheck();
      }, 0);
    }
  }

  private _renderRow(
    outlet: RowOutlet,
    rowTemplate: TemplateRef<any>,
    cells: any[],
    index: number,
    context = {}
  ) {
    outlet.viewContainer.createEmbeddedView(rowTemplate, context, index);

    for (const cell of cells) {
      if (CellOutlet.mostRecentCellOutlet) {
        CellOutlet.mostRecentCellOutlet._viewContainer.createEmbeddedView(
          cell.template,
          context
        );
      }
    }

    this._cdr.markForCheck();
  }

  ngOnDestroy() {
    this.headerRowOutlet.viewContainer.clear();
  }
}
