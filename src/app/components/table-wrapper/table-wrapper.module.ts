import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material';

import { TableModule } from '../table/table.module';
import { CellChangerModule } from '../cell-changer/cell-changer.module';

import { TableWrapperComponent } from './table-wrapper.component';

@NgModule({
  declarations: [TableWrapperComponent],
  imports: [CommonModule, MatSortModule, TableModule, CellChangerModule],
  exports: [TableWrapperComponent]
})
export class TableWrapperModule {}
