import { QuantityDTO } from "./QuantityDTO";

export interface ProductDTO {
    name:string,
    price:number,
    description:string,
    imageFile:File
    storeQuantities: QuantityDTO[];
}

