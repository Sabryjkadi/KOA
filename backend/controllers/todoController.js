const Note = require('../models/schema');


module.exports = {
  //# create a note
  async create (ctx) {
      const newNote = await Note.create(ctx.request.body);
      ctx.body = newNote;
  },  

  //#get the list of notes
  async fetch(ctx) {
      ctx.body = await Note.find({});

  },  
  //#delete a note
  async delete (ctx) {

    ctx.body = await Note.find({});
    var data = ctx.request.url; 
    var parts = data.split('/');
    var last = parts[3]
    last.toString();
  await Note.findByIdAndDelete(last)
  },


  async remove (ctx) {
      const deleteData = ctx.request.body.description;
      ctx.body = deleteData
      await Note.deleteOne( { "description" : deleteData} );

  },



  //#update a note
   async put (ctx){
    const updateData = ctx.request.body.description;
    var data = ctx.request.url
    
    // parsing process
    var parts = data.split('/');
    var id = parts[3]
    id.toString();
    
    
  await Note.findByIdAndUpdate({_id: id },
  { description: updateData }
  
);
ctx.body = "OK"

  }

}