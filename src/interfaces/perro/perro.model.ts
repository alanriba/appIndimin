import { SubRazaPerro } from "./perro_subraza.model";

export class PerroModel {
    constructor(
    public dogRaza?:string,
    public dogImagen?: string,
    public dogSubRaza:SubRazaPerro[]=[]
    ){}
}