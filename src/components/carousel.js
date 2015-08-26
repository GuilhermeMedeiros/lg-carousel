import "./carousel.css"

export default class Carousel {
    constructor(config){
        this.el = document.createElement('div');
        this.wrapper = document.createElement('div');
        this.navigation = document.createElement('div');

        this.config = config;
        this.state = {index: 0}

        return this;
    }

    render() {
        let renderedListsHTML = '';
        let items = this.config.items;
        let perRow = this.config.perRow;
        let numRows = Math.ceil(items.length / perRow);

        // create navigation buttons
        this.navigation.innerHTML = `<button class="carousel__navigationLeft" data-js="prev">‹</button>
                                    <button class="carousel__navigationRight" data-js="next">›</button>`

        // create as many lists as necessary to hold {perRow} items. this allow fit of the items by using percentage
        for(let i = 0; i < numRows; i++) {
            let first = i * perRow
            let last = i * perRow + perRow

            renderedListsHTML += `<div class="carousel__list">
                                    ${items.slice(first, last).map((item) => this.renderItem(item)).join('')}
                                </div>`
        }

        // set the html to the main wrapper that handles positioning
        this.wrapper.innerHTML = renderedListsHTML;

        this.el.classList.add('carousel');
        this.wrapper.classList.add('carousel__wrapper');
        this.navigation.classList.add('carousel__navigation');

        this.el.appendChild(this.wrapper);
        this.el.appendChild(this.navigation);

        this.delegateEvents()
        this.transform()

        return this;
    }

    renderItem(item){
        return `<div class="carousel__item" style="width: ${100/this.config.perRow}%">
                    <img src="${item.img}" alt="${item.title}" />
                    <h3>${item.imdb} - ${item.title}</h3>
                </div>`
    }


    delegateEvents(){
        document.addEventListener('keydown', (e) => {
            if(e.which === 39) return this.moveNext();
            if(e.which === 37) return this.movePrev();
        })

        this.el.addEventListener('mousemove', (e) => {
            this.highlight(e);
        })

        this.el.addEventListener('click', (e) => {
            if(e.target.dataset.js === 'next') return this.moveNext(e);
            if(e.target.dataset.js === 'prev') return this.movePrev(e);
        })
    }

     moveNext(e){
        // do not pass the index limit, which is {total amount of items} - {items per row}
        this.state.index = Math.min(this.config.items.length - this.config.perRow, this.state.index+1);;
        this.transform();
        this.highlight(e);
    }

    movePrev(e){
        this.state.index = Math.max(0, this.state.index-1);
        this.transform();
        this.highlight(e);
    }

    transform(){
        // note: because each list has the same width of the carousel visible overflow,
        // we can easily extract a percentage by multiplying the current index with the size (in percentage) of each item
        this.wrapper.style.transform = `translate3d(-${100 / this.config.perRow * this.state.index}%, 0, 0)`;
    }

    highlight(e){
        if(this.state.index > 0 && e.x - this.el.offsetLeft < this.el.offsetWidth / 3) {
            this.navigation.classList.add('has-prev-highlighted');
        } else {
            this.navigation.classList.remove('has-prev-highlighted');
        }

        if(this.state.index < this.config.items.length - this.config.perRow && this.el.offsetWidth - e.x - this.el.offsetLeft < this.el.offsetWidth / 3) {
            this.navigation.classList.add('has-next-highlighted');
        } else {
            this.navigation.classList.remove('has-next-highlighted');
        }
    }
}