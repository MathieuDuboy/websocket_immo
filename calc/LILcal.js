const Rando = require('./LILRando.js');


class LILcalculateur
{
    constructor()
    {
        this.Data = new Float32Array(100000);
        this.Buf = new Float32Array(100000);
        this.Gaussian = new Float32Array(1000);
        this.CurrentDate = '0';
        this.MyData = require('./LILdata.js');
        this.CITIES = this.MyData.LIL.CITIES;
        this.DATES = this.MyData.LIL.DATES;
        this.OPEN = this.MyData.LIL.OPEN;
        this.CLOSE = this.MyData.LIL.CLOSE;
       
        this.PUISS = 20;
    }

    ResetInit() { for (var i = 0; i < 100000 ; i++) this.Data[i] = 0; }
 

    // ON fait en sorte T[deb]=T[fin] = 0
    RemoveBF(T, size)
    {
	    var deb = T[0];
	    for (var i = 0 ; i < size ; i++)
		    T[i] -= T[0];

	    var fin = T[size - 1];
	
	    for (var i = 1 ; i < size ; i++)
		    T[i] -= (fin * i) / (size-1);
    }


    BruitGaussien(Hmax)
    {
        for (var i = 0; i < 675; i++)
            this.Gaussian[i] = 0;

	    for (var i = 1; i < 675; i++)
            this.Gaussian[i] = this.Gaussian[i - 1] + this.RRR.NextMaxCompris(Hmax) - Hmax/2;

        this.RemoveBF(this.Gaussian, 675);
    }

    // 100 et 20 

    BruitGeom(bondmax, hmax)
    {
	 
        var p = 0;
        var ancienBut = 0;
	    while (p < 86400 - 1 )
	    {
            var But = this.RRR.random_normal() * hmax;
            var nextp = p + 2 + Math.round(this.RRR.NextMaxCompris(bondmax ) );
		    if (nextp >= 86400)
		    {
			    But = 0;
			    nextp = 86400 - 1;
		    }

		    for (var i = p; i <= nextp; i++)
                this.Data[i] += ancienBut + ((But - ancienBut) * (i - p)) / (nextp - p);
            p = nextp+1;
            ancienBut = But;
	    }
    }

     // 250 et 100
    BruitRupture(bondmax, Hmax)
    {

	    var p = 0;
	    while (p < 86400 - 1)
	    {
            var nextp = p + 2 + Math.round(this.RRR.NextMaxCompris(bondmax )  );
            var But = this.RRR.NextMaxCompris(Hmax) - Hmax/2;

		    if (nextp >= 86400)
		    { 
			    nextp = 86400 - 1;
			    But = 0;
		    }
 	

		    for (var i = p ; i <= nextp ; i++)
                this.Data[i] += (But * (i - p)) / (nextp - p);
            p = nextp + Math.round(this.RRR.NextMaxCompris(bondmax));;
	    }
 
    }
 
 /*

    SigmaNormalize()
    {

	    var tot = 0;
	    for (var i = 0; i < 86400 ; i++)
            tot += this.Data[i] * this.Data[i];

	    var sig = Math.sqrt( tot / 86400);
	    for (var i = 0; i < 86400; i++)
            this.Data[i] /= sig;
      
    }
    */
    Journee()
    {
        this.ResetInit();

        var L = 5000;
        var H = 200;

        this.BruitGeom(L, H);
        this.BruitGeom(L/3, H/3 );

        this.BruitRupture(L/2, H );
        

	    // bruit gaussien
	
	   
	    for (var i = 0; i < 128; i++)
	    {
            this.BruitGaussien(9);
		    for (var x = 0; x < 675 ; x++)
                this.Data[675 * i + x] += this.Gaussian[x];
	    }
	 
        //this.SigmaNormalize();
    }
     
    ComputeDayPrices(city, date)
    {
        this.RRR = new Rando(city, date);
        this.Journee();

        // création du cours de la journée
        var icity = this.CITIES.indexOf(city);
        var idate = this.DATES.indexOf(date);
        var Pdeb = this.OPEN[idate][icity];
        var Pfin = this.CLOSE[idate][icity];
        var range = (Pfin - Pdeb) / 86400.0;
        for (var i = 0; i < 86400; i++)
        {
            this.Data[i] *= 0.5;
            this.Data[i] += Pdeb + range * i;
        }
    }

    Ask(city, date, SecSinceMidnight)
    {
        // on a demandé une data qui ne correspond pas au jour stocké dans le buffer

        if (this.CurrentDate === date) { } else {
            this.ComputeDayPrices(city, date);
            this.CurrentDate = date;
        }

        return this.Data[SecSinceMidnight];
    }

}

module.exports = LILcalculateur;