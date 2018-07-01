//'use strict';

const LILapi = require('./calc/LILapi.js');


var TT = new LILapi();

// liste des villes
//console.log(TT.CITIES);

// listes des dates
//console.log(TT.DATES.slice(0, 3));
var tab_dates = TT.DATES;
//console.log(tab_dates);
// jour / prix ouverture / prix fermeture

//console.log(PrixOpenCloseParis.slice(-3));


// la fonction principale :  TT.Ask(ville, date, i)
// ici juste un exemple pour test
function getDay(date, ville)
{
    var tt = []
    for (var i = 0; i < 86400; i++)
        tt.push( TT.Ask(ville, date, i) );
    return tt;
}

function getYear(date, ville)
{
    // exploser la date et récupérer l'année
    var annee = date.split("/");
    var year = annee[2];
    // récup les 1998 dates
    var tab_des_bonnes_annees = [];
    tab_dates.forEach(function(ladate) {
      var contient_annee = (ladate.indexOf(year) > -1);
      if(contient_annee) tab_des_bonnes_annees.push(ladate);
    });
    // stocker toutes les dates ont la bonne année
    console.log(tab_des_bonnes_annees);
    var tt = []
    tab_des_bonnes_annees.forEach(function(ladate) {
      for (var i = 0; i < 86400; i++)
          tt.push( TT.Ask(ville, ladate, i) );
    });
    return tt;
    // pour chacune, faire la moulinette
}
// le format de la date
var date = '02/01/2017';
var ville = 'Paris';

var DayData = GetOpenPricesDate('Paris', '12/12/2017');
console.log(DayData);


/*
function write(date, ville)
{
    var tt = getDay(date, ville);
    date = date.replace('/', '');
    date = date.replace('/', '');
    var fs = require('fs');
    fs.writeFileSync('C:/temp/csv/tab' + date + ville + '.csv', tt);

    for (var i = 0; i < PrixOpenParis.length; i++)
    for (var t = 0; t < 4; t++)
    {
        var ville = TT.CITIES[t];
    var date = PrixOpenParis[i][0];
    write(date, ville);

    }
}
*/
