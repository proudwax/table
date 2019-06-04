import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  SkipSelf,
  Optional
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { RowChangerDirective } from './row-changer.directive';
import { RowComponent } from '../table/row.compoent';

let nextUniqueId = 0;

@Component({
  selector: 'cell-changer',
  templateUrl: './cell-changer.component.html',
  styleUrls: ['./cell-changer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CellChangerComponent implements OnInit, OnDestroy {
  private _destroyed = new Subject<void>();

  public tabIndex: number | null = null;
  public input: FormControl;

  @ViewChild('cell') cell: Element;

  @Input()
  get isEdit() {
    return this._isEdit;
  }
  set isEdit(value: boolean) {
    this._isEdit = value;
    this._cdr.markForCheck();
  }
  private _isEdit: boolean = false;

  @Input()
  get value() {
    return this._value;
  }
  set value(value) {
    this.input = new FormControl('');
    this._value = value;
  }
  private _value: string | number;

  @HostListener('click', ['$event.target'])
  onFocus(event) {
    console.log('rer', event);

    setTimeout(_ => {
      this.cell instanceof ElementRef && this.cell.nativeElement.focus();
    }, 0);
  }

  constructor(
    public _viewContainer: ViewContainerRef,
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef,
    @Attribute('tabindex') tabIndex: string,
  ) // @Optional() private _parent: RowChangerDirective
  {
    this.tabIndex = parseInt(tabIndex) || 0;
  }

  ngOnInit() {
    console.log(this);
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
