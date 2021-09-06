//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_PRICE = "09";
const ORDER_DESC_BY_PRICE = "90";
const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_BY_PROD_COUNT_DESC = "Cant.desc";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array){
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE)
  {
      result = array.sort(function(a, b) {
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_PRICE){
      result = array.sort(function(a, b) {
          if ( a.cost > b.cost ){ return -1; }
          if ( a.cost < b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_BY_PROD_COUNT){
      result = array.sort(function(a, b) {
          let aCount = parseInt(a.soldCount);
          let bCount = parseInt(b.soldCount);

          if ( aCount > bCount ){ return -1; }
          if ( aCount < bCount ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_BY_PROD_COUNT_DESC){
    result = array.sort(function(b, a) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);

        if ( aCount > bCount ){ return -1; }
        if ( aCount < bCount ){ return 1; }
        return 0;
    });
}

  return result;
}


var categoriesArray = [];

//Esta sección se recicló del ejercicio 4.6 para mostrar los prodcutos (objt js) con sus respectivos atriubutos
function showCategoriesList(array) {
  console.log(array)
  let htmlContentToAppend = '';
  for (let i = 0; i < array.length; i++) {
    let category = array[i];

    if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){
    htmlContentToAppend +=
      `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` +
      category.imgSrc +
      `" alt="` +
      category.description +
      `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` +
      category.name +
      `</h4>
                        <small class="text-muted">` +
      category.soldCount +
      ` artículos</small>
                    </div>
                    <p>` +
      category.description +
      `</p>
      <p>` +
      category.cost +
      ' ' +
      category.currency +
      `</p>
                </div>
            </div>
        </div>
        `;
 }
    document.getElementById('cat-list-container').innerHTML =
      htmlContentToAppend;
  }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
  currentSortCriteria = sortCriteria;

  if(categoriesArray != undefined){
      currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

  //Muestro las categorías ordenadas
  showCategoriesList(currentCategoriesArray);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Se cambio el nombre de la URL para products
document.addEventListener('DOMContentLoaded', function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      currentCategoriesArray = resultObj.data;
      //Muestro las categorías ordenadas
      showCategoriesList(currentCategoriesArray);
    }
  });
});

document.getElementById("sortPriceAsc").addEventListener("click", function(){
  sortAndShowCategories(ORDER_ASC_BY_PRICE);
});

document.getElementById("sortPriceDesc").addEventListener("click", function(){
  sortAndShowCategories(ORDER_DESC_BY_PRICE);
});

document.getElementById("sortByCount").addEventListener("click", function(){
  sortAndShowCategories(ORDER_BY_PROD_COUNT);
});

document.getElementById("sortByCountDesc").addEventListener("click", function(){
  sortAndShowCategories(ORDER_BY_PROD_COUNT_DESC);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";

  minCount = undefined;
  maxCount = undefined;

  showCategoriesList(currentCategoriesArray);
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
  //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
  //de productos por categoría.
  minCount = document.getElementById("rangeFilterCountMin").value;
  maxCount = document.getElementById("rangeFilterCountMax").value;

  if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
      minCount = parseInt(minCount);
  }
  else{
      minCount = undefined;
  }

  if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
      maxCount = parseInt(maxCount);
  }
  else{
      maxCount = undefined;
  }

  showCategoriesList(currentCategoriesArray);
});

