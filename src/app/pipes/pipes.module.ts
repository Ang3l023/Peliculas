import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { PerfilimagePipe } from './perfilimage.pipe';

@NgModule({
  declarations: [
    ImagenPipe,
    PerfilimagePipe
  ],
  exports: [
    ImagenPipe,
    PerfilimagePipe
  ]
})
export class PipesModule { }
