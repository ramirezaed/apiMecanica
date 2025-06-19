//validacion que id cumpla con el formato de mongo
export const validarIdUsuario = (id: string): boolean => {
    const regex = /^[a-fA-F0-9]{24}$/;
    return regex.test(id);
};

//validar fecha
const validarFecha = (fecha: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;  // formato YYYY-MM-DD
    return regex.test(fecha);
};
//validar mail
const validarEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};