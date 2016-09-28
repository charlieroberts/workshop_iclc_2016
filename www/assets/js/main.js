"use strict";
// initialize Hoodie
var hoodie  = new Hoodie();

//var json = {
//  add() {},
//  update() {},
//  remove() {}
//}
//hoodie.store.on('json:add', json.add);
//hoodie.store.on('json:update', json.update);
//hoodie.store.on('json:remove', json.remove);

// peged for peg editor, ed for mini-language editor
hoodie.store.findAll('jsonpeg').then(function(files) {
  console.log('got peg files:', files )

  files.forEach(console.log);
  let fileList = $('#files')
  files.forEach( v => {
    let li = $('<li>')
      .text( v.name )
      .on('click', ()=> {
        peged.setValue( v.code )
      })

    fileList.append( li )
  })
});


var lastName = null, lastId

$('#saveButton').on('click', function(e) {
  var name = $('#saveName').val()
  if( name !== lastName ) {
    hoodie.store.add( 'jsonpeg', { name, code:peged.getValue() } )
      .done( obj => {
        console.log( 'hoodie saved:', obj )
        lastId = obj.id
      })
  }else{
    hoodie.store.update( 'jsonpeg', lastId, { name, code:peged.getValue() })
  }
})

hoodie.store.findAll('jsonlang').then(function(files) {
  console.log('got lang files:', files )

  files.forEach(console.log);
  let fileList = $('#files2')
  files.forEach( v => {
    let li = $('<li>')
      .text( v.name )
      .on('click', ()=> {
        ed.setValue( v.code )
      })

    fileList.append( li )
  })
});


var lastName = null, lastId

$('#save2Button').on('click', function(e) {
  var name = $('#save2Name').val()
  console.log( 'save2 clicked, name:', name, lastName )
  if( name !== lastName ) {
    hoodie.store.add( 'jsonlang', { name, code:ed.getValue() } )
      .done( obj => {
        console.log( 'hoodie saved:', obj )
        lastId = obj.id
      })
  }else{
    hoodie.store.update( 'jsonlang', lastId, { name, code:ed.getValue() })
  }
})
