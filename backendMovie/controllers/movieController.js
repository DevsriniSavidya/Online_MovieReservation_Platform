import Movie from '../models/Movies.js'


export const addMovie = async (req,res) =>{

         const name = req.body.name;
         const description = req.body.description;
         const showTime = req.body.showTime;
         const theaters = req.body.theaters;
         const ticketPrice = req.body.ticketPrice;
         const filmType = req.body.filmType;
         const photo = req.body.photo;
         const banner = req.body.banner;

         const newMovie = new Movie({name,description,showTime,theaters,ticketPrice,filmType,photo,banner})

         try{

            await newMovie.save()
            return res.status(200).json("Movie Added");

         }catch (err){
            
            return res.status(500).json(err);

         }
}

export const displayMovie = async (req,res) => {

  Movie.find().then((data)=>{
     res.json(data);
     
  }).catch((err)=>{

     console.catch.log(err);
  })

}

export const updateMovie = async (req,res) =>{
  
    const mId = req.params.id;

     const {name,description,showTime,theaters,ticketPrice,filmType,photo}= req.body;
    
    const updateMovie = {mId,name,description,showTime,theaters,ticketPrice,filmType,photo} ;

    const update = await Movie.findByIdAndUpdate(mId, updateMovie)
      .then(() => {
      res.status(200).send({ status: "Movie is  Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with Updating Movie", error: err.message });
    });
}

export const deleteMovie = async (req,res) =>{

  let movieId = req.params.id;
  await Movie.findByIdAndDelete(movieId)
    .then(() => {
      res.status(200).send({ status: "Movie  deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with Delete Movie", error: err.message });
    });
}


export const getMovieDetail = async (req,res)=>{

   let movieId = req.params.id;    
   
   Movie.findById(movieId).then((data)=>{
       
      res.json(data);
     
   }).catch((err)=>{

     console.catch.log(err);  
   }) 

}