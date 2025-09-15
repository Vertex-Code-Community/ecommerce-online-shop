import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-collapsible-section',
  imports: [],
  templateUrl: './collapsible-section.component.html',
  standalone: true,
  styleUrl: './collapsible-section.component.scss'
})
export class CollapsibleSectionComponent {
  @Input() title: string = '';
  @Input() initiallyOpen: boolean = true;

  isOpen: boolean = this.initiallyOpen;

  ngOnInit() {
    this.isOpen = this.initiallyOpen;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
