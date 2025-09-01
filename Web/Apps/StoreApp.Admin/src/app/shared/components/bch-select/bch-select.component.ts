import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  forwardRef,
  ContentChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import {NgClass, NgTemplateOutlet} from '@angular/common';

export interface SelectOption<T = any> {
  value: T;
  label: string;
  disabled?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'bch-select',
  templateUrl: './bch-select.component.html',
  styleUrls: ['./bch-select.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BchSelectComponent),
      multi: true
    }
  ]
})
export class BchSelectComponent<T = any> implements OnInit, OnDestroy, ControlValueAccessor {

  // Input properties
  @Input() options: T[] = [];
  @Input() placeholder = 'Please Select';
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() filtering = false;
  @Input() showMultipleCount = false;
  @Input() scrollToSelected = true;
  @Input() upperSide = false;
  @Input() noItemsText = 'No items found';
  @Input() width = '200px';
  @Input() height = 56;
  @Input() itemHeight = 40;
  @Input() contentHeight = 200;
  @Input() fontSize = '16px';
  @Input() cssClass = '';

  // Function inputs
  @Input() optionLabelFn: (item: T) => string = (item) => String(item);
  @Input() optionValueFn: (item: T) => any = (item) => item;
  @Input() filterByFn: (item: T) => string = (item) => this.optionLabelFn(item);
  @Input() cssClassFn: (item: T) => string = () => '';

  // Templates
  @ContentChild('optionTemplate') optionTemplate?: TemplateRef<any>;

  // Output events
  @Output() selectionChange = new EventEmitter<T | T[] | null>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() openChange = new EventEmitter<boolean>();
  @Output() selectItem = new EventEmitter<T>();
  @Output() deselectItem = new EventEmitter<T>();
  @Output() focusOut = new EventEmitter<void>();

  // ViewChild references
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('input') inputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('dropdown') dropdownRef?: ElementRef<HTMLDivElement>;
  @ViewChild('scroller') scrollerRef?: ElementRef<HTMLDivElement>;

  // Properties
  isOpen = false;
  filterValue = '';
  selectedValues: T[] = [];
  filteredOptions: T[] = [];
  activeOptionIndex = -1;
  destroy$ = new Subject<void>();
  flatOptions: { item: T; groupIndex: number; optionIndex: number }[] = [];
  dropdownPosition = { x: 0, y: 0, width: 0 };

  // ControlValueAccessor
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateFilteredOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: any): void {
    if (this.multiple) {
      this.selectedValues = Array.isArray(value) ? value : [];
    } else {
      this.selectedValues = value ? [value] : [];
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  // Public methods
  get currentValue(): T | T[] | null {
    if (this.multiple) {
      return this.selectedValues;
    }
    return this.selectedValues.length > 0 ? this.selectedValues[0] : null;
  }

  get displayText(): string {
    if (!this.selectedValues.length) {
      return this.placeholder;
    }

    if (this.multiple) {
      if (this.showMultipleCount) {
        return this.selectedValues.map(item => this.optionLabelFn(item)).join(', ');
      }
      return `${this.selectedValues.length} items selected`;
    }

    return this.optionLabelFn(this.selectedValues[0]);
  }

  toggleDropdown(): void {
    if (this.disabled) return;

    if (!this.isOpen) {
      this.calculateDropdownPosition();
    }

    this.isOpen = !this.isOpen;
    this.openChange.emit(this.isOpen);

    if (this.isOpen) {
      this.filterValue = '';
      this.updateFilteredOptions();
      this.setActiveIndexToSelectedOrFirst();

      setTimeout(() => {
        if (this.filtering && this.inputRef) {
          this.inputRef.nativeElement.focus();
        }
        if (this.scrollToSelected) {
          this.scrollActiveIntoView();
        }
      });
    }
  }

  closeDropdown(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.filterValue = '';
      this.openChange.emit(false);
      this.focusOut.emit();
      this.onTouched();
    }
  }

  selectOption(option: T): void {
    if (this.multiple) {
      const index = this.selectedValues.findIndex(item =>
        this.optionValueFn(item) === this.optionValueFn(option)
      );

      if (index >= 0) {
        this.selectedValues.splice(index, 1);
        this.deselectItem.emit(option);
      } else {
        this.selectedValues.push(option);
        this.selectItem.emit(option);
      }
    } else {
      this.selectedValues = [option];
      this.closeDropdown();
    }

    this.onChange(this.currentValue);
    this.selectionChange.emit(this.currentValue);
    this.cdr.markForCheck();
  }

  isOptionSelected(option: T): boolean {
    return this.selectedValues.some(item =>
      this.optionValueFn(item) === this.optionValueFn(option)
    );
  }

  isOptionActive(option: T): boolean {
    if (this.activeOptionIndex < 0 || this.activeOptionIndex >= this.flatOptions.length) {
      return false;
    }
    const activeOption = this.flatOptions[this.activeOptionIndex];
    return this.optionValueFn(activeOption.item) === this.optionValueFn(option);
  }

  onFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterValue = target.value;
    this.filterChange.emit(this.filterValue);
    this.updateFilteredOptions();
    this.setActiveIndexToSelectedOrFirst();
  }



  private updateFilteredOptions(): void {
    this.filteredOptions = this.options.filter(item =>
      this.filterByFn(item).toLowerCase().includes(this.filterValue.toLowerCase())
    );
    this.updateFlatOptions();
  }

  private updateFlatOptions(): void {
    this.flatOptions = [];

    this.filteredOptions.forEach((item, index) => {
      this.flatOptions.push({
        item,
        groupIndex: 0,
        optionIndex: index
      });
    });
  }

  private calculateDropdownPosition(): void {
    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    this.dropdownPosition = {
      x: rect.left,
      y: rect.bottom,
      width: rect.width
    };
  }

  private setActiveIndexToSelectedOrFirst(): void {
    if (this.flatOptions.length === 0) {
      this.activeOptionIndex = -1;
      return;
    }

    if (this.selectedValues.length > 0 && !this.multiple) {
      const selectedValue = this.optionValueFn(this.selectedValues[0]);
      const index = this.flatOptions.findIndex(opt =>
        this.optionValueFn(opt.item) === selectedValue
      );
      this.activeOptionIndex = index >= 0 ? index : 0;
    } else {
      this.activeOptionIndex = 0;
    }
  }

  private moveActive(delta: number): void {
    if (this.flatOptions.length === 0) {
      this.activeOptionIndex = -1;
      return;
    }

    if (this.activeOptionIndex === -1) {
      this.setActiveIndexToSelectedOrFirst();
      return;
    }

    this.activeOptionIndex = Math.max(0, Math.min(this.activeOptionIndex + delta, this.flatOptions.length - 1));
  }

  private scrollActiveIntoView(): void {
    if (this.activeOptionIndex < 0 || !this.scrollerRef) return;

    const offset = this.activeOptionIndex * this.itemHeight;

    this.scrollerRef.nativeElement.scrollTo({
      top: offset,
      behavior: 'auto'
    });
  }

  // Event handlers
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    switch (event.code) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.toggleDropdown();
        } else {
          this.moveActive(1);
          this.scrollActiveIntoView();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.toggleDropdown();
        } else {
          this.moveActive(-1);
          this.scrollActiveIntoView();
        }
        break;

      case 'Enter':
      case 'NumpadEnter':
        event.preventDefault();
        if (this.isOpen) {
          if (this.activeOptionIndex >= 0 && this.activeOptionIndex < this.flatOptions.length) {
            this.selectOption(this.flatOptions[this.activeOptionIndex].item);
          }
        } else {
          this.toggleDropdown();
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        break;

      default:
        if (!this.isOpen && !this.filtering) {
          this.toggleDropdown();
        }
        break;
    }
  }

  // TrackBy function for performance
  trackByOption(option: T): any {
    return this.optionValueFn(option);
  }
}
