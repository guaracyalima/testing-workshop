describe('Somatorio', function(){

  var Soma = require('../src/Soma');

  console.log("Soma", Soma);

  it('Deve somar um numero', function(){
    expect(Soma(1,1)).toEqual(2);
  });

})
