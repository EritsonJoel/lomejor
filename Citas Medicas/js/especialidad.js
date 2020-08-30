let URL = 'http://localhost:8081/especialidades';

const btnListar = id("btnListar");
const btnRegistrar = id("btnRegistrar");
const btnActualizar = id("btnActualizar");

const tblEspecialidad = q("#tblEspecialidad tbody");

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
        tblEspecialidad.innerHTML = "";
        response.forEach(item => {
            tblEspecialidad.innerHTML += `<tr>
                                        <td>${item.id_especialidad}</td>
                                        <td>${item.nombre_espe}</td>
                                     
                                        <td>
                                            <button class='btn btn-outline-success btnEditar' data-id='${item.id_especialidad}' data-especialidad='${JSON.stringify(item)}'>Editar</button>
                                            <button class='btn btn-outline-danger btnEliminar' data-id='${item.id_especialidad}'>Eliminar</button>
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
    let especialidad = {
        nombre_espe: id("txtNombre").value

    }
    let data = JSON.stringify(especialidad)
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
    let especialidad = JSON.parse(elemento.getAttribute('data-especialidad'))
    id("txtNombre").value = especialidad.nombre_espe
    
    let id_especialidad = elemento.getAttribute('data-id')
    btnActualizar.setAttribute('data-id', id_especialidad);
}

btnActualizar.onclick = (ev) => {
    let medico = {
        id_especialidad: ev.target.getAttribute('data-id'),
        nombre_espe: id("txtNombre").value
      
    }
    let data = JSON.stringify(especialidad)
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
    let id_especialidad = elemento.getAttribute('data-id');
    fetch(URL+"/"+id_especialidad, {
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