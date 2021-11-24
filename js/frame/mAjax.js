

mAjax = {

    serverFile: 'Switch',

    startAjax: function ()

    {

        if (window.XMLHttpRequest)

        {// code for IE7+, Firefox, Chrome, Opera, Safari

            xmlhttp = new XMLHttpRequest();

        } else

        {// code for IE6, IE5

            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");//versiones

        }



        return xmlhttp;

    },

    //Send data with POST parameters
    sendAjaxPost: function (async, serverMethod, sendData, callBack, ontimeoutcall, timeout) {
        mAjax.sendAjax('post', async, serverMethod, sendData, callBack, ontimeoutcall, timeout);
    },

    //Send data with GET parameters
    sendAjaxGet: function (async, serverMethod, sendData, callBack, ontimeoutcall, timeout) {

        mAjax.sendAjax('get', async, serverMethod, sendData, callBack, ontimeoutcall, timeout);

    },

    // Send data with GET or POST parameters. Recommend use from sendAjaxPost or sendAjaxGet.
    sendAjax: function (method, async, serverMethod, sendData, callBack, ontimeoutcall, timeout)

    {

        var xmlObject = mAjax.startAjax();



        xmlObject.onreadystatechange = function () {



            var xhttp = arguments[0].target;

            if (xhttp.status >= 500 && xhttp.status <= 599) {

                if (callBack) {

                    callBack('false');

                }

            }

            if ((xhttp.readyState == 4) && (xhttp.status == 200)) {

                if (callBack) {

                    callBack(xhttp.responseText);

                }

            }

        };

        xmlObject.ontimeout = ontimeoutcall ? ontimeoutcall : function () {};





        if (sendData) {

            var sendDataString = 'data='+JSON.stringify(sendData);

        }



        if (method == "GET")

        {

           
                var url = mAjax.serverFile + '?' + sendDataString + '&action=' + serverMethod;

            xmlObject.open("GET", url, async);

            async ? xmlObject.timeout = (timeout ? timeout : 10000) : false;

            xmlObject.send("");

        } else {

            var url = mAjax.serverFile + '?action=' + serverMethod;
            xmlObject.open("POST", url, async);

            async ? xmlObject.timeout = (timeout ? timeout : 10000) : false;

            xmlObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

            xmlObject.overrideMimeType('text/html; charset=UTF-8');



            //  xmlhttp.setRequestHeader("Content-type","application/json");





            xmlObject.send(sendDataString);



        }



        //return xmlhttp.response;



    }

}
