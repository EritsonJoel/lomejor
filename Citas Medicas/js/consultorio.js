let URL = 'http://localhost:8081/consultorios';

const btnListar = id("btnListar");
const btnRegistrar = id("btnRegistrar");
const btnActualizar = id("btnActualizar");

const tblConsultorios = q("#tblConsultorios tbody");

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
        tblConsultorios.innerHTML = "";
        response.forEach(item => {
            tblConsultorios.innerHTML += `<tr>
                                        <td>${item.id_consultorio}</td>
                                        <td>${item.puerta}</td>
                                        <td>${item.piso}</td>
                                        
                                        <td>
                                            <button class='btn btn-outline-success btnEditar' data-id='${item.id_consultorio}' data-consultorio='${JSON.stringify(item)}'>Editar</button>
                                            <button class='btn btn-outline-danger btnEliminar' data-id='${item.id_consultorio}'>Eliminar</button>
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
    let consultorio = {
        puerta: id("txtPuerta").value,
        piso: id("txtPiso").value
       
    }
    let data = JSON.stringify(consultorio)
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
    let consultorio = JSON.parse(elemento.getAttribute('data-consultorio'))
    id("txtPuerta").value = consultorio.puerta
    id("txtPiso").value = consultorio.piso
    let id_consultorio = elemento.getAttribute('data-id')
    btnActualizar.setAttribute('data-id', id_consultorio);
}

btnActualizar.onclick = (ev) => {
    let consultorio = {
        id_consultorio: ev.target.getAttribute('data-id'),
        puerta: id("txtPuerta").value,
        piso: id("txtPuerta").value
    
    }
    let data = JSON.stringify(consultorio)
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
    let id_consultorio = elemento.getAttribute('data-id');
    fetch(URL+"/"+id_consultorio, {
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