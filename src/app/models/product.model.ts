export class ProductModel {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price:  number,
        public providerName: string,
        public stock: number
    ){}
}