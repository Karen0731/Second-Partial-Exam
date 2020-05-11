
//https://pokeapi.co/api/v2/pokemon/{id or name}/

function fetchPokemons(searchPok)
{
    let url = `https://pokeapi.co/api/v2/pokemon/${searchPok}/`;

    let settings={
        method:'GET'
    };

    let results = document.querySelector('.js-search-results');
    results.innerHTML="";

    fetch(url,settings)
        .then(response=>{
            if(response.status===200)
            {
                return response.json();
            }
            {
                results.innerHTML +=
                    `<div>
                        Pokemon not found
                    </div>`;
                throw new Error(response.statusText);
            }
        })
        .then(responseJSON=>{
            displayResults(responseJSON);
        })
        .catch(err=>{
            console.log(err);
        })
}

function displayResults(data){
    let results = document.querySelector('.js-search-results');
    results.innerHTML="";

    results.innerHTML+=
        `<div>
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_default}"/>    
        </div>`;

    results.innerHTML+=`<div><h2>Moves</h2></div>`;

    for(let i = 0;i<data.moves.length;i++)
    {
        results.innerHTML+=
            `<div>
                <p>${data.moves[i].move.name}</p>
             </div>`;
    }

    results.innerHTML+=`<div><h2>Stats</h2></div>`;

    for(let i = 0;i<data.stats.length;i++)
    {
        results.innerHTML+=
            `<div>
                <p>${data.stats[i].stat.name}</p>
             </div>`;
    }

}

function watchForm()
{
    let pokForm = document.querySelector('.js-search-form');

    pokForm.addEventListener('submit',(event)=>{
       event.preventDefault();
       let searchPok = document.getElementById('query').value;
       fetchPokemons(searchPok);
    });

}

function init()
{
    watchForm();
}

init();
