

let d: any = null
let w: any = null
const ds = "data-string-"
const tS = "top"
const bS = "bottom"

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
  sA: number
  sD: number
  isProg: boolean
  v: number
  name: string
  onAnimationFrame(): void
  onWheel(e: any): void
  onScroll(e: any): void
}

class StringScrollDefault implements iStringScroll {
  public data: StringScrollData = new StringScrollData()

  public sA: number = 0.13
  public sD: number = 0.04
  public isProg: boolean = false
  public v = 0;
  public name: string = "mobile"

  private vT: number = 0

  public onAnimationFrame() {

    if (this.vT > 0) {
      this.v = this.vT / 6
      this.vT -= this.v
      if (this.vT < 10) {
        this.vT = 0
      }
    }


  }
  public onWheel(e: any) {
    this.vT += Math.abs(e.deltaY)
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

  public onAnimationFrame() {
    this.v = (this.data.t - this.data.c) * this.sA * (1 - this.sD);

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
    this.data.t = Math.max(this.data.t, 0)
    this.data.t = Math.min(this.data.t, this.data.bS)
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

  public onAnimationFrame() {
  }

  public onWheel(e: any) {
  }

  public onScroll(e: any) {
    e.preventDefault()

  }
}


export class StringScroll {
  private static i: StringScroll;
  private wH: number
  private wW: number

  private actProgE: Array<any> = new Array<any>()
  private actParallE: Array<any> = new Array<any>()

  private progE: any
  private lerpE: any
  private scrollE: any
  private parallE: any

  private progO: Array<any> = new Array<any>()
  private actProgO: Array<any> = new Array<any>()
  private scrollO: Array<any> = new Array<any>()
  private actParallO: Array<any> = new Array<any>()
  private parallO: Array<any> = new Array<any>()



  private onScrollEvents: Array<any> = new Array<any>()

  private intersectionEvent: Map<string, any> = new Map<string, any>()
  private prEvent: Map<string, any> = new Map<string, any>()
  private prScrollEvent: Map<string, any> = new Map<string, any>()

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
    this.sendElements()
    this.initObserver()
    this.onResize()

    this.onMutationObserver()

    document.documentElement.classList.add("string-scroll")
    document.documentElement.classList.add("string-smoothy")


  }

  public static getInstance(): StringScroll {
    if (!StringScroll.i) {
      StringScroll.i = new StringScroll();
    }
    return StringScroll.i;
  }

  private initElementsFromDOM() {
    this.scrollE = d.querySelectorAll('[data-string]')
    this.progE = d.querySelectorAll(`[${ds}progress]`)
    this.parallE = d.querySelectorAll(`[${ds}parallax]`)
    this.lerpE = d.querySelectorAll(`[${ds}lerp]`)
  }

  public setScrollPosition(scroll: number) {
    this.sEn.data.c = scroll
    this.sEn.data.t = scroll
    window.scrollTo(0, this.sEn.data.c);
  }

  public setMobileMode(mode: "smooth" | "disable" | "default") {
    this.mMode = mode
    this.enableScroll()
  }

  public setDesktopMode(mode: "smooth" | "disable" | "default") {
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
  public on(key: "scroll" | "progress" | "intersection" | "scroll-progress", event: any, id: string = "") {
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
    switch (mode) {
      case "smooth":
        this.sEn = this.sEnDesktop
        break;
      case "default":
        this.sEn = this.sEnMobile
        break;
      case "disable":
        this.sEn = this.sEnDisable
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
          this.sendElements()
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
        root: null,
        rootMargin: `${t.oTop}px 0px ${t.oBottom}px 0px`,
        threshold: 0.01,
      }
      let ob = new IntersectionObserver(callback, options)
      ob.observe(t.el)
      this.obs.push(ob);
    });


    let callbackGl = (es: any) => {
      es.forEach((e: any) => {
        if (e.isIntersecting) {
          if (!this.actProgE.includes(e.target)) {
            this.actProgE.push(e.target);
            this.sendElements()
          }
        } else {
          let index = this.actProgE.indexOf(e.target);
          if (index !== -1) {
            this.actProgE.splice(index, 1);
            this.sendElements()
          }
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
        if (e.isIntersecting) {
          if (!this.actParallE.includes(e.target)) {
            this.actParallE.push(e.target)
            this.sendElements()
          }
        } else {
          let index = this.actParallE.indexOf(e.target)
          if (index !== -1) {
            this.actParallE.splice(index, 1)
            this.sendElements()
          }
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
    this.disablecalc = true
    this.overflowCurrent = this.sEn.data.c
    const firstChild = document.getElementById('string-scroll-layout') as HTMLElement;
    if (firstChild) {
      firstChild.style.transform = `translateY(-${this.sEn.data.c}px)`
    }
  }

  public overflowAuto() {
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

  private onAnimationFrame() {
    let reqAnim = () => {
      this.sEn.onAnimationFrame()
      this.lerpE.forEach((e: any, i: number) => {
        this.lerpE[i].style.setProperty('--scroll-lerp', Math.abs(this.sEn.v))
      });
      if (this.isParallax) {
        this.actParallO.forEach((el: any) => {
          if (el.disabled) { return }
          el.progress += this.sEn.v
          el.el.style.transform = `translateY(${el.progress * el.parallaxFactor}px)`
          el.el.setAttribute("data-string-parallax-progress", el.progress)
        })
      }
      requestAnimationFrame(reqAnim);
    }
    requestAnimationFrame(reqAnim);
  }

  private calc() {
    if (this.disablecalc) {
      return
    }

    if (this.isProgress) {
      this.actProgO.forEach((el: any) => {
        if (el.disabled) { return }
        let v = Math.min(1, Math.max(0, (this.sEn.data.c - el.startPos) / (el.endPos - el.startPos)));
        el.el.style.setProperty('--string-progress', v)
        if (el.oldValue != v) {
          el.connectEvent.forEach((event: any) => {
            event(v)
          });
          this.emit(this.prEvent, el.id, v)
          el.oldValue = v
        }
        this.emit(this.prScrollEvent, el.id, el.oTop - this.sEn.data.c + this.wH)

      })
    }

  }

  private emit(list: any, id: string, value: any) {

    if (list.has(id)) {
      list.get(id).forEach((event: any) => {
        event(value)
      });
    }
  }


  private sendElements() {
    this.progO = Array.from(this.progE).map((el: any) => {
      let r = gbcl(el)
      let oA = attr(el, `${ds}offset`)
      let o = oA == null ? [0, 0] : this.parser.parseOffset(el, oA, this.wH)
      return {
        el: el,
        oTop: o[0],
        oBottom: o[1],
      };
    })


    this.actProgO = Array.from(this.actProgE).filter((el: any) => {
      return attr(el, `${ds}connect`) == null
    }).map((el: any) => {
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
        connectEvent: new Array<any>()
      }


      let startPosition = attr(el, `${ds}start`) || "top bottom";
      let endPosition = attr(el, `${ds}end`) || "bottom top";

      let [sElPos, sScrPos] = startPosition.split(" ");
      let [eElPos, eScrPos] = endPosition.split(" ");

      let p1 = data.top - data.oTop,
        p2 = data.top - data.oTop - this.wH,
        p3 = data.top + data.height + data.oBottom,
        p4 = data.top + data.height + data.oBottom - this.wH

      if (sElPos == tS && sScrPos == tS) {
        data.startPos = p1
      }
      if (sElPos == tS && sScrPos == bS) {
        data.startPos = p2
      }
      if (sElPos == bS && sScrPos == tS) {
        data.startPos = p3
      }
      if (sElPos == bS && sScrPos == bS) {
        data.startPos = p4
      }


      if (eElPos == tS && eScrPos == tS) {
        data.endPos = p1
      }
      if (eElPos == tS && eScrPos == bS) {
        data.endPos = p2
      }
      if (eElPos == bS && eScrPos == tS) {
        data.endPos = p3
      }
      if (eElPos == bS && eScrPos == bS) {
        data.endPos = p4
      }

      return data

    })


    Array.from(this.actProgE).forEach((el: any) => {
      if (attr(el, `${ds}connect`) != null) {
        let find = this.actProgO.find((elFind: any) => {
          return elFind.id == attr(el, `${ds}connect`)
        })
        if (find != null) {
          find.connectEvent.push((progress: number) => {
            el.style.setProperty('--string-progress', progress)
          })
        }
      }
    })


    this.parallO = Array.from(this.parallE).map((el: any) => {
      let oA = attr(el, `${ds}offset`)
      let o = oA == null ? [0, 0] : this.parser.parseOffset(el, oA, this.wH)
      return {
        el: el,
        oTop: o[0],
        oBottom: o[1],
      };
    })

    this.actParallO = Array.from(this.actParallE).filter((el: any) => {
      return attr(el, `${ds}connect`) == null
    }).map((el: any) => {
      if (attr(el, `${ds}connect`) == null) {

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
          progress: attr(el, "data-string-parallax-progress") == null ? 0 : Number.parseFloat(attr(el, "data-string-parallax-progress")),
          oldV: 0,
          oldValue: 0,
          divisor: this.wH - o[0] - o[1] - rH,
          divisorFull: rH + this.wH,
          startPos: 1,
          endPos: 1
        }
        data.startPos = data.top - this.wH
          + (data.start * (data.height + data.oTop) - ((1 - data.start) * data.oTop));
        data.endPos = data.top
          + (data.end * (data.height + data.oBottom) - ((1 - data.end) * data.oBottom));

        return data
      }
    })

    Array.from(this.actParallE).forEach((el: any) => {
      if (attr(el, `${ds}connect`) != null) {

        let cEl = this.actProgO.find((elFind: any) => {
          return elFind.id == attr(el, `${ds}connect`)
        })
        let pF = attr(el, `${ds}parallax`)
        if (cEl != null) {
          cEl.connectEvent.push((progress: number) => {
            el.style.transform = `translateY(${progress * pF * this.wH}px)`;
          })
        }
      }
    })


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




  }

  private initEl(el: any, isProgress: boolean = false) {
    let r = gbcl(el)
    if (isProgress) {
      el.style.setProperty('--string-progress', 0);
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
    this.sendElements()
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

    //this.sEn.onScroll()
    this.calc()

  }
}

