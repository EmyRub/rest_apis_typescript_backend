import { Model } from "sequelize-typescript";
declare class Product extends Model {
    name: string;
    price: number;
    avaliability: boolean;
}
export default Product;
