import  Carrito  from "./model";
import { Icarrito } from "../../types";


class CarritoDao {
// tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
// tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
// tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
// tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
    async agregarCarrito(carrito:Icarrito){         //crear carrito
         try {
         const nuevoCarrtito = await Carrito.create(carrito);
            return nuevoCarrtito
         } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async actulizaCarrito(id:string, carrito:Icarrito){
        try {
            const carritoActualizado = await Carrito.findByIdAndUpdate(id , carrito, {new:true})
            return carritoActualizado
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async eliminarCarrito (carrito:Icarrito){
       try {
        const eliminar =await Carrito.findByIdAndDelete(carrito)
        return eliminar
       } catch (error) {
        throw Error ((error as Error).message)
       }
    }
    async MostrarTodos (pagina:string, limite:string){
        const saltar= (Number(pagina)-1)* Number(limite)
        try {
            const carritos =await Carrito.find()
            .skip(saltar)
            .limit(Number(limite))
            return carritos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarID(id:string){
        try {
            const carrito =await Carrito.findById(id)
            return carrito           
        } catch (error) {
            Error ((error as Error).message)
        }
    }

    async buscarPorFecha(fecha:Date){
        //fecha inicio es una instancia de la fecha que le paso, fecha fin asegura que no se borre esta fecha
        const fechaInicio = new Date (fecha).setHours(0,0,0,0) // sethoras establece la hora de inicio del dia
        const fechaFin = new Date (fecha).setHours(23,59,59,999) // establece la hora final del dia
        try {
            const carrito = await Carrito.find({createdAt: {$gte :fechaInicio, $lt:fechaFin}})
            return carrito
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    // tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
}

export const carritoDao = new CarritoDao()