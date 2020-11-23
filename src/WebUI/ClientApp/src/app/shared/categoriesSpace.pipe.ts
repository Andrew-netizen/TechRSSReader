import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'categoriesSpacePipe'})
export class CategoriesSpacePipe implements PipeTransform {
  transform(value: string): string {
    const categoriesArray = value.split(",");
    return categoriesArray.join(", ");
  }
}
