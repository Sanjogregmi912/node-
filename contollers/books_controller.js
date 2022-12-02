// const books = require('../data/books')
const Book =  require('../models/Book')

const getAllBooks = (req,res,next)=>{
    Book.find().then((books)=>{
        res.json(books)
    }).catch(
        (err) =>{
            next(err)
        }
    )
}

const postnewbooks = (req,res,next)=>{
//     let new_book = {
//         'id' : books[books.length-1].id + 1,
//         'title' : req.body.title,
//         'author' : req.body.author
//     }
//     console.log(new_book)
//     books.push(new_book)
//     res.status(201).send(books)
// }
let abook = {
    "title" : req.body.title,
    "author" : req.body.author
}


Book.create(abook).then((book)=>{
    res.status(201).json(book)
})
.catch((err)=>{
    next(err)
}
)
}

const putbook = (req,res)=>{
    res.status(501).send({"reply":"Put request not supported"})
    }

const  deletebooks = (req,res) =>{
    Book.deleteMany()
    .then((reply)=>{
        res.json({"reply":"book deleted"})
    })
    .catch((err)=>{
        console.log(err)
    })
    
}

const getonebook = (req,res,next)=>{   
    // the_books = books.find((item)=> item.id ==req.params.id) 
    // if(!the_books) res.status(404).json({"reply" : " book not found"})
    // res.json(the_books)
    Book.findById(req.params.id)
    .then((book)=>{
        res.json(book)
    })
    .catch(next)
}

const postonebook  = (req,res)=>{
    the_books = books.find((item)=> item.id ==req.params.id) 
    if(!the_books) {
       
        let new_book = {
            'id' : books[books.length-1].id + 1,
            'title' : req.body.title,
            'author' : req.body.author
        }
        console.log(new_book)
        books.push(new_book)
        res.status(201).json(books)

    }else{
    res.status(504).json({"reply": "Cannot post new book in the current id"})
    }

   

    
}
const deletebook = (req,res) =>{
    let newlist = books.filter(function (items){
        return items.id != req.params.id
    })
    res.json(newlist)



}

const putonebook = (req,res) =>{
  let updatedbooks = books.map((item)=>{
    if(item.id == req.params.id){
        item.title = req.body.title
        item.author = req.body.author
    }
    return item
   })
   res.json(updatedbooks)

}

module.exports = {getAllBooks,postnewbooks,putbook,deletebooks,getonebook,postonebook,deletebook,putonebook}