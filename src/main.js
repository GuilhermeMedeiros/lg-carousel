import 'normalize.css'
import './styles/global.css'
import Carousel from './components/carousel'

const $app = document.getElementById('app');

fetch('http://lg-devtest.herokuapp.com/data.json', {headers: {Authorization: 'Bearer u12A8f3Zg'}})
    .then(function(response){
        if(response.status === 403) throw new Error(response.statusText);
        return response.json();
    })
    .then(function(responseObj){
        return responseObj.data
            // get movies from both collections
            .reduce(function(assets, collection){
                return assets.concat(collection.assets);
            }, [])
            // filter action movies only
            .filter(function(movie){
                return movie.genre === 'Action';
            })
            // sort by imdb note
            .sort(function(movie1, movie2){
                return movie1.imdb < movie2.imdb;
            })
    })
    .then(function(movies){
        console.log(movies)
    })
    .catch(function(err){
        console.log(err)
        $app.innerHTML = `<div class="error-message">${err.message}</div>`;
    })