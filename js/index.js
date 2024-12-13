let opcion_si = document.getElementById("opcion_si");
let opcion_no = document.getElementById("opcion_no");
let div_datos = document.getElementById("div_datos");

let cargar_si = document.getElementById("cargar_si");
let cargar_no = document.getElementById("cargar_no");
let div_upload = document.getElementById("div_upload");

function mostrarElementos(opcion1, opcion2, seccionDiv, mostrarStyle = 'block') {
    opcion1.addEventListener('change', () => {
        if (opcion1.checked) {
            seccionDiv.style.display = mostrarStyle;
            opcion2.checked = false;
        } else {
            seccionDiv.style.display = 'none';
        }
    });

    opcion2.addEventListener('change', () => {
        if(opcion2.checked){
            seccionDiv.style.display = 'none';
            opcion1.checked = false
        }
    })
}

mostrarElementos(opcion_si, opcion_no, div_datos);
mostrarElementos(cargar_si, cargar_no, div_upload);