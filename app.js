const resultsAreaEl = document.querySelector('.results__area')
const searchInput = document.querySelector('.search__bar--input') 
const yearFilter = document.querySelector('.slider')
let filterStatus = false

async function renderResults() {
    if (searchInput.value){
        addLoader()
        addQuery(searchInput.value)
    }
    
    let searchValue = searchInput.value

    const resultFetch = await fetch(`https://www.omdbapi.com/?apikey=3bdb36d&s=${searchValue}`);
    const result = await resultFetch.json();

    // console.log(typeof result.Response)

    let filteredResults = addYearFilter(result.Search, yearFilter.value, filterStatus)

    console.log(filteredResults)

    if (result.Response === 'True' && filteredResults.length !==0) {
        const resultHtml = filteredResults.map(
            (movie) =>
                `
            <div class="result">
                <figure class="result__cover">
                    <img src="${movie.Poster}" alt="" class="result__cover--img">
                </figure>
                <div class="result__info">
                    <h3 class="result__title">${movie.Title}</h3>
                    <p class="result__year">${movie.Year}</p>
                </div>
    
            </div>
            `
        )
        .slice(0,6)
        .join('');
        
        resultsAreaEl.innerHTML = resultHtml
        
    }
    else{
        resultsAreaEl.innerHTML = 'No movies found!'
    }
    removeLoader()
}

function addLoader() {
    document.body.classList += ' loader__bg--visible'
}

function removeLoader() {
    document.body.classList.remove('loader__bg--visible')
}

function addQuery(query){
    const queryLocation = document.querySelector('.query-result')
    queryLocation.innerHTML = `Search result for <span class="green">'${query}'</span>`
}

async function addYear(event) {
    document.querySelector('.year-render').innerHTML = event.target.value
    if (filterStatus === true) {
        renderResults()
    }
}

function addYearFilter(resultArray, year, status) {
    if (status) {
        return resultArray.filter(movie => movie.Year.includes(year))
    }
    return resultArray
}

function toggleFilterStatus() {
    filterStatus = !filterStatus
    renderResults()
}

