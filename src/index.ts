

let d: any = null
let w: any = null
const ds = "data-string-"
const tS = "top"
const bS = "bottom"

const LERP_NAME = '--scroll-lerp'
const PROGRESS_NAME = '--string-progress'
const PARALLAX_PROGRESS_DATA = 'data-string-parallax-progress'

function attr(e: any, n: string, d: any = null) {
  return e.getAttribute(n) == null ? d : e.getAttribute(n)
}


function getCoords(e: any) {
  let br = gbcl(d.body),
    er = gbcl(e),
    o = er.top - br.top;
  return { top: o };
}
function gbcl(e: any) {
  return e.getBoundingClientRect()
}
function isSafari(): boolean {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') > -1) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}
function isTouchDevice() {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0));
}

class ParseManager {
  public parseOffset(e: any, o: any = "0,0", wH: any, baseRem: number = 16) {
    let ofs = o.split(',');
    if (ofs.length === 1) {
      ofs = [ofs[0], ofs[0]];
    }
    let oV = ofs.map((os: any) => {
      os = os.trim();
      if (os.startsWith('calc')) {
        return this.parseCalc(os, e, wH, baseRem);
      } else {
        return this.parseSingle(os, e, wH, baseRem);
      }
    });
    return oV;
  }

  public parseSingle(v: string, element: any, wH: any, baseRem: number): number {
    let isNegative = v.startsWith('-');
    if (isNegative) {
      v = v.slice(1);
    }
    let pV;
    if (v === 'selfHeight') {
      pV = element.offsetHeight;
    } else if (v.endsWith('px')) {
      pV = parseFloat(v);
    } else if (v.endsWith('%')) {
      pV = parseFloat(v) * wH / 100;
    } else if (v.endsWith('rem')) {
      pV = parseFloat(v) * baseRem;
    }
    return isNegative ? -pV : pV;
  }

  public parseCalc(c: string, element: any, wH: any, baseRem: number): number {
    c = c.slice(5, -1);
    let ps = c.split(/([-+])/).filter(Boolean);
    return ps.reduce((t, p, i) => {
      if (p === '-' || p === '+') {
        return t;
      } else {
        let value = this.parseSingle(p.trim(), element, wH, baseRem);
        if (ps[i - 1] === '-') {
          return t - value;
        } else {
          return t + value;
        }
      }
    }, 0);
  }

  public parseOrigin(o: string) {
    if (o == null || o == "") {
      o = "center center"
    }
    const p = o.split(' ');
    const x = this.parseOrig(p[0]);
    const y = this.parseOrig(p[1] || p[0]);
    return `${x} ${y}`;
  }

  public parseOrig(part: string) {
    part = part.trim();
    if (part.startsWith('random')) {
      const o = part.slice(7, -1).split(',').map(s => s.trim());
      const c = Math.floor(Math.random() * o.length);
      return o[c];
    } else {
      return part;
    }
  }
}

class StringScrollData {
  t: number = 0
  c: number = 0
  d: number = 0

  bS: number = 0
  cF: number = 1

}

interface iStringScroll {
  sC: number
  sA: number
  sD: number
  isProg: boolean
  v: number
  name: string
  onAnimationFrame(): void
  onWheel(e: any): void
  onScroll(e: any): void
  setSpeedAccelerate(speed: number): void
  setSpeedDecelerate(speed: number): void
  updateScrollParams(): void
}

class StringScrollDefault implements iStringScroll {
  public data: StringScrollData = new StringScrollData()

  public sA: number = 0.13
  public sD: number = 0.04
  public isProg: boolean = false
  public v = 0;
  public name: string = "mobile"
  public sC: number = 0.0
  private vT: number = 0

  private animateC: number = 0

  public updateScrollParams() {

  }

  public setSpeedAccelerate(speed: number) {
    this.sA = speed
  }
  public setSpeedDecelerate(speed: number) {
    this.sD = speed
  }

  public onAnimationFrame() {
    this.vT = d.documentElement.scrollTop - this.animateC
    this.animateC = d.documentElement.scrollTop

    this.v = this.vT
  }
  public onWheel(e: any) {
  }
  public onScroll(e: any) {


    this.data.c = d.documentElement.scrollTop
    this.data.t = d.documentElement.scrollTop
    this.data.d = 0



  }
}

class StringScrollSmooth implements iStringScroll {
  public data: StringScrollData = new StringScrollData()
  public sA: number = 0.13
  public sD: number = 0.04
  public isProg: boolean = false
  public v = 0;
  public name: string = "desktop"

  public sC: number = 0.0

  constructor() {
    this.updateScrollParams()
  }

  public updateScrollParams() {
    this.sC = this.sA * (1 - this.sD)
  }

  public setSpeedAccelerate(speed: number) {
    this.sA = speed
    this.updateScrollParams()
  }
  public setSpeedDecelerate(speed: number) {
    this.sD = speed
    this.updateScrollParams()
  }

  public onAnimationFrame() {
    this.v = (this.data.t - this.data.c) * this.sC;
    if (this.v > 0.1 || this.v < -0.1) {
      this.data.c += this.v;
      this.isProg = true
    } else {
      this.v = 0
      this.isProg = false
    }
    window.scrollTo(0, this.data.c);
  }

  public onWheel(e: any) {
    e.preventDefault()
    this.data.d = e.deltaY
    this.data.t += this.data.d
    this.data.t = Math.min(Math.max(this.data.t, 0), this.data.bS)
  }

  public onScroll(e: any) {
    e.preventDefault()
    if (this.isProg == false) {
      this.data.c = d.documentElement.scrollTop
      this.data.t = d.documentElement.scrollTop
      this.data.d = 0
      window.scrollTo(0, this.data.t)
    }
  }
}

class StringScrollDisable implements iStringScroll {
  public data: StringScrollData = new StringScrollData()
  public sA: number = 0.13
  public sD: number = 0.04
  public isProg: boolean = false
  public v = 0;
  public name: string = "disable"
  public sC: number = 0.0
  public updateScrollParams() {

  }

  public setSpeedAccelerate(speed: number) {
    this.sA = speed
  }
  public setSpeedDecelerate(speed: number) {
    this.sD = speed
  }

  public onAnimationFrame() {
  }

  public onWheel(e: any) {
  }

  public onScroll(e: any) {
    e.preventDefault()

  }
}


export default class StringScroll {
  private static i: StringScroll;
  private wH: number
  private wW: number

  private actProgE: Array<any> = new Array<any>()
  private actParallE: Array<any> = new Array<any>()

  private progE: any
  private lerpE: any
  private scrollE: any
  private parallE: any
  private conE: any

  private progIndx: number = 0
  private parallIndx: number = 0

  private progO: Map<string, any> = new Map<string, any>()
  private actProgO: Map<string, any> = new Map<string, any>()
  private actProgOA: Array<any> = new Array<any>()

  private scrollO: Array<any> = new Array<any>()

  private parallO: Map<string, any> = new Map<string, any>()
  private actParallO: Map<string, any> = new Map<string, any>()
  private actParallOA: Array<any> = new Array<any>()



  private onScrollEvents: Array<any> = new Array<any>()

  private intersectionEvent: Map<string, any> = new Map<string, any>()
  private prEvent: Map<string, any> = new Map<string, any>()
  private prScrollEvent: Map<string, any> = new Map<string, any>()
  private lrpEvent: Map<string, any> = new Map<string, any>()

  private obs: IntersectionObserver[] = [];

  private sf: number = 1
  private f: number = 1

  private disablecalc: boolean = false
  private overflowCurrent = 0

  private wheelBindFunc
  private scrollBindFunc

  private isProgress: boolean = true
  private isParallax: boolean = true

  private sEn: StringScrollSmooth
  private sEnDesktop: StringScrollSmooth = new StringScrollSmooth()
  private sEnMobile: StringScrollDefault = new StringScrollDefault()
  private sEnDisable: StringScrollDisable = new StringScrollDisable()
  private parser: ParseManager

  private mMode: "smooth" | "disable" | "default" = "default"
  private dMode: "smooth" | "disable" | "default" = "smooth"

  public IsAutoupdateScrollPosition: boolean = true

  private constructor() {

    d = document
    w = window

    this.wH = w.innerHeight
    this.wW = w.innerWidth


    this.parser = new ParseManager()

    this.sEn = this.sEnDesktop
    this.initElementsFromDOM()
    w.addEventListener('resize', () => { this.onResize() })




    this.wheelBindFunc = this.onWheel.bind(this)
    this.scrollBindFunc = this.onScroll.bind(this)

    document.body.addEventListener('wheel', this.wheelBindFunc, { passive: false })
    w.addEventListener('scroll', this.scrollBindFunc, { passive: false })

    this.onAnimationFrame()

    this.initObserver()
    this.onResize()

    this.onMutationObserver()

    document.documentElement.classList.add("string-scroll")
    document.documentElement.classList.add("string-smoothy")

    const style = document.createElement('style');
    style.id = 'hide-scrollbar-style';
    style.textContent = `
        .-without-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .-without-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }
    `;
    document.head.appendChild(style);


  }

  public static getInstance(): StringScroll {
    if (!StringScroll.i) {
      StringScroll.i = new StringScroll();
    }
    return StringScroll.i;
  }


  private createStringProgressObject(el: any) {
    let r = gbcl(el)
    let oA = attr(el, `${ds}offset`)
    let o = oA == null ? [0, 0] : this.parser.parseOffset(el, oA, this.wH)
    let rH = r.height

    let data = {
      el: el,
      top: getCoords(el).top,
      bottom: getCoords(el).top + rH,
      height: rH,
      oTop: o[0],
      oBottom: o[1],
      start: attr(el, `${ds}start`, 1),
      end: attr(el, `${ds}end`, 1),
      id: attr(el, `${ds}id`),
      disabled: attr(el, `${ds}disabled`) == null ? false : true,
      oldValue: 0,
      divisor: this.wH - o[0] - o[1] - rH,
      divisorFull: rH + this.wH,
      startPos: 1,
      endPos: 1,
      differencePos: 1,
      connectEvent: new Array<any>()
    }


    let startPosition = attr(el, `${ds}start`) || "top bottom";
    let endPosition = attr(el, `${ds}end`) || "bottom top";

    let [sElPos, sScrPos] = startPosition.split(" ");
    let [eElPos, eScrPos] = endPosition.split(" ");

    let p1 = data.top - data.oTop,
      p2 = p1 - this.wH,
      p3 = data.top + data.height + data.oBottom,
      p4 = p3 - this.wH

    if (sElPos == tS && sScrPos == tS) {
      data.startPos = p1
    } else if (sElPos == tS && sScrPos == bS) {
      data.startPos = p2
    } else if (sElPos == bS && sScrPos == tS) {
      data.startPos = p3
    } else if (sElPos == bS && sScrPos == bS) {
      data.startPos = p4
    }


    if (eElPos == tS && eScrPos == tS) {
      data.endPos = p1
    } else if (eElPos == tS && eScrPos == bS) {
      data.endPos = p2
    } else if (eElPos == bS && eScrPos == tS) {
      data.endPos = p3
    } else if (eElPos == bS && eScrPos == bS) {
      data.endPos = p4
    }

    data.differencePos = data.endPos - data.startPos

    return data
  }

  private createStringParallaxObject(el: any) {
    let r = gbcl(el)
    let oA = attr(el, `${ds}offset`)
    let o = oA == null ? [0, 0] : this.parser.parseOffset(el, oA, this.wH)
    let pF = attr(el, `${ds}parallax`)
    let rH = r.height
    let data = {
      el: el,
      top: getCoords(el).top,
      bottom: getCoords(el).top + rH,
      height: rH,
      oTop: o[0],
      oBottom: o[1],
      start: attr(el, `${ds}start`, 1),
      end: attr(el, `${ds}end`, 1),
      id: attr(el, `${ds}id`),
      disabled: attr(el, `${ds}disabled`) == null ? false : true,
      parallaxFactor: pF,
      progress: (attr(el, PARALLAX_PROGRESS_DATA) == null) ? 0 : Number.parseFloat(attr(el, PARALLAX_PROGRESS_DATA)),
      oldV: 0,
      oldValue: 0,
      divisor: this.wH - o[0] - o[1] - rH,
      divisorFull: rH + this.wH,
      startPos: 1,
      endPos: 1,
      isIntersection: false,
      connectEvent: new Array<any>()
    }
    data.startPos = data.top - this.wH
      + (data.start * (data.height + data.oTop) - ((1 - data.start) * data.oTop));
    data.endPos = data.top
      + (data.end * (data.height + data.oBottom) - ((1 - data.end) * data.oBottom));
    return data
  }

  private initElementsFromDOM() {

    this.scrollE = d.querySelectorAll('[data-string]')

    this.scrollO = Array.from(this.scrollE).map((el: any) => {
      let r = gbcl(el)
      let oA = attr(el, `${ds}offset`)
      let o = oA == null ? [0, 0] : this.parser.parseOffset(el, oA, this.wH)
      return {
        el: el,
        top: getCoords(el).top,
        height: r.height,
        oTop: o[0],
        oBottom: o[1],
        disabled: attr(el, `${ds}disabled`) == null ? false : true,
      };
    })



    this.progO.clear()
    this.progE = d.querySelectorAll(`[${ds}progress]`)
    Array.from(this.progE)
      .filter((el: any) => {
        return attr(el, `${ds}connect`) == null
      })
      .forEach((el: any) => {
        el.setAttribute(`${ds}id`, attr(el, `${ds}id`, `string-progress-${this.progIndx++}`))
        this.progO.set(attr(el, `${ds}id`), this.createStringProgressObject(el))
      });





    this.parallO.clear()
    this.parallE = d.querySelectorAll(`[${ds}parallax]`)
    Array.from(this.parallE)
      .filter((el: any) => {
        return attr(el, `${ds}connect`) == null
      })
      .forEach((el: any) => {
        el.setAttribute(`${ds}id`, attr(el, `${ds}id`, `string-parallax-${this.parallIndx++}`))
        this.parallO.set(attr(el, `${ds}id`), this.createStringParallaxObject(el))
      });



    this.conE = d.querySelectorAll('[data-string-connect]')
    Array.from(this.conE)
      .forEach((el: any) => {
        let conId = attr(el, `${ds}connect`)
        if (this.parallO.has(conId)) {
          this.parallO.get(conId).connectEvent.push((transform: number) => {
            el.style.transform = transform;
          })
        }
        if (this.progO.has(conId)) {
          this.progO.get(conId).connectEvent.push((progress: number) => {
            el.style.setProperty(attr(el, `${ds}key`, "--string-progress"), progress)
          })
        }
      })


    this.actProgOA = Array.from(this.actProgO).map(([name, value]) => (value))
    this.actParallOA = Array.from(this.actParallO).map(([name, value]) => (value))


    this.lerpE = d.querySelectorAll(`[${ds}lerp]`)

    this.calc()
  }

  public setScrollPosition(scroll: number) {
    this.sEn.data.c = scroll
    this.sEn.data.t = scroll
    window.scrollTo(0, this.sEn.data.c);
  }

  public scrollTo(scroll: number) {
    this.sEn.data.t = scroll
  }

  public setMobileMode(mode: "smooth" | "disable" | "default") {
    if (mode == "disable") {
      document.documentElement.classList.add(`-without-scrollbar`)
    } else {
      document.documentElement.classList.remove(`-without-scrollbar`)
    }
    this.mMode = mode
    this.enableScroll()
  }

  public setDesktopMode(mode: "smooth" | "disable" | "default") {
    if (mode == "disable") {
      document.documentElement.classList.add(`-without-scrollbar`)
    } else {
      document.documentElement.classList.remove(`-without-scrollbar`)
    }
    this.dMode = mode
    this.enableScroll()
  }


  public disableScroll() {
    this.sEn = this.sEnDisable
  }
  public enableScroll() {
    if (w.innerWidth < 1024 || isTouchDevice()) {
      this.setScrollMode(this.mMode)
    } else {
      this.setScrollMode(this.dMode)
    }
  }

  public setSpeedAccelerate(speed: number) {
    this.sEnDesktop.sA = speed
    this.sEnDisable.sA = speed
    this.sEnMobile.sA = speed
  }
  public setSpeedDecelerate(speed: number) {
    this.sEnDesktop.sD = speed
    this.sEnDisable.sD = speed
    this.sEnMobile.sD = speed
  }
  public setScrollFactor(factor: number) {
    this.f = factor
    if (isSafari()) {
      this.sEnDesktop.data.cF = this.f * this.sf
    } else {
      this.sEnDesktop.data.cF = this.f
    }
  }
  public setSafariFactor(safariFactor: number) {
    this.sf = safariFactor
    if (isSafari()) {
      this.sEnDesktop.data.cF = this.f * this.sf
    } else {
      this.sEnDesktop.data.cF = this.f
    }
  }
  public on(key: "scroll" | "progress" | "intersection" | "scroll-progress" | "lerp", event: any, id: string = "") {
    switch (key) {
      case "scroll":
        this.onScrollEvents.push(event)
        break;
      case "progress":
        if (this.prEvent.has(id) == false) {
          this.prEvent.set(id, [])
        }
        this.prEvent.get(id).push(event)
        break;
      case "lerp":
        if (this.lrpEvent.has(id) == false) {
          this.lrpEvent.set(id, [])
        }
        this.lrpEvent.get(id).push(event)
        break;
      case "intersection":
        if (this.intersectionEvent.has(id) == false) {
          this.intersectionEvent.set(id, [])
        }
        this.intersectionEvent.get(id).push(event)
        break;
      case "scroll-progress":
        if (this.prScrollEvent.has(id) == false) {
          this.prScrollEvent.set(id, [])
        }
        this.prScrollEvent.get(id).push(event)
        break;
    }
  }


  public setScrollMode(mode: "smooth" | "disable" | "default") {

    document.documentElement.classList.remove("-smooth")
    document.documentElement.classList.remove("-default")
    document.documentElement.classList.remove("-disable")

    switch (mode) {
      case "smooth":
        this.sEn = this.sEnDesktop
        this.isParallax = true
        document.documentElement.classList.add("-smooth")
        break;
      case "default":
        this.sEn = this.sEnMobile
        this.isParallax = false
        document.documentElement.classList.add("-default")
        break;
      case "disable":
        this.sEnDisable.v = this.sEn.v
        this.sEnDisable.data = this.sEn.data
        this.sEn = this.sEnDisable
        document.documentElement.classList.add("-disable")
        break;
    }
  }



  public enableById(id: string) {
    const d = (e: any) => {
      if (e.id == id) {
        e.disabled = true
        e.el.removeAttribute(`${ds}disabled`)
      }
    }
    this.progO.forEach(d)
    this.parallO.forEach(d)
    this.actProgO.forEach(d)
  }
  public disableById(id: string) {
    const d = (e: any) => {
      if (e.id == id) {
        e.disabled = true
        e.el.setAttribute(`${ds}disabled`, "")
      }
    }
    this.progO.forEach(d)
    this.parallO.forEach(d)
    this.actProgO.forEach(d)
  }


  public setProgressStatus(status: boolean) {
    this.isProgress = status
  }
  public setParallaxStatus(status: boolean) {
    this.isParallax = status
  }

  private onWheel(e: WheelEvent) {
    if (this.disablecalc) {
      e.preventDefault()
      return
    }
    this.sEn.onWheel(e)
  }

  public forceUpdateParallax() {
    setTimeout(() => {
      let b = d.body,
        h = d.documentElement
      let dHeight = Math.max(b.scrollHeight, b.offsetHeight,
        h.clientHeight, h.scrollHeight, h.offsetHeight)
      this.sEn.data.bS = dHeight - this.wH
      this.initElementsFromDOM()
      this.initObserver()
      this.calc()
    }, 300);
  }

  private onMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          let b = d.body,
            h = d.documentElement
          let dHeight = Math.max(b.scrollHeight, b.offsetHeight,
            h.clientHeight, h.scrollHeight, h.offsetHeight)
          this.sEn.data.bS = dHeight - this.wH
          this.initElementsFromDOM()
          this.initObserver()
          this.calc()
        }
      });
    });

    const config = {
      attributes: true,
      childList: true,
      subtree: true
    };

    observer.observe(document.body, config);


    window.addEventListener('hashchange', () => {
      let b = d.body,
        h = d.documentElement
      let dHeight = Math.max(b.scrollHeight, b.offsetHeight,
        h.clientHeight, h.scrollHeight, h.offsetHeight)
      this.sEn.data.bS = dHeight - this.wH
      this.initElementsFromDOM()
      this.initObserver()
      this.calc()
    });
  }

  private onScroll(e: Event) {
    this.sEn.onScroll(e)
    this.calc()
    this.onScrollEvents.forEach(scrollEvent => {
      scrollEvent(d.documentElement.scrollTop)
    });
  }

  private initObserver() {
    this.obs.forEach((o) => {
      o.disconnect();
    })
    this.obs = []

    let callback = (es: any) => {
      es.forEach((e: any) => {
        if (e.isIntersecting) {
          e.target.classList.add("-inview")
          this.emit(this.intersectionEvent, attr(e.target, `${ds}id`), true)
        } else {
          if (attr(e.target, `${ds}repeat`) != null) {
            e.target.classList.remove("-inview")
            this.emit(this.intersectionEvent, attr(e.target, `${ds}id`), false)
          }
        }
      })
    }

    this.scrollO.forEach((t: any) => {
      let options = {
        rootMargin: `${t.oTop}px 0px ${t.oBottom}px 0px`,
      }
      let ob = new IntersectionObserver(callback, options)
      ob.observe(t.el)
      this.obs.push(ob);
    });


    let callbackGl = (es: any) => {
      es.forEach((e: any) => {
        if (e.isIntersecting) {
          let id = attr(e.target, `${ds}id`)
          this.actProgO.set(id, this.progO.get(id))
          this.actProgOA = Array.from(this.actProgO).map(([name, value]) => (value))
        } else {
          let id = attr(e.target, `${ds}id`)
          this.actProgO.delete(id)
        }
      })
    }

    this.progO.forEach((t: any) => {
      let optionsProgress = {
        root: null,
        rootMargin: `${t.oTop * 1 + this.wH * 1.5}px 0px ${t.oBottom * 1 + this.wH * 1.5}px 0px`,
        threshold: 0.001,
      }
      let obGl = new IntersectionObserver(callbackGl, optionsProgress);
      obGl.observe(t.el);
      this.obs.push(obGl);
    });



    let callbackPrx = (es: any) => {
      es.forEach((e: any) => {
        let id = attr(e.target, `${ds}id`)
        if (e.isIntersecting) {
          if (this.parallO.get(id).el.getAttribute("data-string-parallax-screen") == null) {
            this.parallO.get(id).el.setAttribute("data-string-parallax-screen", this.sEn.data.c)
          }
          this.parallO.get(id).isIntersection = true
          this.parallO.get(id).progress += (this.sEn.data.c - this.parallO.get(id).el.getAttribute("data-string-parallax-screen"))
          this.actParallO.set(id, this.parallO.get(id))
          this.actParallOA = Array.from(this.actParallO).map(([name, value]) => (value))
        } else {
          this.actParallO.delete(id)
          this.actParallOA = Array.from(this.actParallO).map(([name, value]) => (value))
        }
      })
    }

    this.parallO.forEach((t: any) => {
      let optionsProgress = {
        root: null,
        rootMargin: `${t.oTop * 1 + 10}px 0px ${t.oBottom * 1 + 10}px 0px`,
        threshold: 0.001,
      }
      let obPrx = new IntersectionObserver(callbackPrx, optionsProgress);
      obPrx.observe(t.el);
      this.obs.push(obPrx);

    });



  }

  public overflowHidden() {
    document.documentElement.classList.add("string-overflow-hidden")
    this.disablecalc = true
    this.overflowCurrent = this.sEn.data.c
    const firstChild = document.getElementById('string-scroll-layout') as HTMLElement;
    if (firstChild) {
      firstChild.style.transform = `translateY(-${this.sEn.data.c}px)`
    }
  }

  public overflowAuto() {
    document.documentElement.classList.remove("string-overflow-hidden")
    const firstChild = document.getElementById('string-scroll-layout') as HTMLElement
    if (firstChild) {
      firstChild.style.transform = `translateY(0px)`
    }
    this.sEn.data.c = this.overflowCurrent
    this.sEn.data.t = this.overflowCurrent
    this.disablecalc = false
    setTimeout(() => {
      window.scrollTo(0, this.sEn.data.c);
    }, 10);
  }
  private teset: number = 0

  private onAnimationFrame() {
    let reqAnim = () => {
      this.sEn.onAnimationFrame()
      this.lerpE.forEach((e: any, i: number) => {
        this.lerpE[i].style.setProperty(LERP_NAME, Math.abs(this.sEn.v))
        if (this.hasEvent(this.lrpEvent, this.lerpE[i].id)) {
          this.emit(this.lrpEvent, this.lerpE[i].id, this.sEn.v)
        }
      });

      this.actParallOA.forEach((el: any) => {
        if (el.disabled) { return }
        // if (el.isIntersection) {
        //   el.progress += ((this.sEn.data.c - el.el.getAttribute(PARALLAX_PROGRESS_DATA)))
        //   el.isIntersection = false
        // }

        el.progress += this.sEn.v
        el.el.style.transform = `translateY(${el.progress * el.parallaxFactor}px)`
        el.el.setAttribute(PARALLAX_PROGRESS_DATA, el.progress)
        el.el.setAttribute("data-string-parallax-screen", this.sEn.data.c)
        el.connectEvent.forEach((event: any) => {
          event(`translateY(${el.progress * el.parallaxFactor}px)`)
        });
      })
      requestAnimationFrame(reqAnim);
    }
    requestAnimationFrame(reqAnim);
  }

  private calc() {
    if (this.disablecalc) {
      return
    }

    this.actProgOA.forEach((el: any) => {
      if (el.disabled) { return }
      let v = Math.min(1, Math.max(0, (this.sEn.data.c - el.startPos) / el.differencePos));
      el.el.style.setProperty(PROGRESS_NAME, v)
      if (el.oldValue != v) {
        el.connectEvent.forEach((event: any) => {
          event(v)
        });
        if (this.hasEvent(this.prEvent, el.id)) {
          this.emit(this.prEvent, el.id, v)
        }

        el.oldValue = v
      }
      if (this.hasEvent(this.prScrollEvent, el.id)) {
        this.emit(this.prScrollEvent, el.id, el.oTop - this.sEn.data.c + this.wH)
      }
    })

  }

  private hasEvent(list: any, id: string) {
    return list.has(id)
  }

  private emit(list: any, id: string, value: any) {
    if (list.has(id)) {
      list.get(id).forEach((event: any) => {
        event(value)
      });
    }
  }


  private initEl(el: any, isProgress: boolean = false) {
    let r = gbcl(el)
    if (isProgress) {
      el.style.setProperty(PROGRESS_NAME, 0);
      el.setAttribute("data-offset-top", getCoords(el).top)
      el.setAttribute("data-offset-height", r.height)
    }
    let org = attr(el, `${ds}origin`)
    if (org != null) {
      el.style.transformOrigin = this.parser.parseOrigin(org)
    }
  }

  public onResize() {
    this.progE.forEach((el: any) => {
      this.initEl(el, true)
    })
    this.scrollE.forEach((el: any) => {
      this.initEl(el)
    })
    this.initElementsFromDOM()
    if (w.innerWidth < 1024 || isTouchDevice()) {
      this.setScrollMode(this.mMode)
    }
    else {
      this.setScrollMode(this.dMode)
    }
    if (this.wW != w.innerWidth) {
      this.wW = w.innerWidth
      this.wH = w.innerHeight
    }
    let b = d.body,
      h = d.documentElement
    let dHeight = Math.max(b.scrollHeight, b.offsetHeight,
      h.clientHeight, h.scrollHeight, h.offsetHeight)
    this.sEn.data.bS = dHeight - this.wH
    this.initObserver()
    this.calc()

  }
}

