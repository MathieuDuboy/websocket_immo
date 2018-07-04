class _LILData
{

    constructor()
    {
        this.CITIES = [];  // liste des villes
        this.DATES  = [];  // liste des dates
        this.OPEN = [];    // liste des prix d'ouverture de journée
        this.CLOSE = [];   // liste des prix de fermeture de journée
        this.Load();
    }

    isEmpty(str) { return (!str || 0 === str.length); }

    Load()
    {
        var fs = require("fs");
        var data = fs.readFileSync('calc/data2.csv', "utf8");
        data = data.replace(/\r/g, '');
        data = data.split("\n");


        this.CITIES = this.decode(data[0]);
        this.CITIES.shift(); // remove date

        var lastprice = this.decode(data[1]).map(Number);
        this.OPEN.push(lastprice);

        for (var i = 2; i < data.length; i++)
        {
            var newlast = [];
            var varia = this.decode(data[i]);

            if (varia.length == this.CITIES.length + 1)
                if (varia[0].length > 0)
            {
                this.DATES.push(varia[0]);
                varia.shift();
                varia = varia.map(Number);

                for (var k = 0; k < this.CITIES.length; k++) {
                    var p = lastprice[k] * (1.0 + varia[k]);
                    p = Number(p.toFixed(3));
                    newlast.push(p);
                }
                lastprice = newlast;
                this.OPEN.push(lastprice);
                this.CLOSE.push(lastprice);
            }

        }
        this.OPEN.pop();

    }



    decode(line)
    {
        var tt = line.split(',');
        var rep = [];
        for (var i = 0; i < tt.length; i++)
        {
            var k = tt[i].trim();
            if (! this.isEmpty(k) )
                rep.push(k);
        }
        return rep;
    }

}

module.exports.LIL = new _LILData();
