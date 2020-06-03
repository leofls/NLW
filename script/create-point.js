// @ts-nocheck

function populateUfs (){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then(states => {

        for( state of states){
            ufSelect.innerHTML += `<option value=" ${state.id} ">${ state.nome }</option>`
            
        }        
    })
}

populateUfs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")
   
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = `<option value=''>Selecione a cidade</option>`
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then(cities => {   

        for( city of cities){
            citySelect.innerHTML += `<option value=" ${city.nome } ">${ city.nome }</option>`
            
        }    
        citySelect.disabled = false    
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Itens de coleta

// pegar todos os li
const itensToCollect = document.querySelectorAll(".itens-grid li")

for(item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    // Adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionado, se sim
    //pegar os itens selecionado

    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId
        return itemFound
    } )

    console.log(alreadySelected)
    //se tiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
        //se não tiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido(items) com os itens selecionado
    collectedItems.value = selectedItems

}