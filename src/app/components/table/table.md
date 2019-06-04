```html
<app-table matSort [dataSource]="dataSource" [trackBy]="trackByFn">
  <ng-container col="symbol" [colWidth]="70">
    <th *headerCell mat-sort-header="symbol">Symbol</th>
    <td *headerCell>Summary Symbol</td>
    <td class="ertert" *virtualCell="let item"><span>{{ item.symbol }}</span></td>
  </ng-container>
  <ng-container col="name">
    <th *headerCell mat-sort-header="name">Name</th>
    <td *headerCell>Name</td>
    <td *virtualCell="let item">{{ item.name }}</td>
  </ng-container>
  <ng-container col="weight"  [colWidth]="540">
    <th *headerCell mat-sort-header="weight">Weight</th>
    <td *headerCell>Weight</td>
    <td class="my-class" *virtualCell="let item"><span>{{ item.weight }}</span></td>
  </ng-container>
  <ng-container col="position">
    <td [attr.colspan]="columns.length" [ngStyle]="{ 'text-align': 'center' }" class="my-class" *virtualCell="let item">{{ item.position }}</td>
  </ng-container>

  <tr class="my-table-row1" role="row" *virtualRow="let row; columns: columns; height: 50">
    <ng-container *ngFor="let col of row.cols">
      <ng-container *ngTemplateOutlet="col.template; context: { $implicit: row.data }"></ng-container>
    </ng-container>
  </tr>

  <!-- <tr class="new-table-row2" *virtualRow="let row; columns: ['position']">
    <ng-container *ngFor="let col of row.cols">
      <ng-container *ngTemplateOutlet="col.template; context: { $implicit: row.data }"></ng-container>
    </ng-container> 
  </tr> -->

  <tr class="header" *headerRow="let cells; columns: columns; sticky: true">
    <ng-container *ngFor="let cell of cells">
      <ng-container *ngTemplateOutlet="cell.template;"></ng-container>
    </ng-container>
  </tr>

</app-table>
```