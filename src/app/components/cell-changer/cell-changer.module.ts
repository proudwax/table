import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CellChangerComponent } from './cell-changer.component';
import { CellChangerDirective } from './cell-changer.directive';
import { RowChangerDirective } from './row-changer.directive';
import { TableChangerDirective } from './table-changer';

@NgModule({
  declarations: [
    CellChangerComponent,
    RowChangerDirective,
    CellChangerDirective,
    TableChangerDirective
  ],
  exports: [
    CellChangerComponent,
    RowChangerDirective,
    CellChangerDirective,
    TableChangerDirective
  ],
  imports: [CommonModule, ReactiveFormsModule],
  entryComponents: [CellChangerComponent]
})
export class CellChangerModule {}
