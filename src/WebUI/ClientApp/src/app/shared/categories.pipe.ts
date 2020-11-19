import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'categoriesPipe'})
export class CategoriesPipe implements PipeTransform {
  transform(value: string): string {
    const categoriesArray = value.split(",",5);
    const trimmedCategoriesArray = value.split(",",4);
    if (categoriesArray.length == 5)
      return trimmedCategoriesArray.join(", ") + " ...";
    else
      return trimmedCategoriesArray.join(", ");

  }
}
