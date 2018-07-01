
class Rando {
    constructor(strville, strdate ) {
        this.seed = 197;        // seed 
        this.a = 16807;      // a
        this.m = 2147483647; // m
        this.InitSeed(strville, strdate);
    }


    Rand() {
        this.seed = (this.seed * this.a) % this.m;
        return this.seed;
    }

    Randf0compris1compris() {
        var mm = this.m * 1.0;
        var t = this.Rand() / (mm - 1);
        if (t < 0) t = 0;
        if (t > 1) t = 1;
        return t;
    }

    random_normal()  /* normal distribution, centered on 0, std dev 1 */ {
        var v1 = (this.Rand() * 1.0 + 1) / this.m;  // > 0 et <= 1
        var v2 = (this.Rand() * 1.0 + 1) / this.m;  // > 0 et <= 1
        var k = -2 * Math.log(v1);
        if (k < 0) // securité
            k = -k;
        return (Math.sqrt(k) * Math.cos(2 * Math.PI * v2));
    }
 

    NextMaxCompris(max) // <= max
    {
        var res = this.Rand() % (max + 1);
        return res;
    }

    // exponentielle discrète
    Exp(t) {
        var exp = new Int32Array(40);
        exp[0] = 197;
        for (var i = 1; i < 35; i++)
            exp[i] = (exp[i - 1] * exp[i - 1]) % this.m;

        var res = 197;
        for (var i = 0; i < 32; i++)
            if ( (t & (1 << i)) != 0 )
                res = (res * exp[i]) % this.m;

        return res;
    }

    // transforme une string en int
    hash(str) {
        var bytes = []; // char codes
        for (var i = 0; i < str.length ; ++i) {
            var code = str.charCodeAt(i);
            bytes = bytes.concat([code]);
        }

        var hash = 5381;

        for (var i = 0; i < str.length; ++i)
            hash = ((hash << 5) + hash) + bytes[i]; /* hash * 33 + c */

        return hash;
    }

    InitSeed(strville, strdate) {
        var t1 = this.hash(strdate);
        var t2 = this.hash(strville);
        var res = (t1 + t2) % this.m;
        this.seed = this.Exp(res);
    }
}

module.exports = Rando;