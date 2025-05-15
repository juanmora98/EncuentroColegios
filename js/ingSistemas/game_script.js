let completado1 = false, completado2 = false, completado3 = false;

// Inicializar variables de estado
window.onload = function () {
    dibujarMatriz(); // Esto mostrará el tablero bonito desde el inicio
    inicializarRed();
};

// Actividad 1: Batalla
function simularBatalla() {
    const code = document.getElementById("code1").value;
    const r = document.getElementById("resultado1");
    let player_damage = 10, marciano_hp = 50;
    const dmgMatch = code.match(/player_damage\s*=\s*(\d+)/);
    const hpMatch = code.match(/marciano_hp\s*=\s*(\d+)/);
    if (dmgMatch) player_damage = parseInt(dmgMatch[1]);
    if (hpMatch) marciano_hp = parseInt(hpMatch[1]);
    if (player_damage >= marciano_hp) {
        r.textContent = "¡Marciano derrotado!";
        r.style.color = "green";
        completado1 = true;
    } else {
        r.textContent = "Aún no puedes vencer al marciano.";
        r.style.color = "red";
    }
    verificarTodo();
}

// Actividad 2: Culebrita
   

let estadoCulebra = { snake: [1, 1], apples: [[0, 0], [3, 3]] };

function moverCulebra() {
    const code = document.getElementById("code2").value;
    const posMatch = code.match(/move\s*=\s*\[(-?\d+),\s*(-?\d+)\]/);
    const move = [parseInt(posMatch[1]), parseInt(posMatch[2])];
    const nuevaFila = estadoCulebra.snake[0] + move[0];
    const nuevaCol = estadoCulebra.snake[1] + move[1];
    if (
        nuevaFila < 0 || nuevaFila >= 5 ||
        nuevaCol < 0 || nuevaCol >= 5
      ) {
        const r = document.getElementById("resultado2");
        r.textContent = "No puedes moverte en esa direccion en este momento";
      }
    else{
        if (posMatch) {
            estadoCulebra.snake[0] += move[0];
            estadoCulebra.snake[1] += move[1];
            // Eliminar manzana si coincide
            estadoCulebra.apples = estadoCulebra.apples.filter(
                m => !(m[0] === estadoCulebra.snake[0] && m[1] === estadoCulebra.snake[1])
            );

            dibujarMatriz();
            const r = document.getElementById("resultado2");
            if (estadoCulebra.apples.length === 0) {
                r.textContent = "¡Comiste todas las manzanas!";
                r.style.color = "green";
                completado2 = true;
            } else {
                r.textContent = "Aún quedan manzanas.";
                r.style.color = "orange";
            }
        }
        verificarTodo();
    }
    
}

function reiniciarCulebra() {
    estadoCulebra = { snake: [1, 1], apples: [[0, 0], [3, 3]] };
    dibujarMatriz();
    document.getElementById("resultado2").textContent = "";
}

function dibujarMatriz() {
    const matriz = document.getElementById("matrizJuego");
    matriz.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const celda = document.createElement("div");
            if (estadoCulebra.snake[0] === i && estadoCulebra.snake[1] === j) {
                celda.textContent = "🐍";
            } else if (estadoCulebra.apples.some(a => a[0] === i && a[1] === j)) {
                celda.textContent = "🍎";
            }
            matriz.appendChild(celda);
        }
    }
}
dibujarMatriz();

// Actividad 3: Red computacional
function conectarRed() {
    const code = document.getElementById("code3").value;

    try {
        const grupoA = eval(code.match(/grupoA\s*=\s*(\[[^\]]+\])/)[1]);
        const grupoB = eval(code.match(/grupoB\s*=\s*(\[[^\]]+\])/)[1]);
        const servidorA = code.match(/servidorA\s*=\s*"([^"]*)"/)[1]; // Extraer IP del Servidor A
        const servidorB = code.match(/servidorB\s*=\s*"([^"]*)"/)[1]; // Extraer IP del Servidor B
        const nube = ["192.168.0.100", "192.168.1.100"];

        // Validar duplicados en las IPs
        if (tieneDuplicados([...grupoA, servidorA])) {
            document.getElementById("resultado3").textContent = "Error: Hay IPs duplicadas en el Grupo A o Servidor A.";
            document.getElementById("resultado3").style.color = "red";
            return;
        }
        if (tieneDuplicados([...grupoB, servidorB])) {
            document.getElementById("resultado3").textContent = "Error: Hay IPs duplicadas en el Grupo B o Servidor B.";
            document.getElementById("resultado3").style.color = "red";
            return;
        }

        // Validar conexión de los servidores con la nube
        const servidorAConectado = servidorA === nube[0];
        const servidorBConectado = servidorB === nube[1];

        if (!servidorAConectado || servidorA === "") {
            document.getElementById("resultado3").textContent = "Error: La IP del Servidor A no concuerda con la IP de la nube.";
            document.getElementById("resultado3").style.color = "red";
            return;
        }

        if (!servidorBConectado || servidorB === "") {
            document.getElementById("resultado3").textContent = "Error: La IP del Servidor B no concuerda con la IP de la nube.";
            document.getElementById("resultado3").style.color = "red";
            return;
        }

        // Validar que las IPs de los computadores formen parte de la IP del servidor
        const servidorAPrefijo = servidorA.split('.').slice(0, 3).join('.');
        const servidorBPrefijo = servidorB.split('.').slice(0, 3).join('.');

        if (!grupoA.every(ip => ip === "" || ip.startsWith(servidorAPrefijo))) {
            document.getElementById("resultado3").textContent = `Error: Todas las IPs del Grupo A deben comenzar con "${servidorAPrefijo}."`;
            document.getElementById("resultado3").style.color = "red";
            return;
        }

        if (!grupoB.every(ip => ip === "" || ip.startsWith(servidorBPrefijo))) {
            document.getElementById("resultado3").textContent = `Error: Todas las IPs del Grupo B deben comenzar con "${servidorBPrefijo}."`;
            document.getElementById("resultado3").style.color = "red";
            return;
        }

        

        const red = document.getElementById("redVisual");
        red.innerHTML = "";

        let conectadosA = 0, conectadosB = 0;
        let cloudReady = servidorAConectado && servidorBConectado;

        // Mostrar Grupo A
        grupoA.forEach((ip, i) => {
            const div = document.createElement("div");
            div.className = "network-node" + (ip ? " connected" : "");
            div.textContent = `💻 A${i + 1}\n${ip || "sin IP"}`;
            red.appendChild(div);
            if (ip) conectadosA++;
        });

        // Servidor A
        const serverADiv = document.createElement("div");
        if (servidorA === nube[0]) {
            serverADiv.className = "network-node connected";
        }
        else {
            serverADiv.className = "network-node server";
        }
        serverADiv.textContent = `🖥️ Servidor A\n${servidorA || "sin IP"}`;
        red.appendChild(serverADiv);

        // Mostrar Grupo B
        grupoB.forEach((ip, i) => {
            const div = document.createElement("div");
            div.className = "network-node" + (ip ? " connected" : "");
            div.textContent = `💻 B${i + 1}\n${ip || "sin IP"}`;
            red.appendChild(div);
            if (ip) conectadosB++;
        });

        // Servidor B
        const serverBDiv = document.createElement("div");
        if (servidorB === nube[1]) {
            serverBDiv.className = "network-node connected";
        }
        else {
            serverBDiv.className = "network-node server";
        }
        serverBDiv.textContent = `🖥️ Servidor B\n${servidorB || "sin IP"}`;
        red.appendChild(serverBDiv);

        // Nube
        const cloudDiv = document.createElement("div");
        cloudDiv.className = "network-node cloud";
        cloudDiv.textContent = `🌐 Nube\n${nube.join(", ")}`;
        red.appendChild(cloudDiv);

        const r = document.getElementById("resultado3");
        if (conectadosA == 5 && conectadosB == 5 && cloudReady) {
            r.textContent = "¡Red conectada exitosamente!";
            r.style.color = "green";
            completado3 = true;
        } else {
            r.textContent = "Faltan conexiones o IPs. Asegúrate de conectar todos los PCs por grupo y ambos servidores a la nube.";
            r.style.color = "orange";
        }

        verificarTodo();
    } catch (e) {
        document.getElementById("resultado3").textContent = "Error en el código. Verifica la sintaxis.";
    }
}

  // Función para verificar duplicados en un array
function tieneDuplicados(array) {
    const ips = array.filter(ip => ip); // Filtrar valores vacíos
    return new Set(ips).size !== ips.length;
}
  
  function reiniciarRed() {
    document.getElementById("code3").value = `# Asigna IPs para conectar computadoras a sus servidores
        # y conecta servidores a la nube
        grupoA = ["192.168.0.1", "192.168.0.2", "", "", ""]
        grupoB = ["", "192.168.1.2", "192.168.1.3", "", ""]
        servidorA = "192.168.0.100"
        servidorB = "192.168.1.10"`;
    document.getElementById("redVisual").innerHTML = "";
    document.getElementById("resultado3").textContent = "";
    inicializarRed();
    completado3 = false;
  }
  
  function inicializarRed() {
    const grupoA = ["192.168.0.1", "192.168.0.2", "", "", ""];
    const grupoB = ["", "192.168.1.2", "192.168.1.3", "", ""];
    const servidorA = "192.168.0.100"; // IP del Servidor A
    const servidorB = "192.168.1.10"; // IP del Servidor B
    const nube = ["192.168.0.100", "192.168.1.100"]; // Simula la nube

    const red = document.getElementById("redVisual");
    red.innerHTML = "";

    // Mostrar Grupo A
    grupoA.forEach((ip, i) => {
        const div = document.createElement("div");
        div.className = "network-node" + (ip ? " connected" : "");
        div.textContent = `💻 A${i + 1}\n${ip || "sin IP"}`;
        red.appendChild(div);
    });

    // Servidor A
    const serverADiv = document.createElement("div");
    if (servidorA === nube[0]) {
        serverADiv.className = "network-node connected";
    }
    else {
        serverADiv.className = "network-node server";
    }
    serverADiv.textContent = `🖥️ Servidor A\n${servidorA || "sin IP"}`;
    red.appendChild(serverADiv);

    // Mostrar Grupo B
    grupoB.forEach((ip, i) => {
        const div = document.createElement("div");
        div.className = "network-node" + (ip ? " connected" : "");
        div.textContent = `💻 B${i + 1}\n${ip || "sin IP"}`;
        red.appendChild(div);
    });

    // Servidor B
    const serverBDiv = document.createElement("div");
    if (servidorB === nube[1]) {
        serverBDiv.className = "network-node connected";
    }
    else {
        serverBDiv.className = "network-node server";
    }
    serverBDiv.textContent = `🖥️ Servidor B\n${servidorB || "sin IP"}`;
    red.appendChild(serverBDiv);

    // Nube
    const cloudDiv = document.createElement("div");
    cloudDiv.className = "network-node cloud";
    cloudDiv.textContent = `🌐 Nube\n${nube.join(", ")}`;
    red.appendChild(cloudDiv);
}

// Verifica final
function verificarTodo() {
    if (completado1 && completado2 && completado3) {
        document.getElementById("mensajeFinal").textContent = "🎉 ¡Has completado todas las actividades!";
        setTimeout(function() {
            window.location.href = "/html/final.html";  // Redirige a otra página
        }, 1000); // Redirige después de 1 segundos
    }
}
