export class StringScrollbar {
    private scrollbar: any;
    private thumb: any;
    private scrollTimeout: any;

    private isScrollbarWillShow = true

    constructor() {
        this.createScrollbar();
        this.updateThumb();
        this.addCustomStyles()
    }

    private addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            ::-webkit-scrollbar {
                width: 0px;
            }
            body {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
        `;
        document.head.appendChild(style);
    }

    private createScrollbar() {
        this.scrollbar = document.createElement('div');
        this.scrollbar.classList.add('scrollbar')
        this.thumb = document.createElement('div');
        this.thumb.classList.add('thumb')

        this.scrollbar.appendChild(this.thumb);
        document.body.appendChild(this.scrollbar);

        this.addDragFunctionality();
        this.addScrollListener();
    }

    public resize(){
        const contentHeight = document.documentElement.scrollHeight;
        const visibleHeight = window.innerHeight;
        const thumbHeight = visibleHeight / contentHeight * visibleHeight;
        this.thumb.style.setProperty('--height', thumbHeight + 'px');

        if (contentHeight <= visibleHeight) {
            this.scrollbar.classList.add('-hide')
        } else {
            this.scrollbar.classList.remove('-hide')
        }
    }

    private updateThumb() {
        const contentHeight = document.documentElement.scrollHeight;
        const visibleHeight = window.innerHeight;
        this.thumb.style.setProperty('--position', `${(document.documentElement.scrollTop / contentHeight * visibleHeight) + 'px'}`)
        //this.thumb.style.transform = `translateY(${(document.documentElement.scrollTop / contentHeight * visibleHeight) + 'px'})`;
    }

    private addDragFunctionality() {
        let isDragging = false;
        let startY: number;
        let startScrollTop: number;

        this.thumb.addEventListener('mousedown', (e: MouseEvent) => {
            isDragging = true;
            startY = e.clientY;
            startScrollTop = document.documentElement.scrollTop;
            document.body.style.userSelect = 'none';
            this.scrollbar.classList.add('-touch')
        });

        document.addEventListener('mousemove', (e: MouseEvent) => {
            if (!isDragging) return;
            const deltaY = e.clientY - startY;
            const newScrollPosition = startScrollTop + deltaY / window.innerHeight * document.documentElement.scrollHeight;
            document.documentElement.scrollTop = newScrollPosition;
            this.updateThumb();
            
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = '';
            this.hideScrollbar()
            this.scrollbar.classList.remove('-touch')
        });
    }

    private addScrollListener() {
        document.addEventListener('scroll', () => {
            this.updateThumb();
            this.showScrollbar();
            this.hideScrollbar()
        });
    }

    private showScrollbar() {
        this.scrollbar.classList.add('-scroll')
    }

    private hideScrollbar() {
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = setTimeout(() => {
            this.scrollbar.classList.remove('-scroll')
        }, 1000);
    }
}