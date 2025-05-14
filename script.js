// Respuestas correctas a las preguntas
const correctAnswers = {
    question1: 8,   // Promedio de horas de estudio por semana
    question2: 5,   // Moda en horas dedicadas a actividades extracurriculares
    question3: 86.2 // Media de las calificaciones en Lengua
};

document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener las respuestas ingresadas por el usuario
    const answer1 = parseFloat(document.getElementById("question1").value);
    const answer2 = parseFloat(document.getElementById("question2").value);
    const answer3 = parseFloat(document.getElementById("question3").value);

    // Verificar si todas las respuestas son correctas
    if (answer1 === correctAnswers.question1 && answer2 === correctAnswers.question2 && answer3 === correctAnswers.question3) {
        // Cambiar el icono del candado a desbloqueado
        document.getElementById("lockIcon").textContent = "🔓";  // Cambiar el ícono del candado
        // Redirigir al reto 2 después de un breve mensaje de éxito
        setTimeout(function() {
            window.location.href = "/html/ingCiber.html";  // Redirige a otra página
        }, 2000); // Redirige después de 2 segundos
    } else {
        // Mostrar mensaje de error si alguna respuesta es incorrecta
        document.getElementById("error-message").textContent = "Una o más respuestas son incorrectas. Intenta de nuevo.";
    }
});
