// Função para cadastrar os Estados apartir da API do IBGE

function populateUFs() {
    
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }


    } )
}

populateUFs()

// Função para trazer as cidades de um estado após selecionar o mesmo.

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a cidade </option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

// Informa as funções a mudança de estado

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Itens de Coleta

//Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li") //Todos os li dentro da classe items-grid são armazenados na variavel "itemsToCollect"

for (const item of itemsToCollect) { //Para cada item dentro de "itemsToCollect"
    item.addEventListener("click", handleSelectedItem) // Adiciona um ouvidor de eventos para cada item dentro de "itemsToCollect",
    // neste cado o click, após cria-se uma referência a uma função no caso a "handleSelectedItem"
}

//Criar variavel para armazenar quais são os itens selecionados


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) { //função para capturar o evento ouvido pelo for
    
    const itemLi = event.target // joga para a variavel "itemLi" sinalizando quando o elemento foi clicado

    // adcionar ou remover uma classe com JS
    itemLi //Variavel
        .classList //criador de funcionalidade
            .toggle("selected") //Funcionalidade, no caso toggle adiciona ou remove a classe
     // O toggle verifica se na lista de classe do elemento existe ou não a classe citada, nisto ele adiciona ou remove a classe
    const itemId = itemLi.dataset.id // joga para a variavel "itemId" o numero dentro da data-id do html

    
    
    //Verificar se exisem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => { //Compara os itens selecionados para realizar uma função
        const itemFound = item == itemId  // retorna true ou false 
        return itemFound
    } )

    // Se ja estiver selecionado, 

     if( alreadySelected >= 0 ) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        } )

        selectedItems = filteredItems
      } else { // Se Não estiver Selecionado, Adicionar a seleção

        selectedItems.push(itemId)

      }

      console.log(selectedItems)

    //atualizar o campo escondido com os itens selecionados
      collectedItems.value = selectedItems
}