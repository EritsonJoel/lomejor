let URL = 'http://localhost:8081/citas';

const btnListar = id("btnListar");
const btnRegistrar = id("btnRegistrar");
const btnActualizar = id("btnActualizar");

const tblCitas = q("#tblCitas tbody");

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
        tblCitas.innerHTML = "";
        response.forEach(item => {
            tblCitas.innerHTML += `<tr>
                                        <td>${item.id_citas}</td>
                                        <td>${item.fecha}</td>
                                        <td>${item.hora}</td>
                                        <td>${item.paciente}</td>
                                        <td>${item.medico}</td>
                                 
                                       
                                        <td>
                                            <button class='btn btn-outline-success btnEditar' data-id='${item.id_citas}' data-cita='${JSON.stringify(item)}'>Editar</button>
                                            <button class='btn btn-outline-danger btnEliminar' data-id='${item.id_citas}'>Eliminar</button>
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
    let cita = {
        fecha: id("txtFecha").value,
        hora: id("txtHora").value,
        paciente: id("txtPaciente").value,
        medico: id("txtMedico").value,
        estado: id("txtEstado").value
    }
    let data = JSON.stringify(cita)
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

const actualizar = elemento => {
    let cita = JSON.parse(elemento.getAttribute('data-cita'))
    id("txtFecha").value = cita.fecha
    id("txtHora").value = cita.hora
    id("txtPaciente").value = cita.paciente
    id("txtMedico").value = cita.medico
    id("txtEstado").value = cita.estado
    let id_citas = elemento.getAttribute('data-id')
    btnActualizar.setAttribute('data-id', id_citas);
}

btnActualizar.onclick = (ev) => {
    let cita = {
        id_citas: ev.target.getAttribute('data-id'),
        fecha: id("txtFecha").value,
        hora: id("txtHora").value,
        paciente: id("txtPaciente").value,
        medico: id("txtMedico").value,
        estado: id("txtEstado").value
    }
    let data = JSON.stringify(cita)
    fetch(URL, {
        method: "PUT",
        body: data
    })
    .then(response => {
        log(response)
        if(response.ok)
            return response.json()
        else
            alert(response.text()) 
    })
    .then(response => {
        log(response)
        listar()
    })
    .catch(error => {
        log(error)
    });
}

const eliminar = elemento => {
    let id_citas = elemento.getAttribute('data-id');
    fetch(URL+"/"+id_citas, {
        method: "DELETE"
    })
    .then(response => {
        log(response)
        if(response.ok)
            return response.text()
        else
            alert(response.text())
    })
    .then(response => {
        log(response)
        listar()
    })
    .catch(error => {
        log(error)
    });
}