import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandle } from './_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  constructor(private sanitizer:DomSanitizer) { }

  @HostBinding("style.background") private background ="#eee";


  @HostListener("dragover",["$event"])
  public onDragOver(evt : DragEvent)
  {
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#999";

  }

  @HostListener("dragleave",["$event"])
  public onDragLeave(evt: DragEvent)
  {
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";
  }

  @HostListener("drop",["$event"])
  public onDrop(evt: DragEvent)
  {
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";

    const file = evt.dataTransfer?.files[0];
    if (file) {
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      const fileHandle: FileHandle = { file, url };
      this.files.emit(fileHandle);
    }
  }
}
