var d: any = null
var w: any = null
function parseOffset(offset: any, elementHeight: any) {
  offset = offset.trim()
  if (offset.endsWith('px')) {
    return parseFloat(offset)
  } else if (offset.endsWith('%')) {
    return parseFloat(offset) * elementHeight / 100
  } else {
    throw new Error(`Unknown format offset: ${offset}`)
  }
}
function getCoords(e: any) {
  var br = gbcl(d.body),
    er = gbcl(e),
    o = er.top - br.top;
  return { top: o };
}
function lerp(s: any, e: any, a: any) {
  return (1 - a) * s + a * e;
}
function damp(x: any, y: any, lambda: any, dt: any) {
  return lerp(x, y, 1 - Math.exp(-lambda * dt))
}
function gbcl(e: any) {
  return e.getBoundingClientRect()
}

class StringScroll {
  private static instance: StringScroll;
  respState: string = ""
  wHeight: number
  globalEls: any
  progressEls: any
  stickyEls: any
  lerpEls: any
  aGlobalEs: any
  stickyObj: Array<any> = new Array<any>()
  globalObj: Array<any> = new Array<any>()
  progressObj: Array<any> = new Array<any>()

  onScrollEvents: Array<any> = new Array<any>()

  stEvent: Map<string, any> = new Map<string, any>()
  glEvent: Map<string, any> = new Map<string, any>()
  prEvent: Map<string, any> = new Map<string, any>()
  f: number = 1
  s: number = 0.05
  t: number = 0
  c: number = 0
  d: number = 0
  requestId = null
  bottomScroll: number = 0
  isProg: boolean = false
  isProgTimeout: any = null

  private constructor() {

    d = document
    w = window

    this.wHeight = w.innerHeight;
    this.globalEls = d.querySelectorAll('[data-scroll-global-progress]');
    this.progressEls = d.querySelectorAll('[data-scroll-progress]');
    this.stickyEls = d.querySelectorAll('[data-scroll-sticky-progress]');
    this.lerpEls = d.querySelectorAll('[data-lerp]');
    this.aGlobalEs = []
    w.addEventListener('resize', () => { this.onResize() })
    w.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
    w.addEventListener('scroll', this.onScroll.bind(this), { passive: false });
    this.onAnimationFrame()
    this.onIntersectionObserver()
    this.onResize()

  }

  public static getInstance(): StringScroll {
    if (!StringScroll.instance) {
      StringScroll.instance = new StringScroll();
    }
    return StringScroll.instance;
  }

  public setSpeed(speed: number) {
    this.s = speed
  }
  public setScrollFactor(factor: number) {
    this.f = factor
  }
  public on(key: string, event: any) {
    switch (key) {
      case "scroll":
        this.onScrollEvents.push(event)
        break;
      default:
        break;
    }

  }

  private onWheel(e: WheelEvent) {
    e.preventDefault();
    this.d = e.deltaY * this.f
    this.t += this.d

    if (this.t < 0) {
      this.t = 0.00
    }
    if (this.t > this.bottomScroll) {
      this.t = this.bottomScroll
    }
  }

  private onScroll(e: Event) {
    e.preventDefault();
    if (this.respState == "d" && this.isProg == false) {
      this.c = d.documentElement.scrollTop
      this.t = d.documentElement.scrollTop
      this.d = 0
    }
    this.recalculate()
    this.onScrollEvents.forEach(scrollEvent => {
      scrollEvent(d.documentElement.scrollTop)
    });
  }

  private onIntersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.01,
    };
    let callback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("-inview")
          if (!this.aGlobalEs.includes(entry.target)) {
            this.aGlobalEs.push(entry.target);
            this.sendElements()
          }
        } else {
          if (entry.target.getAttribute('data-scroll-repeat') != null) {
            entry.target.classList.remove("-inview")
          }

          let index = this.aGlobalEs.indexOf(entry.target);
          if (index !== -1) {
            this.aGlobalEs.splice(index, 1);
            this.sendElements()
          }
        }
      });
    };
    let ob = new IntersectionObserver(callback, options);
    this.globalEls.forEach((target: any) => {
      ob.observe(target);
    });
  }

  private onAnimationFrame() {
    let reqAnim = () => {

      if (this.respState == "d") {
        let newC = damp(this.c, this.t, this.s, 1)
        let lerp = newC - this.c
        this.c = newC
        if (Math.abs(this.c - this.t) < 1) {
          this.c = this.t
        }
        if (lerp != 0) {
          this.isProg = true
          d.documentElement.scrollTop = d.body.scrollTop = this.c
          if (this.isProgTimeout != null) {
            clearTimeout(this.isProgTimeout)
          }
          this.isProgTimeout = setTimeout(() => {
            this.isProg = false
          }, 100);
          lerp = Math.abs(lerp)
          this.lerpEls.forEach((elemet: any, index: number) => {
            this.lerpEls[index].style.setProperty('--scroll-lerp', lerp)
          });
        }
      }
      this.recalculate()
      requestAnimationFrame(reqAnim);
    }
    requestAnimationFrame(reqAnim);
  }

  private recalculate() {
    this.stickyObj.forEach((el: any) => {
      let prntH = gbcl(el.parent).height
      let p = (this.c + (this.wHeight * this.c / prntH)) / prntH
      el.el.style.setProperty('--scroll-sticky-progress', p)
      this.eStic(el.id, p)
    })

    this.globalObj.forEach((el: any) => {
      let p = ((this.c + this.wHeight - el.top) / this.wHeight)
      el.el.style.setProperty('--scroll-global-progress', p);
      this.eGlob(el.id, p)
    })

    this.progressObj.forEach((el: any) => {
      let v = ((this.c - el.oBottom + this.wHeight - (el.top)) / (this.wHeight - el.oTop - el.oBottom))
      if (v > 1) {
        v = 1
      }
      if (v < 0) {
        v = 0
      }
      el.el.style.setProperty('--scroll-progress', v);
      this.eProg(el.id, el)
    })
  }




  public addStickyEvent(id: string, event: any) {
    this.stEvent.set(id, event)
  }
  private eStic(id: string, progress: number) {
    if (this.stEvent.has(id)) {
      this.stEvent.get(id)(progress)
    }
  }


  public addGlobalEvent(id: string, event: any) {
    this.glEvent.set(id, event)
  }
  private eGlob(id: string, progress: number) {
    if (this.glEvent.has(id)) {
      this.glEvent.get(id)(progress)
    }
  }


  public addProgressEvent(id: string, event: any) {
    this.prEvent.set(id, event)
  }
  private eProg(id: string, progress: number) {
    if (this.prEvent.has(id)) {
      this.prEvent.get(id)(progress)
    }
  }

  private sendElements() {
    this.stickyObj = Array.from(this.stickyEls).map((el: any) => {
      return {
        el: el,
        top: el.getAttribute("data-offset-top"),
        height: el.getAttribute("data-offset-height"),
        id: el.getAttribute("data-scroll-id"),
        parent: el.parentNode,
      };
    })

    this.globalObj = Array.from(this.aGlobalEs).map((el: any) => {
      return {
        el: el,
        top: el.getAttribute("data-offset-top"),
        height: el.getAttribute("data-offset-height"),
      };
    })

    this.progressObj = Array.from(this.progressEls).map((el: any) => {
      var r = gbcl(el);
      var oA = el.getAttribute('data-scroll-offset');
      var o = oA ? oA.split(',').map((o: any) => parseOffset(o, this.wHeight)) : [0, 0];

      return {
        el: el,
        top: getCoords(el).top,
        height: r.height,
        oTop: o[0],
        oBottom: o[1],
      };
    })
  }

  private initEl(el: any) {
    var r = gbcl(el)
    el.style.setProperty('--scroll-progress', 0);
    el.style.setProperty('--scroll-global-progress', 0);
    el.setAttribute("data-offset-top", getCoords(el).top)
    el.setAttribute("data-offset-height", r.height)

  }

  private onResize() {
    this.stickyEls.forEach((el: any) => {
      this.initEl(el)
    })
    this.globalEls.forEach((el: any) => {
      this.initEl(el)
    })
    this.sendElements()

    let b = d.body,
      h = d.documentElement;

    let dHeight = Math.max(b.scrollHeight, b.offsetHeight,
      h.clientHeight, h.scrollHeight, h.offsetHeight);
    this.wHeight = w.innerHeight;

    this.bottomScroll = dHeight - this.wHeight
    if (w.innerWidth > 1024 && this.respState != "d") {
      this.respState = "d"
    }
    if (w.innerWidth <= 1024 && this.respState != "m") {
      this.respState = "m"
    }
  }

}

export default StringScroll