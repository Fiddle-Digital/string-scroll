export class StringTracker {
  private callCount: number = 0;
  private intervalId: any;
  private displayElement: any;

  constructor(public trackedFunction: (...args: any[]) => any = (...args: any[]) => {}) {}

  public start() {
    this.createDisplayElement();
    this.startTracking();
  }

  private createDisplayElement() {
    this.displayElement = document.createElement('div');
    this.displayElement.style.position = 'fixed';
    this.displayElement.style.bottom = '10px';
    this.displayElement.style.right = '10px';
    this.displayElement.style.backgroundColor = 'black';
    this.displayElement.style.color = 'green';
    this.displayElement.style.padding = '5px 10px';
    this.displayElement.style.fontFamily = 'Arial, sans-serif';
    this.displayElement.style.fontSize = '16px';
    this.displayElement.style.zIndex = '1000';
    this.displayElement.setAttribute('data-fps', '0'); // Додаємо data-attribute
    document.body.appendChild(this.displayElement);

    // Додаємо стилі для псевдоелемента ::after
    const style = document.createElement('style');
    style.innerHTML = `
      [data-fps]::after {
        content: attr(data-fps) ' FPS';
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: black;
        color: green;
        padding: 5px 10px;
        font-family: Arial, sans-serif;
        font-size: 16px;
        z-index: 1000;
      }
    `;
    document.head.appendChild(style);
  }

  private startTracking() {
    this.intervalId = setInterval(() => {
      this.displayElement.setAttribute('data-fps', `${this.callCount}`); // Оновлюємо значення data-attribute
      this.callCount = 0;
    }, 1000);
  }

  public getTrackedFunction() {
    return (...args: any[]) => {
      this.callCount++;
      return this.trackedFunction(...args);
    };
  }

  public stopTracking() {
    clearInterval(this.intervalId);
    document.body.removeChild(this.displayElement);
  }

  public resize(){
    
  }
}
