export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.Img} alt={movie.Title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>Cat: </span>
        <span>{movie.Cat.Name}</span>
      </div>
      <div>
        <span>Color/Breed: </span>
        <span>{movie.Cat.ColorBreed}</span>
      </div>
      <div>
        <span>Cat Bio: </span> 
        <span>{movie.Cat.Bio}</span> 
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.Genre.Description}</span>
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.Year}</span>
      </div>
      <div>
        <span>Synopsis: </span>
        <span>{movie.Synopsis}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
