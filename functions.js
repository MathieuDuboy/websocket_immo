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
   getTimestamp: function(date_EN, secondes_depuis_minuit) {
      var unixtime = Date.parse(date_EN)/1000;
      return unixtime+secondes_depuis_minuit;
   },
   generate_datas_instant: function(ville) {

      var MyDate = new Date();
      var MyDateString;
      MyDate.setDate(MyDate.getDate());
      MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'+ ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'+ MyDate.getFullYear();
      var date = MyDateString;
      var date_FR = date.split("/");
      var date_EN = date_FR[2]+'/'+date_FR[1]+'/'+date_FR[0];
      var ville = ville;
      var i = module.exports.getMsSinceMidnight();
      console.log("secondes depuis minuit : " + i);
      var indice_actuel = TT.Ask(ville, date, i);
      var datas_return = {
         "v": indice_actuel,
         "ville": ville,
         "t" : module.exports.getTimestamp(date_EN, i)
      };
      return datas_return;
   },
   generate_datas_today: function(ville) {

     var MyDate = new Date();
     var MyDateString;
     MyDate.setDate(MyDate.getDate());
     MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'+ ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'+ MyDate.getFullYear();

      var date = MyDateString;
      var ville = ville;
      var totalsecondes = module.exports.getMsSinceMidnight();
      var date_FR = date.split("/");
      var date_EN = date_FR[2]+'/'+date_FR[1]+'/'+date_FR[0];

      var datas_return = {
         "ville": ville,
         "data": []
      };
      for (var i = 0; i < totalsecondes; i++) {
         var valeur = TT.Ask(ville, date, i);
         datas_return.data.push({
            "v": valeur,
            "t" : module.exports.getTimestamp(date_EN, i)
         });
      }
      return datas_return;
   },
   generate_datas_day: function(date, ville) {
      var date = date;
      var date_FR = date.split("/");
      var date_EN = date_FR[2]+'/'+date_FR[1]+'/'+date_FR[0];
      var ville = ville;
      var indices_open_close = TT.GetOpenPricesDate(ville, date);
      var datas_return = {
         "ville": ville,
         "o": indices_open_close[1],
         "c": indices_open_close[2],
         "data": []
      };
      for (var i = 0; i < 86400; i++) {
         var valeur = TT.Ask(ville, date, i);
         datas_return.data.push({
            "v": valeur,
            "t" : module.exports.getTimestamp(date_EN, i)
         });
      }
      var MyDate = new Date();
      var MyDateString;
      MyDate.setDate(MyDate.getDate());
      MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'+ ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'+ MyDate.getFullYear();
      var date_FR = date.split("/");
      var date_EN = date_FR[2]+'/'+date_FR[1]+'/'+date_FR[0];
      if(new Date(date_EN).getTime() >= new Date().getTime() || date == MyDateString) {
        var datas_return = {
           "ville": ville,
           "data": []
        };
      }
      return datas_return;
   },
   generate_last24: function(ville) {
     var MyDate = new Date();
     var MyDateString;
     MyDate.setDate(MyDate.getDate());
     MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'+ ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'+ MyDate.getFullYear();
     var date = MyDateString;

     var date_FR = date.split("/");
     var date_EN = date_FR[2]+'/'+date_FR[1]+'/'+date_FR[0];
     var d = new Date(date_EN);
     var currentDate = new Date(d.setDate(d.getDate()-1));
     var twoDigitMonth=((currentDate.getMonth()+1)>=10)? (currentDate.getMonth()+1) : '0' + (currentDate.getMonth()+1);
     var twoDigitDate=((currentDate.getDate())>=10)? (currentDate.getDate()) : '0' + (currentDate.getDate());
     var createdDateTo = twoDigitDate + "/" + twoDigitMonth + "/" + currentDate.getFullYear();
     var date1_EN = currentDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate;
     var ville = ville;
     var totalsecondes = module.exports.getMsSinceMidnight();
     var getSecondsToMidnight = 86400 - totalsecondes;
     var debut = 86400 - getSecondsToMidnight;
     var pipo = getSecondsToMidnight+totalsecondes;
     var datas_return = {
        "ville": ville,
        "data": []
     };
     var a = 0;
     for (var i = parseInt(debut); i < 86400; i++) {
        var valeur = TT.Ask(ville, createdDateTo, i);
        datas_return.data.push({
           "v": valeur,
           "t" : module.exports.getTimestamp(date1_EN, i)
        });
        a++;
     }
     for (var i = 0; i < totalsecondes; i++) {
        var valeur = TT.Ask(ville, date, i);
        datas_return.data.push({
           "v": valeur,
           "t" : module.exports.getTimestamp(date_EN, i)
        });
        a++;
     }
     return datas_return;
   },
   generate_datas_year: function(ville) {
      var indices_open_close = TT.GetOpenPricesTop(ville);
      console.log(indices_open_close);
      var datas_return = {
         "ville": ville,
         "data": indices_open_close,
      };
      return datas_return;
   }
}
