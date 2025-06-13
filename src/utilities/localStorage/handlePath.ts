const setPath = (path : string) :void => {
 localStorage.setItem("afterPath" , path)
}

const getPath = () : string  => {

  const path = localStorage.getItem("afterPath")
    if(!path) return "pokemons/1" 
  return path
}