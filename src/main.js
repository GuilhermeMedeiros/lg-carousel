import './main.css'
import Carousel from './components/carousel'

const $app = document.getElementById('app');

// get data from api
fetch('http://lg-devtest.herokuapp.com/data.json', {headers: {Authorization: 'Bearer u12A8f3Zg'}})
    // convert response to json
    .then(function(response){
        if(response.status === 403) throw new Error(response.statusText);
        return response.json();
    })
    // filter and sort movies from collections
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
    // add carousel to the page
    .then(function(movies){
        let carousel = new Carousel({
            width: $app.offsetWidth,
            items: movies,
            perRow: 3
        });

        $app.appendChild(carousel.render().el)
    })

    // if api is not available, show a simple error message
    .catch(function(err){
        $app.innerHTML = `<div class="error-message">${err.message}</div>`;
    })