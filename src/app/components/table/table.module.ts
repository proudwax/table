import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TableComponent } from './table.component';
import { RowComponent, HeaderRowComponent, CellOutlet } from './row.compoent';

import {
  ColDirective,
  VirtualRowDirective,
  HeaderCellDirective,
  VirtualCellDirective,
  HeaderRowDirective,
  HeaderRowOutletDirective,
  RowOutletDirective
} from './table.directive';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    TableComponent,
    HeaderRowOutletDirective,
    HeaderRowDirective,
    HeaderRowComponent,
    HeaderCellDirective,
    VirtualRowDirective,
    VirtualCellDirective,
    ColDirective,
    CellOutlet,
    RowOutletDirective,
    RowComponent,
  ],
  imports: [CommonModule, ScrollingModule, PerfectScrollbarModule],
  exports: [
    TableComponent,
    ColDirective,
    HeaderCellDirective,
    VirtualCellDirective,
    VirtualRowDirective,
    HeaderRowDirective,
    HeaderRowComponent,
    RowComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class TableModule {}
