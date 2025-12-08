// Agregar este script en el layout.ejs ANTES de cualquier otro script
// O crear un archivo public/js/auth-helper.js e importarlo

// Helper para hacer fetch con token automático
function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Debes iniciar sesión primero');
        window.location.href = '/login';
        return Promise.reject('No token');
    }

    // Agregar headers por defecto
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    // Combinar headers
    options.headers = {
        ...defaultHeaders,
        ...(options.headers || {})
    };

    return fetch(url, options)
        .then(async response => {
            // Si es 401 o 403, redirigir al login
            if (response.status === 401 || response.status === 403) {
                const data = await response.json();
                alert(data.message || 'Sin autorización');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
                throw new Error(data.message);
            }
            return response;
        });
}

// Ejemplo de uso:
// fetchWithAuth('/agregarPelicula', {
//     method: 'POST',
//     body: JSON.stringify(datos)
// })
// .then(r => r.json())
// .then(data => console.log(data));