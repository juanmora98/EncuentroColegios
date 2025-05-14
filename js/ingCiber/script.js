function verificarTexto() {
    const input = document.getElementById("textInput").value.trim();
    const mensaje = document.getElementById("mensaje");
    const textoCorrecto = "la ciberseguridad no es solo tecnologia, sino tambien personas. este atento a los surfistas de hombro. tenga cuidado con los piratas informaticos. no haga clic en ventanas emergentes aleatorias.";

    if (input === "") {
        mensaje.textContent = "⚠️ Debes ingresar un texto para continuar.";
        mensaje.className = "mensaje-tip empty";
    } else if (input !== textoCorrecto) {
        mensaje.textContent = "❌ El texto ingresado no es correcto. Intenta de nuevo.";
        mensaje.className = "mensaje-tip error";
    } else {
        mensaje.textContent = "✅ ¡Texto correcto! Puedes continuar.";
        mensaje.className = "mensaje-tip";
        setTimeout(function() {
            window.location.href = "/html/ingIA.html";  // Redirige a otra página
        }, 1000); // Redirige después de 1 segundos
    }
}
