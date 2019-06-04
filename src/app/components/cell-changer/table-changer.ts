import { Directive, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RowChangerDirective } from './row-changer.directive';

@Directive({
  selector: '[tableChanger]'
})
export class TableChangerDirective implements AfterViewInit {
  private _destroyed = new Subject<void>();

  @ContentChildren(RowChangerDirective) row: QueryList<RowChangerDirective>;

  constructor() {
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
