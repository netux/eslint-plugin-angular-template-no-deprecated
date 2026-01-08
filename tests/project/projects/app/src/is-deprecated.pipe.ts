import { Pipe, PipeTransform } from '@angular/core';

/** @deprecated */
@Pipe({
  name: 'isDeprecated',
})
export class IsDeprecatedPipe implements PipeTransform {
  transform(value: string) {
    return `${value} (is-deprecated pipe was here!)`;
  }
}
