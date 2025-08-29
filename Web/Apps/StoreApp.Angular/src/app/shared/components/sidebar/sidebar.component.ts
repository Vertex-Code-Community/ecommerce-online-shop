import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isOpen = false;
  dropdownOpen = false;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  toggle() {
    this.isOpen = !this.isOpen;
    this.sidebarToggled.emit(this.isOpen);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;

    if (!this.isOpen) {
      this.toggle();
    }
  }
}
