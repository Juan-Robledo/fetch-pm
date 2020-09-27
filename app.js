let container = document.querySelector("div");

fetch('https://apis.datos.gob.ar/georef/api/provincias')
.then(response => response.json())
.then(data => {

    let select = document.createElement("select");
    let optDefault = document.createElement("option");
    optDefault.innerHTML = "Seleccioná una opción";
    select.appendChild(optDefault);

    data.provincias.forEach(function(provincia){

    let option = document.createElement("option");
    option.value = provincia.id;
    option.innerHTML = `${provincia.id} - ${provincia.nombre}`;
    select.appendChild(option);
    })

    container.appendChild(select);
    select.addEventListener("change",function(){
    let selectID = select.value;

    if(selectID == '' && info != undefined){
        info.innerHTML = '';
        return false;
    }
    let info = document.querySelector('.info');
    if(info != undefined){
        info.innerHTML = '';
    }else{
        info = document.createElement("div")
        info.classList.add('info');
        container.appendChild(info);
    }
        console.log(selectID)

    fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${selectID}`)
        .then(response => response.json())
        .then(data => {
        let lista = document.createElement("ul");

        data.municipios.forEach(function(municipio){
            let munProv = municipio.nombre
            let item = document.createElement("li");
            item.innerHTML += munProv;
            lista.appendChild(item);
        })
        info.appendChild(lista);
        })
        .catch(err => {
        $msgError = document.createElement("div");
        $msgError.innerHTML = "Lo sentimos, por favor vuelva a intentarlo màs tarde."
        $container.appendChild($msgError);
        })
    })
})

.catch(err => {
        $msgError = document.createElement("div");
        $msgError.innerHTML = "Lo sentimos, por favor vuelva a intentarlo màs tarde."
        $container.appendChild($msgError);
})