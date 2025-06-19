import rateLimit from 'express-rate-limit';

export const loginLimite = rateLimit({
  windowMs: 60 * 1000, // esperar 60 segundos
//  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 5,  // Limitar a 5 intentos de inicio de sesión
  message: 'muchos intentos de inicio de sesión, por favor intente nuevamente después de 60 segundos',
  standardHeaders: true,  // incluir encabezados de límite
  legacyHeaders: false,  // desactivar encabezados viejos
});



//FUNCIONA EL DE ABAJO

// export const loginLimite = rateLimit({
//   windowMs: 60 * 1000, // 1 minuto
//   max: 5,
//   handler: (req, res) => {
//     res.status(429).json({
//       error: "intentos exedidos",
//       message: "Demasiados intentos",
//       retryAfter: 60 // Segundos de espera
//     });
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });


