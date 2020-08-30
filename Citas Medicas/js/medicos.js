let URL = 'http://localhost:8081/medicos';

const btnListar = id("btnListar");
const btnRegistrar = id("btnRegistrar");
const btnActualizar = id("btnActualizar");

const tblMedicos = q("#tblMedicos tbody");

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
        tblMedicos.innerHTML = "";
        response.forEach(item => {
            tblMedicos.innerHTML += `<tr>
                                        <td>${item.id_medico}</td>
                                        <td>${item.nombre}</td>
                                        <td>${item.especialidad}</td>
                                        <td>${item.horario}</td>
                                        <td>
                                            <button class='btn btn-outline-success btnEditar' data-id='${item.id_medico}' data-medico='${JSON.stringify(item)}'>Editar</button>
                                            <button class='btn btn-outline-danger btnEliminar' data-id='${item.id_medico}'>Eliminar</button>
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
    let medico = {
        nombre: id("txtNombre").value,
        especialidad: id("txtEspecialidad").value,
        horario: id("txtHorario").value
    }
    let data = JSON.stringify(medico)
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
    let medico = JSON.parse(elemento.getAttribute('data-medico'))
    id("txtNombre").value = medico.nombre
    id("txtEspecialidad").value = medico.especialidad
    id("txtHorario").value = medico.horario
    let id_medico = elemento.getAttribute('data-id')
    btnActualizar.setAttribute('data-id', id_medico);
}

btnActualizar.onclick = (ev) => {
    let medico = {
        id_medico: ev.target.getAttribute('data-id'),
        nombre: id("txtNombre").value,
        especialidad: id("txtEspecialidad").value,
        horario: id("txtHorario").value
    }
    let data = JSON.stringify(medico)
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
    let id_medico = elemento.getAttribute('data-id');
    fetch(URL+"/"+id_medico, {
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