// -- difnir -- //  
const precoInteira = 30;
const precoMeia = 15;
const filme = sessionStorage.getItem("filme");                     //define//
const horario = sessionStorage.getItem("horario");                 //                //
const storageKey = `assentos_${filme}_${horario}`;                 // -- LS -- //
// -- estado das gravadas -- //
let assentosSelecionados = {};
let assentosOcupados = JSON.parse(localStorage.getItem(storageKey)) || [];     //carrega oq esta salvo//  //se n//  //mantem sem nd []//         // transformar em um array JavaScript e se não existir nada salvo usa um array vazio [].//

// /// cria sala /// //
const sala = document.getElementById("sala");
// -- cria 40 assentos -- //
for (let i = 1; i <= 81; i++) {              // cria i ; enquanto i < 9 ; i aumenta em 1//
    const div = document.createElement("div");               //cria o elemento(div) com um id=sala//
    div.classList.add("assento");                           //add a class "assento" no elemento(div) id=sala//
    div.textContent = i;                                   //pega valor i e escreve
// -- verificador -- //
    if (assentosOcupados.includes(i)) {    //se i estiver dendro de (assentosOcupados)//
        div.classList.add("ocupado");      //add class "ocupado"//     //n permitindo interagir//
    }
// -- add onclick a div -- //
    div.onclick = () => selecionarAssento(i, div);            
    sala.appendChild(div);                                //aplica visivel no html
}


// ///selecao/// //
// -- div onclick -- //
function selecionarAssento(numero, el) {                   // numero do assento// //elemento clicado//
    if (el.classList.contains("ocupado")) return;          //impede de clicar em ocupado//
// -- clicar dnv desmarca-- //
    if (assentosSelecionados[numero]) {                 
        delete assentosSelecionados[numero];
         console.log(numero)
        el.classList.remove("selecionado");                    //quando clica dnv// // retira a class//
    } else {                                          //se n estiver selecionado//
        const tipo = document.querySelector('input[name="tipo"]:checked').value;     //pega o ti pode de assento//
        assentosSelecionados[numero] = tipo;                      //   assentosSelecionados[5] = "meia";    //
        el.classList.add("selecionado");                   // add class//
    }

    atualizarResumo();
}

// /// Mostrar /// //
function atualizarResumo() {
    let inteira = 0;
    let meia = 0;

    Object.values(assentosSelecionados).forEach(tipo => {          //pega o valor de assentosSelecionados//
        tipo === "inteira" ? inteira++ : meia++;           //se o tipo = inteira soma 1 ainteira // //se n // //soma a meia//
    });

// -- mostradouro -- //
    document.getElementById("qtdInteira").textContent = inteira;       //quantas inteiras
    document.getElementById("qtdMeia").textContent = meia;             //quantas meias
    const subI = inteira * precoInteira;                               //quantas vzs o valor
    const subM = meia * precoMeia;                                     //quantas vzs o valor
    document.getElementById("subInteira").textContent = subI.toFixed(2);
    document.getElementById("subMeia").textContent = subM.toFixed(2);
    document.getElementById("total").textContent = (subI + subM).toFixed(2);
}

//-- compra --//
function comprar() {
    const novosOcupados = Object.keys(assentosSelecionados).map(Number);      // pega o numero dos assentos e transforma em de verdade // 
    assentosOcupados = assentosOcupados.concat(novosOcupados);                //junta os q ja estao ocupados //

    localStorage.setItem(storageKey, JSON.stringify(assentosOcupados));      //JSON.stringify transforma array em texto////setItem grava no localStorage//
    alert("Compra realizada com sucesso");

    location.reload(); //recarrega pagina//
}
/*
// -- impede o abrimento desta pagina -- //   // de preferencia no top do js //
if (!filme || !horario) {
    alert("Sessão não selecionada!");
    window.location.href = "pagina_login.html";
}*/