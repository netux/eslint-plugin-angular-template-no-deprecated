import { Pipe, PipeTransform } from '@angular/core';

/** @deprecated */
@Pipe({
  name: 'libIsDeprecated',
})
export class LibIsDeprecatedPipe implements PipeTransform {
  transform(value: string) {
    return `${value} (libIsDeprecated pipe was here!)`;
  }
}
