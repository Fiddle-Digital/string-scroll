export class EventManager{
  private events: Map<string, Array<Function>> = new Map<string, Array<Function>>()
  on(id: string, event: Function){
    if ( this.events.has(id) == false) {   
      this.events.set(id, [])
    }
    this.events.get(id)?.push(event)
  }
  public has(id: string) {
    return this.events.has(id)
  }
  public emit(id: string, value: any) {
    if (this.events.has(id)) {
      this.events.get(id)?.forEach((event: any) => {
        event(value)
      });
    }
  }
  public off(id: string, event: Function) {
    let ea = this.events.get(id)
    if (ea!=null) {
      this.events.set(id, ea.filter((h: any) => h !== event))
    }
  }
}