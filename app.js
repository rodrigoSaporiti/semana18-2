// fetch users
const link = "https://6542c29e01b5e279de1f8b12.mockapi.io/users";

async function dataUsers() {
  const res = await fetch(link);
  const data = await res.json();
  return data;
}

//funcion para error
function error() {
  let alerta = document.createElement("div");
  alerta.innerHTML = `
      

      <div class="alert alert-danger text-center" role="alert">
       Algo salió mal...
  </div>
      
      
      
      
      `;
  let divPrimero = document.getElementById("divPrimero");

  document.body.insertBefore(alerta, divPrimero);

  setTimeout(function () {
    alerta.remove();
  }, 2000);
}

// funcion para correcto

function correcto(palabra) {
  let alerta = document.createElement("div");
  alerta.innerHTML = `
            
      
            <div class="alert alert-success text-center" role="alert">
             Se ${palabra} Correctamente
        </div>
            
            
            
            
            `;
  let divPrimero = document.getElementById("divPrimero");

  document.body.insertBefore(alerta, divPrimero);

  setTimeout(function () {
    alerta.remove();
  }, 2000);
}

// funcion para mostrar luego de click

async function mostrar() {
  nodo.innerHTML = "";
  let db = await dataUsers();

  let myElement = document.createElement("div");
  db.forEach((element) => {
    myElement.innerHTML += `
                <div class="col-6">
                  ID = ${element.id}<br>
                  name = ${element.name}<br>
                  lastname = ${element.lastname}<br>
                  <hr>
                </div>
              `;
  });
  myElement.classList.add("text-start", "text-white", "m-auto", "row");
  nodo.appendChild(myElement);
}

//nodo hijo
let nodo = document.getElementById("nodo");

// boton buscar usuarios parte 1
////--------------------------------------------------------------------------------------------------------------------/////

let botonRegistro = document.getElementById("botonRegistro");

botonRegistro.addEventListener("click", async () => {
  let buscarRegistro = document.getElementById("buscarRegistro").value;

  let db = await dataUsers();

  console.log(buscarRegistro);
  let traerRegistro = db.filter(
    (element) => buscarRegistro == JSON.parse(element.id)
  );

  console.log(traerRegistro);

  let myElement = document.createElement("div");

  if (buscarRegistro == "") {
    mostrar();
  } else if (traerRegistro.length == 0) {
    error();
  } else {
    nodo.innerHTML = "";

    traerRegistro.forEach((element) => {
      myElement.innerHTML = ` 
      
      <div class="col-6">
      ID = ${element.id}<br>
      name = ${element.name}<br>
      lastname = ${element.lastname}<br>
       <hr>

        </div>
  
  
      `;

      myElement.classList.add("text-start", "text-white", "m-auto", "row");
      nodo.appendChild(myElement);
    });
  }
});

// parte 2 post
////--------------------------------------------------------------------------------------------------------------------/////

let botonPost = document.getElementById("botonAgregar");
let apellidoRegistro = document.getElementById("apellidoRegistro");
let nombreRegistro = document.getElementById("nombreRegistro");

function botonDisabled() {
  let apellido = apellidoRegistro.value;
  let nombre = nombreRegistro.value;

  if (apellido !== "" && nombre !== "") {
    botonPost.removeAttribute("disabled");
  } else {
    botonPost.setAttribute("disabled", "disabled");
  }
}

apellidoRegistro.addEventListener("input", botonDisabled);
nombreRegistro.addEventListener("input", botonDisabled);

botonPost.addEventListener("click", async () => {
  event.preventDefault();

  let apellido = document.getElementById("apellidoRegistro").value;
  let nombre = document.getElementById("nombreRegistro").value;
  console.log(nombre, apellido);

  let datos = {
    ID: " ",
    name: nombre,
    lastname: apellido,
  };

  fetch("https://6542c29e01b5e279de1f8b12.mockapi.io/users", {
    method: "POST",
    body: JSON.stringify(datos),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      mostrar();
    })
    .catch((err) => console.log(err));
});

// parte 3 put
////--------------------------------------------------------------------------------------------------------------------/////

let botonModificar = document.getElementById("botonModificar");
let modificarDisabled = document.getElementById("modificarDisabled");
let numeroModif = document.getElementById("numeroId");

function buttonDisabled() {
  let numeroModificador = numeroModif.value;

  if (numeroModificador !== "") {
    modificarDisabled.removeAttribute("disabled");
  } else {
    modificarDisabled.setAttribute("disabled", "disabled");
  }
}

numeroModif.addEventListener("input", buttonDisabled);

botonModificar.addEventListener("click", async () => {
  event.preventDefault();

  let numeroModif = document.getElementById("numeroId").value;
  let name = document.getElementById("name").value;
  let lastname = document.getElementById("lastname").value;

  let datos = {
    ID: " ",
    name: name,
    lastname: lastname,
  };

  let db = await dataUsers();

  let traerNuevoModif = db.filter(
    (element) => numeroModif == JSON.parse(element.id)
  );

  if (traerNuevoModif.length == 0) {
    error();
  } else {
    fetch(`https://6542c29e01b5e279de1f8b12.mockapi.io/users/${numeroModif}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        correcto("modifico");
        mostrar();
      })
      .catch((err) => console.log(err));
  }
});

//parte 4 delete
////--------------------------------------------------------------------------------------------------------------------/////

let botonBorrar = document.getElementById("botonBorrar");
let numeroIdBorrar = document.getElementById("numeroIdBorrar");

function botonBorrarDisabled() {
  let numeroIdBorrarValue = numeroIdBorrar.value;

  if (numeroIdBorrarValue !== "") {
    botonBorrar.removeAttribute("disabled");
  } else {
    botonBorrar.setAttribute("disabled", "disabled");
  }
}

numeroIdBorrar.addEventListener("input", botonBorrarDisabled);

botonBorrar.addEventListener("click", async () => {
  let numeroIdBorrar = document.getElementById("numeroIdBorrar").value;

  let db = await dataUsers();

  let traerNuevoBorrar = db.filter(
    (element) => numeroIdBorrar == JSON.parse(element.id)
  );

  if (traerNuevoBorrar.length == 0) {
    error();
  } else {
    fetch(
      `https://6542c29e01b5e279de1f8b12.mockapi.io/users/${numeroIdBorrar}`,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    )
      .then((json) => {
        console.log(json);
        correcto("modifico");
        mostrar();
      })
      .catch((err) => console.log(err));
  }
});
