const LILapi = require('./calc/LILapi.js');
var TT = new LILapi();
module.exports = {
   getDay: function(date, ville) {
      var tt = []
      for (var i = 0; i < 86400; i++) tt.push(TT.Ask(ville, date, i));
      return tt;
   },
   getMsSinceMidnight: function() {
      var now = new Date();
      var hours = now.getHours() * (60 * 60);
      var minutes = now.getMinutes() * 60;
      var seconds = now.getSeconds();
      var secSinceMidnight = hours + minutes + seconds;
      return secSinceMidnight;
   },
   generate_datas_instant: function(date, ville) {
      var date = date;
      var ville = ville;
      var i = module.exports.getMsSinceMidnight();
      console.log("secondes depuis minuit : " + i);
      var indice_actuel = TT.Ask(ville, date, i);
      var datas_return = {
         "indice_actuel": indice_actuel,
         "ville": ville,
         "date": date
      };
      return datas_return;
   },
   generate_datas_today: function(date, ville) {
      var date = date;
      var ville = ville;
      var totalsecondes = module.exports.getMsSinceMidnight();
      var datas_return = {
         "ville": ville,
         "date": date,
         "datas": []
      };
      for (var i = 0; i < totalsecondes; i++) {
         var valeur = TT.Ask(ville, date, i);
         datas_return.datas.push({
            "indice": valeur
         });
      }
      return datas_return;
   },
   generate_datas_day: function(date, ville) {
      var date = date;
      var ville = ville;
      var indices_open_close = TT.GetOpenPricesDate(ville, date);
      var datas_return = {
         "ville": ville,
         "date": date,
         "indice_ouverture": indices_open_close[1],
         "indice_fermeture": indices_open_close[2],
         "datas": []
      };
      for (var i = 0; i < 86400; i++) {
         var valeur = TT.Ask(ville, date, i);
         datas_return.datas.push({
            "indice": valeur
         });
      }
      var MyDate = new Date();
      var MyDateString;
      MyDate.setDate(MyDate.getDate());
      MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'+ ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'+ MyDate.getFullYear();

      if( date >= MyDateString) {
        var datas_return = {
           "ville": ville,
           "date": date,
           "datas": []
        };
      }
      return datas_return;
   },
   generate_datas_year: function(ville) {
      var indices_open_close = TT.GetOpenPricesTop(ville);
      console.log(indices_open_close);
      var datas_return = {
         "ville": ville,
         "datas": indices_open_close
      };
      return datas_return;
   }
}
