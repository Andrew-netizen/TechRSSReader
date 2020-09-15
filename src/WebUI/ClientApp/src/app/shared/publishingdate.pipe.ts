import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'publishingDatePipe'})
export class PublishingDatePipe implements PipeTransform {
  transform(value: Date): string {
    let today: Date = new Date();
    let isToday: Boolean =  (value.getDate() == today.getDate()) &&
    (value.getMonth() == today.getMonth()) &&
    (value.getFullYear() == today.getFullYear());

    let yesterday: Date = new Date();
    yesterday.setDate(yesterday.getDate() -1);

    let isYesterday: Boolean =  (value.getDate() == yesterday.getDate()) &&
    (value.getMonth() == yesterday.getMonth()) &&
    (value.getFullYear() == yesterday.getFullYear());

    const month = value.toLocaleString('default', { month: 'long' });
    const dayOfMonth = value.getDate();

    let dayString: string = "";
    if (isToday) {
        dayString = "Today";
    }
    else {
      if (isYesterday) {
        dayString = "Yesterday";
      }
      else {
        dayString = month + ' ' + dayOfMonth;
      }


    }

    if ((value.getFullYear() != today.getFullYear()) && !(isYesterday))
    {
        dayString = dayString + " " + value.getFullYear();
    }

    return dayString;
  }
}
