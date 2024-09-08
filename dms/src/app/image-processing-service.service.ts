import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { FileHandle } from './_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingServiceService {

  constructor(private sanitizer:DomSanitizer) { }

  public createImages(product:Product)
  {
    const productImages:any[]= product.productImages;

    // file handle is the interface 
    const productImagesToFileHandle :FileHandle[] = [];

    for(let i =0;i<productImages.length;i++)
    {
      const imageFileData = productImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.picByte,imageFileData.type)
      
      const imageFile = new File([imageBlob],imageFileData.name, {type:imageFileData.type})

      const finaleImageHandle: FileHandle = {
        file:imageFile,
        url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      productImagesToFileHandle.push(finaleImageHandle);
    }

    product.productImages = productImagesToFileHandle;

    return product;

  }

  public dataURItoBlob(picBytes: string,imageType: any)
  {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    
    const int8Array = new Uint8Array(arrayBuffer);
    for(let i =0;i<byteString.length;i++)
    {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array],{type:imageType})
    
    return blob;
  }
}
