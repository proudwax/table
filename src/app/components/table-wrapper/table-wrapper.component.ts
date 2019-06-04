import {
  Component,
  OnInit,
  ViewChild,
  Injector,
  ViewEncapsulation,
  ViewChildren
} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { RowChangerDirective } from '../cell-changer/row-changer.directive';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: '1 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: '2 Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: '3 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: '4 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: '5 Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: '6 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: '7 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: '8 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: '9 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: '10 Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: '11 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 12, name: '12 Helium', weight: 4.0026, symbol: 'He' },
  { position: 13, name: '13 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 14, name: '14 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 15, name: '15 Boron', weight: 10.811, symbol: 'B' },
  { position: 16, name: '16 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 17, name: '17 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 18, name: '18 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 19, name: '19 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 20, name: '20 Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 21, name: '21 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 22, name: '22 Helium', weight: 4.0026, symbol: 'He' },
  { position: 23, name: '23 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 24, name: '24 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 25, name: '25 Boron', weight: 10.811, symbol: 'B' },
  { position: 26, name: '26 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 27, name: '27 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 28, name: '28 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 29, name: '29 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 30, name: '30 Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 31, name: '31 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 32, name: '32 Helium', weight: 4.0026, symbol: 'He' },
  { position: 33, name: '33 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 34, name: '34 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 35, name: '35 Boron', weight: 10.811, symbol: 'B' },
  { position: 36, name: '36 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 37, name: '37 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 38, name: '38 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 39, name: '39 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 40, name: '40 Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 41, name: '41 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 42, name: '42 Helium', weight: 4.0026, symbol: 'He' },
  { position: 43, name: '43 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 44, name: '44 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 45, name: '45 Boron', weight: 10.811, symbol: 'B' },
  { position: 46, name: '46 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 47, name: '47 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 48, name: '48 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 49, name: '49 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 50, name: '50 Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 1, name: '1 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: '2 Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: '3 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: '4 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: '5 Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: '6 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: '7 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: '8 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: '9 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: '10 Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: '11 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 12, name: '12 Helium', weight: 4.0026, symbol: 'He' },
  { position: 13, name: '13 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 14, name: '14 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 15, name: '15 Boron', weight: 10.811, symbol: 'B' },
  { position: 16, name: '16 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 17, name: '17 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 18, name: '18 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 19, name: '19 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 20, name: '20 Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 21, name: '21 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 22, name: '22 Helium', weight: 4.0026, symbol: 'He' },
  { position: 23, name: '23 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 24, name: '24 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 25, name: '25 Boron', weight: 10.811, symbol: 'B' },
  { position: 26, name: '26 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 27, name: '27 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 28, name: '28 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 29, name: '29 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 30, name: '30 Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 31, name: '31 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 32, name: '32 Helium', weight: 4.0026, symbol: 'He' },
  { position: 33, name: '33 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 34, name: '34 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 35, name: '35 Boron', weight: 10.811, symbol: 'B' },
  { position: 36, name: '36 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 37, name: '37 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 38, name: '38 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 39, name: '39 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 40, name: '40 Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 41, name: '41 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 42, name: '42 Helium', weight: 4.0026, symbol: 'He' },
  { position: 43, name: '43 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 44, name: '44 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 45, name: '45 Boron', weight: 10.811, symbol: 'B' },
  { position: 46, name: '46 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 47, name: '47 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 48, name: '48 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 49, name: '49 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 50, name: '50 Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.css']
})
export class TableWrapperComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  defColumns = ['symbol', 'name', 'position', 'weight'];
  columns = this.defColumns.slice();

  @ViewChild(MatSort) sort: MatSort;

  constructor(public injector: Injector) {}

  trackByFn(item: PeriodicElement, index: number) {
    return item.position;
    // return index;
  }

  log(data) {
    console.log(data);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;

    // setTimeout(() => {
    //   this.dataSource.filter = 'H';
    // }, 5000);

    // setTimeout(() => {
    //   this.dataSource.filter = '';
    // }, 8000);
  }
}
