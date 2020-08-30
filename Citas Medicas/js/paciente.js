let URL = 'http://localhost:8081/pacientes';

const btnListar = id("btnListar");
const btnRegistrar = id("btnRegistrar");
const btnActualizar = id("btnActualizar");

const tblPacientes = q("#tblPacientes tbody");

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
        tblPacientes.innerHTML = "";
        response.forEach(item => {
            tblPacientes.innerHTML += `<tr>
                                        <td>${item.id_paciente}</td>
                                        <td>${item.nombre}</td>
                                        <td>${item.apellidos}</td>
                                        <td>${item.dni}</td>
                                    
                                        <td>
                                            <button class='btn btn-outline-success btnEditar' data-id='${item.id_paciente}' data-paciente='${JSON.stringify(item)}'>Editar</button>
                                            <button class='btn btn-outline-danger btnEliminar' data-id='${item.id_paciente}'>Eliminar</button>
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

btnRegistrar.onclick = () => {
    let pacientes = {
        nombre: id("txtNombre").value,
        apellidos: id("txtApellido").value,
        dni: id("txtDni").value
    }
    let data = JSON.stringify(pacientes)
    fetch(URL, {
        method: "POST",
        body: data
    })
    .then(response => {
        log(response)
        if(response.ok){
            listar()
        }
        return response.json()
    })
    .then(response => {
        log(response)
    })
    .catch(error => {
        log(error)
    });

}
