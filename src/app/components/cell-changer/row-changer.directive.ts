import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input
} from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[rowChanger]'
})
export class RowChangerDirective implements AfterViewInit {
  private _destroyed = new Subject<void>();

  @Input('rowChanger') data: any;

  constructor(
    private _elementRef: ElementRef,
    private _cdr: ChangeDetectorRef
  ) {
    this._createStream()
      .pipe(takeUntil(this._destroyed))
      .subscribe(data => {
        this._editable(false);
      });
  }

  private _createStream(): Observable<Event> {
    const click$ = fromEvent(document, 'click').pipe(
        takeUntil(this._destroyed),
        filter((e: Event) => !this._elementRef.nativeElement.contains(e.target))
      ),
      focusOut$ = fromEvent(this._elementRef.nativeElement, 'focusout').pipe(
        takeUntil(this._destroyed),
        filter(
          (e: any) => !this._elementRef.nativeElement.contains(e.relatedTarget)
        )
      );

    return fromEvent(this._elementRef.nativeElement, 'dblclick').pipe(
      switchMap((event: Event) => {
        // event.stopPropagation();
        this._editable(true);
        console.log(event, this);

        return merge(click$, focusOut$).pipe(take(1));
      })
    );
  }

  private _editable(status: boolean): void {
    this.data['_isEditing'] = status;
    this._cdr.markForCheck();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.data['_isEditing'] = false;
    this._destroyed.next();
    this._destroyed.complete();
  }
}
