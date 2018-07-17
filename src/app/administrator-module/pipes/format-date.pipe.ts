import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})

export class AdminFormatDatePipe implements PipeTransform {

  transform(value: string, put_hour: boolean = true): string {
    const date = new Date(value);
    const z = {
      Y: date.getFullYear().toString(),
      M: this.addZero(date.getMonth() + 1),
      d: this.addZero(date.getDate()),
      h: this.addZero(date.getHours()),
      m: this.addZero(date.getMinutes()),
      s: this.addZero(date.getSeconds())
    };

    let format_date = z.M + '/' + z.d + '/' + z.Y;
    if (put_hour) {
      format_date += ' ' + z.h + ':' + z.m;
    }
    return format_date;
  }

  addZero(value: number): string {
    return (value.toString().length > 1 ? '' : '0') + value.toString();
  }

}
