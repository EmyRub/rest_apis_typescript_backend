import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: 'products'
})

//Crear las columnas de la base de datos
class Product extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.FLOAT
    })
    declare price: number

    /*Default.- Agrega un valor que no esta presente una vez que envia 
    el request pero se le puede agregar*/
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare avaliability: boolean
}

export default Product