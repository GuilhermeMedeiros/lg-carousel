import "./carousel.css"

'use strict';

export default class Carousel {
    constructor(config){
        this.el = document.createElement('div');
        this.el.classList.add('carousel');

        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('carousel__wrapper');

        this.navigation = document.createElement('div');
        this.navigation.classList.add('carousel__navigation');
        this.navigation.innerHTML = `
            <button class="carousel__navigationLeft" data-js="prev">‹</button>
            <button class="carousel__navigationRight" data-js="next">›</button>
        `

        this.config = config;
        this.state = {index: 0}

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
        this.el.appendChild(this.navigation);
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

    moveNext(e){
        this.state.index = Math.min(this.config.items.length - this.config.perRow, this.state.index+1);;
        this.transform();
        this.highlight(e);
    }

    movePrev(e){
        this.state.index = Math.max(0, this.state.index-1);
        this.transform();
        this.highlight(e);
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

    transform(){
        this.wrapper.style.transform = `translate3d(-${100/this.config.perRow*this.state.index}%, 0, 0)`;
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