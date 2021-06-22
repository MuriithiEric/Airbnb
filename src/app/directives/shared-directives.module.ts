import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxDirective } from './parallax.directive';
import { StickySearchDirective } from './sticky-search.directive';
import { FadeHeaderDirective } from './fade-header.directive';
import { DynamicStatusBarDirective } from './dynamic-status-bar.directive';



@NgModule({
  declarations: [
    ParallaxDirective,
    StickySearchDirective,
    FadeHeaderDirective,
    DynamicStatusBarDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ParallaxDirective, StickySearchDirective, FadeHeaderDirective, DynamicStatusBarDirective]
})
export class SharedDirectivesModule { }
