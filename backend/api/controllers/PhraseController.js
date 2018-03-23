/**
 * PhraseController
 *
 * @description :: Server-side logic for managing phrases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getAllPhrases: function(req, res){
        var jsonResponse = [];

        Phrase.find({}).exec(function(err, phrases){
            phrases.forEach((phrase) => {
                jsonResponse.push(phrase.text);
            });
            res.send({phrases: jsonResponse});
        });
    }
,
    newPhrase: function(req, res){
        var texto = req.param('phrase');
        Phrase.create({
            text: texto
        }).exec(function(err, phrase){
          if(!err) res.ok();
      });
    }
}

