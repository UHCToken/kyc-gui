import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayDaysDate'
})

export class ArrayDaysDatePipe implements PipeTransform {

  transform(value: number): Array<String> {
    const now =  new Date();
    let i = value;
    const dates = [this.dateFormat(now)];
    while(i--){
      now.setDate(now.getDate() - 1);
      dates.push(this.dateFormat(now));
    }
    return dates.reverse();
  }

  dateFormat(date: Date): string {

    const month = (date.getMonth() + 1).toString().length == 1 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    const day = (date.getDate()).toString().length == 1 ? '0' + (date.getDate()).toString() : (date.getDate()).toString();

    return date.getFullYear().toString() + '-' + month + '-' + day;
  }

}
