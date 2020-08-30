let URL = 'http://localhost:8081/estados';

const btnListar = id("btnListar");
const btnRegistrar = id("btnRegistrar");
const btnActualizar = id("btnActualizar");

const tblEstados = q("#tblEstados tbody");

window.onload = () => {
    listar();
}

document.addEventListener("click", ev => {
    if( (/\bbtnEditar/.test(ev.target.className)) ){
        actualizar(ev.target)
    }else if( (/\bbtnEliminar/.test(ev.target.className)) ){
        eliminar(ev.target)
    }else{
        return;
    }
});

const listar = () => {
    fetch(URL, {
        method: "GET"
    })
    .then(response => {
        log(response)
        return response.json()
    })
    .then(response => {
        log(response)
        tblEstados.innerHTML = "";
        response.forEach(item => {
            tblEstados.innerHTML += `<tr>
                                        <td>${item.id_estado}</td>
                                        <td>${item.estado}</td>
                                      
                                       
                                        <td>
                                            <button class='btn btn-outline-success btnEditar' data-id='${item.id_estado}' data-estado='${JSON.stringify(item)}'>Editar</button>
                                            <button class='btn btn-outline-danger btnEliminar' data-id='${item.id_estado}'>Eliminar</button>
                                        </td>
                                    </tr>`;
        })
    })
    .catch(error => {
        log(error)
    });
}

btnListar.onclick = () => {
    listar();
}