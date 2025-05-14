function verificarTexto() {
    const input = document.getElementById("textInput").value.trim();
    const mensaje = document.getElementById("mensaje");
    const textoCorrecto = "reto2superado"; // <- Puedes cambiar este valor

    if (input === "") {
        mensaje.textContent = "⚠️ Debes ingresar un texto para continuar.";
        mensaje.className = "mensaje-tip empty";
    } else if (input !== textoCorrecto) {
        mensaje.textContent = "❌ El texto ingresado no es correcto. Intenta de nuevo.";
        mensaje.className = "mensaje-tip error";
    } else {
        mensaje.textContent = "✅ ¡Texto correcto! Puedes continuar.";
        mensaje.className = "mensaje-tip";
        // Aquí puedes hacer que se desbloquee algo, redirigir, etc.
    }
}
