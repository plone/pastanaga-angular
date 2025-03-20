import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPageModule } from '../../../doc-page/doc-page.module';

@Component({
  selector: 'doc-palette',
  imports: [DocPageModule],
  templateUrl: './palette.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaletteComponent {
  grayColors = [
    'bg-gray-50',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-300',
    'bg-gray-400',
    'bg-gray-500',
    'bg-gray-600',
    'bg-gray-700',
    'bg-gray-800',
    'bg-gray-900',
    'bg-gray-950',
  ];
  accentColors = [
    'bg-accent-50',
    'bg-accent-100',
    'bg-accent-200',
    'bg-accent-300',
    'bg-accent-400',
    'bg-accent-500',
    'bg-accent-600',
    'bg-accent-700',
    'bg-accent-800',
    'bg-accent-900',
    'bg-accent-950',
  ];
  greenColors = [
    'bg-green-50',
    'bg-green-100',
    'bg-green-200',
    'bg-green-300',
    'bg-green-400',
    'bg-green-500',
    'bg-green-600',
    'bg-green-700',
    'bg-green-800',
    'bg-green-900',
    'bg-green-950',
  ];
  orangeColors = [
    'bg-orange-50',
    'bg-orange-100',
    'bg-orange-200',
    'bg-orange-300',
    'bg-orange-400',
    'bg-orange-500',
    'bg-orange-600',
    'bg-orange-700',
    'bg-orange-800',
    'bg-orange-900',
    'bg-orange-950',
  ];
  redColors = [
    'bg-red-50',
    'bg-red-100',
    'bg-red-200',
    'bg-red-300',
    'bg-red-400',
    'bg-red-500',
    'bg-red-600',
    'bg-red-700',
    'bg-red-800',
    'bg-red-900',
    'bg-red-950',
  ];
}
