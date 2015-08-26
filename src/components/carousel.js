import "./carousel.css"

'use strict';

export default class Carousel {
    constructor(config){
        this.el = document.createElement('div');
        this.el.classList.add('carousel');

        this.wrapper = document.createElement('div')
        this.wrapper.classList.add('carousel__wrapper');

        this.config = config;
        this.state = {index: 0}

        console.log(this.state)
        return this;
    }

    render() {
        let renderedListsHTML = '';
        let items = this.config.items;
        let perRow = this.config.perRow;
        let numRows = Math.ceil(items.length / perRow);

        for(let i = 0; i < numRows; i++) {
            let first = i * perRow
            let last = i * perRow + perRow

            renderedListsHTML += `<div class="carousel__list">
                        ${items.slice(first, last).map((item) => this.renderItem(item)).join('')}
                    </div>`
        }

        this.wrapper.innerHTML = renderedListsHTML;
        this.el.appendChild(this.wrapper);
        this.delegateEvents(this.state)
        this.transform(this.state)

        return this;
    }

    renderItem(item){
        return `<div class="carousel__item" style="width: ${100/this.config.perRow}%">
                    <img src="${item.img}" alt="${item.title}" />
                    <h3>${item.imdb} - ${item.title}</h3>
                </div>`
    }

    moveNext(){
        this.state.index = Math.min(this.config.items.length - this.config.perRow, this.state.index+1);;
        this.transform();
    }

    movePrev(){
        this.state.index = Math.max(0, this.state.index-1);
        this.transform();
    }

    delegateEvents(){
        document.addEventListener('keydown', (e) => {
            if(e.which === 39) return this.moveNext();
            if(e.which === 37) return this.movePrev();
        })
    }

    transform(){
        this.wrapper.style.transform = `translate3d(-${100/this.config.perRow*this.state.index}%, 0, 0)`;
    }
}