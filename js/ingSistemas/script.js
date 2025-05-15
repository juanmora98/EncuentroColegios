function simularBatalla() {
    const codigo = document.getElementById("codeInput").value;
    const resultado = document.getElementById("battleResult");

    // Variables por defecto
    let player_damage = 10;
    let marciano_hp = 50;

    try {
        // Evaluar líneas claves del código (sólo variables seguras)
        const match_damage = codigo.match(/player_damage\s*=\s*(\d+)/);
        const match_hp = codigo.match(/marciano_hp\s*=\s*(\d+)/);

        if (match_damage) player_damage = parseInt(match_damage[1]);
        if (match_hp) marciano_hp = parseInt(match_hp[1]);

        if (player_damage >= marciano_hp) {
            resultado.textContent = "✅ ¡Ganaste! El marciano fue derrotado.";
            resultado.style.color = "green";
        } else {
            resultado.textContent = "❌ El marciano resistió. ¡Necesitas más daño!";
            resultado.style.color = "red";
        }
    } catch (error) {
        resultado.textContent = "⚠️ Error en el código. Verifica tu sintaxis.";
        resultado.style.color = "orange";
    }
}

