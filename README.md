# Instrucciones
Primero hay que instalar los paquetes de los dos proyectos:

    cd backend 
    sudo npm install
    cd ..
    cd frontend
    sudo npm install

(Si os sale algún error, borrad el package.json de cada uno de los dos proyectos y volved a ejecutar los comandos)

---
Para ejecutar el servidor (está puesto por defecto en el puerto 1337 y debe estar así para no tocar el cliente):

    cd backend
    sails lift

Para ejecutar el cliente:

    cd frontend
    npm start
---

Tenemos un cliente sencillo y queremos conectarnos a un servidor con la dirección: http://localhost:1337 para hacer las peticiones:
 
    GET /phrases | Cuyo response es:

    {
        phrases: [
            "Hola soy Jenkins",
            "Yehey vaca"
        ]
    }
---
    GET /phrase | Cuya request es:

    {
        phrase: "Soy una nueva frase"
    }

Básicamente queremos que el servidor nos permita hacerle peticiones HTTP para añadir frases a la base de datos y también para obtenerlas todas.

Primero pensamos un UML sencillo como:

    phrase(_id, text)

y debemos crear el respectivo modelo para definirlo y a su  vez un controlador para definir las peticiones.
Todo esto dentro de la carpeta **backend** que contiene el proyecto sails.

Ej. de modelo:

    /* In phraseController.js */
    module.exports = {
        attributes: {
            text: {
                type: "string"
            }
        }
    };

Para crear los .js rápidamente podemos usar el CLI de sails:

    sails generate api phrase

Como vemos hemos obtenido dos archivos, uno en la carpeta de **model** donde pondremos nuestro modelo y otro en la carpeta de **controller** donde definiremos nuestra api.

## controller/phrase.js

    module.exports = {
        getAllPhrases: function(req, res){
            var jsonResponse = [];

            Phrase.find({}).exec(function(err, phrases){
                phrases.forEach((phrase) => jsonResponse.push(phrase.text));

                res.send({phrases: jsonResponse});
            });
        }

        newPhrase: function(req, res){
            var text = req.query.text;

            Phrase.create({phrase: text}).exec(function(err, phrase){
                if(!err) res.ok();
            });
        }
    }
---
Ahora que ya tenemos definidos el modelo y el controlador, falta definir las rutas!:

## config/routes.js

    module.exports.routes = {
        "GET /phrases": {
            controller: "PhraseController",
            action: "getAllPhrases"
        },

        "POST /phrase": {
            controller: "PhraseController",
            action: "newPhrase"
        }
    }

Finalmente ejecutamos ejecutamos el servidor con: 

    sails lift

y probamos en el cliente si las llamadas nos dan los resultados esperados.