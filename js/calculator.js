$(document).ready(function () {  // DO IT WITH ECMASCRIPT 6 !! :(

    var data = [];

    $(".num").click(function () {
        if (data.length <= 1) {
            if(dotLimitCheck(0, this)){numberLimitCheck(0, this);}

        } else {
            if(dotLimitCheck(2, this)){numberLimitCheck(2, this);}
        }
    });

    $("#delete").click(function () { //Delete numbers
        if (data.length <= 1) {
            return deleter(0);
        }
        deleter(2);
    });

    $("#restart").click(function () {  //Delete all numbers
        data = [];
        setScreen(0);
        setEq();
    });

    $(".operator").click(function () {  // operator set
        if (data.length >= 1 && this.innerHTML !== "√") {
            if (data[0] === " ") {
                data[0] = data[2];
                data[1] = this.innerHTML;
                data.pop();
                setScreen(data[0]);
                return setEq()
            }
            data[1] = this.innerHTML;
            setEq();
        }
        else if (this.innerHTML == "√") {
            data[0] = " ";
            data[1] = "√";
            setEq();
            setScreen(0);
        }
    });

    $("#result").click(function () { //TODO ability to start with negative values
        if (data.length == 2) {  // Math doing where data[0] is the first value, data[2] is the second
            data.pop();         //and data[1] is the operator.
            setEq();
            setScreen(data[0]);
            return data;
        }
        else if (data.length == 3) {
            var res = 0;
            switch (data[1]) {
                case "+":
                    res = Number(data[0]) + (Number(data[2]) || 0);
                    break;
                case "-":
                    res = Number(data[0]) - Number(data[2]);
                    break;
                case "/":
                    res = Number(data[0]) / Number(data[2]);
                    break;
                case "x":
                    res = Number(data[0]) * Number(data[2]);
                    break;
                case "%":
                    res = Number(data[0]) % Number(data[2]);
                    break;
                case "√":
                    setScreen(Math.sqrt(data[2]).toFixed(2));
                    return data = [];
            }
            if (res.toString().length > 8) {    //limiting answer's length on screen
                res = res.toPrecision(8)
            }
            setScreen(res);
            data = [];
            return data[0] = res;
        }
    });

    function deleter(i) {  //number delete function
        var x = data[i].split('');
        x.pop();
        data[i] = x.join('');
        if (data[i].length === 0) {
            setEq();
            return setScreen(0);
        }
        setEq();
        setScreen(data[i]);
    }

    function numberLimitCheck(i, e) {    //limit numbers on screen
        if (data[i]) {
            if (data[i].length > 8) {
                return false;
            }
        }
        data[i] = (data[i] || '') + e.innerHTML;
        setScreen(data[i]);
        setEq();
    }

    function dotLimitCheck(i, e){
        if(e.innerHTML === "."){
            if((data[i].match(/[.]/g) || '').length === 1){
                return false;
            }
        }
        return true;
    }

    function setScreen(data) {  //print current value to screen
        $(".screen").html(data);
    }

    function setEq() {  //print current equation to screen
        console.log(data);
        $(".equation").html((data[0] || 0) + " " + (data[1] || '') + " " + (data[2] || ''));
    }
});