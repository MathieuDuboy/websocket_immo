const LILcalculateur = require('./LILcal.js');

class LILapi
{
    constructor()
    {
        this.MyData = require('./LILdata.js');
        this.CITIES = this.MyData.LIL.CITIES;
        this.DATES  =  this.MyData.LIL.DATES;
        this.OPEN = this.MyData.LIL.OPEN;
        this.CLOSE = this.MyData.LIL.CLOSE;
        this.DayData = [];
        // un calculateur par ville, cela permet de conserver
        // le tampon de données de chaque ville
        for (var i = 0; i < this.CITIES.length ; i++)
            this.DayData.push(new LILcalculateur() );
    }

    Ask(city, date, SecSinceMidnight)
    {
        var icity = this.CITIES.indexOf(city);
        if (icity == -1) return "CITY NOT FOUND";

        var idate = this.DATES.indexOf(date);
        if (idate == -1) return "DATE INVALID";

        if ((SecSinceMidnight < 0) || (SecSinceMidnight >= 86400))
            return "SECOND error";

        var val = this.DayData[icity].Ask(city, date, SecSinceMidnight);

        return Number(val.toFixed(3));

    }

    GetOpenPrices(city)
    {
        var icity = this.CITIES.indexOf(city);
        if (icity == -1) return "CITY NOT FOUND";

        var values = [];
        for (var i = 0; i < this.DATES.length ; i++)
            values.push( [ this.DATES[i], this.OPEN[i][icity] , this.CLOSE[i][icity] ] );

        return values;
    }

    GetOpenPricesTop(city)
    {
        var icity = this.CITIES.indexOf(city);
        if (icity == -1) return "CITY NOT FOUND";

        var MyDate = new Date();
        var MyDateString;
        MyDate.setDate(MyDate.getDate());
        MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'+ ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'+ MyDate.getFullYear();

        var values = [];
        for (var i = 0; i < this.DATES.length-1 ; i++) {
          if (this.DATES[i] == MyDateString) { break; }
          var date = this.DATES[i];
          var date_FR = date.split("/");
          var date_EN = date_FR[2]+'/'+date_FR[1]+'/'+date_FR[0];
          values.push({
              "date" : this.DATES[i],
              "indice_ouverture" : this.OPEN[i][icity],
              "indice_fermeture" : this.CLOSE[i][icity],
              "timestamp" : Date.parse(date_EN)/1000
          });
        }

        return values;
    }

    GetOpenPricesDate(city, date)
    {
        var icity = this.CITIES.indexOf(city);
        if (icity == -1) return "CITY NOT FOUND";

        var idate = this.DATES.indexOf(date);
        if (idate == -1) return "DATE INVALID";

        var values = [];
        for (var i = 0; i < this.DATES.length ; i++) {
          if(this.DATES[i] == date) {
            var ladate = this.DATES[i];
            values.push( [ this.DATES[i], this.OPEN[i][icity] , this.CLOSE[i][icity] ] );
          }
        }
        return values;
    }

}


module.exports = LILapi;
