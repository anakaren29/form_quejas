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

const fileInput = document.getElementById('fileInput');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const fileType = document.getElementById('fileType');

 // Definir límites y tipos de archivos permitidos
 const FILE_LIMITS = {
    text: {
        maxSize: 1 * 1024 * 1024, // 1MB
        types: ['.txt', '.doc', '.docx'],
        mimeTypes: ['text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    },
    mediaSmall: {
        maxSize: 2 * 1024 * 1024, // 2MB
        types: ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.mp3', '.wav'],
        mimeTypes: ['image/jpeg', 'image/png', 'image/bmp', 'image/tiff', 'audio/mpeg', 'audio/wav']
    },
    mediaLarge: {
        maxSize: 20 * 1024 * 1024, // 20MB
        types: ['.pdf', '.mov', '.mp4', '.mpg', '.avi', '.wmv'],
        mimeTypes: ['application/pdf', 'video/quicktime', 'video/mp4', 'video/mpeg', 'video/x-msvideo', 'video/x-ms-wmv']
    }
};

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileCategory(file) {
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    
    for (const [category, limits] of Object.entries(FILE_LIMITS)) {
        if (limits.types.includes(extension) || limits.mimeTypes.includes(file.type)) {
            return category;
        }
    }
    return null;
}

function showError(message) {
    errorMessage.querySelector('.message').textContent = message;
    $(errorMessage).fadeIn();
}

fileInput.addEventListener('change', function(e) {
    // Resetear mensajes
    $(errorMessage).hide();
    $(successMessage).hide();
    $(fileInfo).hide();

    const file = e.target.files[0];
    
    if (file) {
        // Mostrar información del archivo
        fileName.textContent = file.name;
        fileSize.textContent = formatBytes(file.size);
        fileType.textContent = file.type || 'Tipo no detectado';
        $(fileInfo).fadeIn();

        // Validar archivo
        const category = getFileCategory(file);
        
        if (!category) {
            showError('Tipo de archivo no permitido');
            fileInput.value = '';
            return;
        }

        const limit = FILE_LIMITS[category];
        if (file.size > limit.maxSize) {
            showError(`El archivo excede el límite de ${formatBytes(limit.maxSize)} para su tipo`);
            fileInput.value = '';
            return;
        }

        // Archivo válido
        $(successMessage).fadeIn();
    }
});