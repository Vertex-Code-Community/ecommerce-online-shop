import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-file-upload',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFileUploadComponent),
      multi: true
    }
  ],
  templateUrl: './form-file-upload.component.html',
  styleUrls: ['./form-file-upload.component.scss']
})
export class FormFileUploadComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() accept: string = 'image/png,image/jpg,image/jpeg';
  @Input() maxSize: number = 4 * 1024 * 1024; // 4MB
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() error: string = '';

  value: string = '';
  fileName: string = '';
  fileError: string = '';
  isDragOver = false;
  touched = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.processFile(file);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  private processFile(file: File): void {
    this.fileError = '';
    
    if (!this.validateFile(file)) {
      return;
    }

    this.fileName = file.name;
    this.convertToBase64(file);
  }

  private validateFile(file: File): boolean {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    
    if (!allowedTypes.includes(file.type)) {
      this.fileError = 'Only PNG, JPG, and JPEG files are allowed';
      this.markAsTouched();
      return false;
    }

    if (file.size > this.maxSize) {
      this.fileError = `File size must be less than ${this.maxSize / (1024 * 1024)}MB`;
      this.markAsTouched();
      return false;
    }

    return true;
  }

  private convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      this.value = result;
      this.onChange(result);
      this.markAsTouched();
    };
    reader.readAsDataURL(file);
  }

  removeFile(): void {
    this.value = '';
    this.fileName = '';
    this.fileError = '';
    this.onChange('');
    this.markAsTouched();
  }

  private markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  get hasError(): boolean {
    return !!(this.error || this.fileError);
  }

  get errorMessage(): string {
    return this.fileError || this.error;
  }
}
