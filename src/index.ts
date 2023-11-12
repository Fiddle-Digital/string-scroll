

var d: any = null
var w: any = null


function getCoords(e: any) {
  var br = gbcl(d.body),
    er = gbcl(e),
    o = er.top - br.top;
  return { top: o };
}
function gbcl(e: any) {
  return e.getBoundingClientRect()
}
function isSafari(): boolean {
  var ua = navigator.userAgent.toLowerCase();
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
  public parseOffset(element: any, offset: any = "0,0", windowHeight: any, baseRemValue: number = 16) {
    let offsets = offset.split(',');
    if (offsets.length === 1) {
      offsets = [offsets[0], offsets[0]];
    }
    let offsetsValue = offsets.map((offset: any) => {
      offset = offset.trim();
      if (offset.startsWith('calc')) {
        return this.parseCalculation(offset, element, windowHeight, baseRemValue);
      } else {
        return this.parseSingleValue(offset, element, windowHeight, baseRemValue);
      }
    });
    return offsetsValue;
  }

  public parseSingleValue(value: string, element: any, windowHeight: any, baseRemValue: number): number {
    let isNegative = value.startsWith('-');
    if (isNegative) {
      value = value.slice(1); // remove the negative sign
    }
    let parsedValue;
    if (value === 'selfHeight') {
      parsedValue = element.offsetHeight;
    } else if (value.endsWith('px')) {
      parsedValue = parseFloat(value);
    } else if (value.endsWith('%')) {
      parsedValue = parseFloat(value) * windowHeight / 100;
    } else if (value.endsWith('rem')) {
      parsedValue = parseFloat(value) * baseRemValue;
    } else {
      throw new Error(`Unknown format offset: ${value}`);
    }
    return isNegative ? -parsedValue : parsedValue;
  }

  public parseCalculation(calculation: string, element: any, windowHeight: any, baseRemValue: number): number {
    calculation = calculation.slice(5, -1); // remove "calc(" and ")"
    let parts = calculation.split(/([-+])/).filter(Boolean); // split by '-' or '+'
    return parts.reduce((total, part, index) => {
      if (part === '-' || part === '+') {
        return total; // ignore the operators for now
      } else {
        // remove 'px' from part to match the existing format
        let value = this.parseSingleValue(part.trim(), element, windowHeight, baseRemValue);
        if (parts[index - 1] === '-') {
          return total - value;
        } else {
          return total + value;
        }
      }
    }, 0);
  }

  public parseOrigin(originString: string) {
    if (originString == null || originString == "") {
      originString = "center center"
    }
    const parts = originString.split(' ');

    const x = this.parseOriginPart(parts[0]);
    const y = this.parseOriginPart(parts[1] || parts[0]);

    return `${x} ${y}`;
  }

  public parseOriginPart(part: string) {
    part = part.trim();
    if (part.startsWith('random')) {
      const options = part.slice(7, -1).split(',').map(s => s.trim());
      options.forEach(option => this.validateOrigin(option));
      const choice = Math.floor(Math.random() * options.length);
      return options[choice];
    } else {
      this.validateOrigin(part);
      return part;
    }
  }

  public validateOrigin(option: any) {
    const validOptions = ['top', 'center', 'bottom', 'left', 'right'];
    if (!validOptions.includes(option)) {
      throw new Error(`Invalid origin option: ${option}`);
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
  sAccelerate: number
  sDecelerate: number
  isProg: boolean
  velocity: number
  name: string

  onAnimationFrame(): void

  onWheel(e: any): void
  onScroll(e: any): void

  onResize(): void
}

class StringScrollDefault implements iStringScroll {
  public data: StringScrollData = new StringScrollData()

  public sAccelerate: number = 0.13
  public sDecelerate: number = 0.04
  public isProg: boolean = false
  public velocity = 0;
  public name: string = "mobile"

  private velocityTarget: number = 0

  public onAnimationFrame() {

    if (this.velocityTarget > 0) {
      this.velocity = this.velocityTarget / 6
      this.velocityTarget -= this.velocity
      if (this.velocityTarget < 10) {
        this.velocityTarget = 0
      }
    }


  }
  public onWheel(e: any) {
    //this.data.c += e.deltaY
    //this.data.t += e.deltaY
    this.velocityTarget += Math.abs(e.deltaY)
  }
  public onScroll(e: any) {
    this.data.c = d.documentElement.scrollTop
    this.data.t = d.documentElement.scrollTop
    this.data.d = 0

  }
  public onResize() {

  }
}

class StringScrollSmooth implements iStringScroll {
  public data: StringScrollData = new StringScrollData()
  public sAccelerate: number = 0.13
  public sDecelerate: number = 0.04
  public isProg: boolean = false
  public velocity = 0;
  public name: string = "desktop"

  public onAnimationFrame() {
    this.velocity = (this.data.t - this.data.c) * this.sAccelerate * (1 - this.sDecelerate);

    if (this.velocity > 0.1 || this.velocity < -0.1) {
      this.data.c += this.velocity;
      this.isProg = true

    } else {
      this.velocity = 0
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

  public onResize() {

  }
}

class StringScrollDisable implements iStringScroll {
  public data: StringScrollData = new StringScrollData()
  public sAccelerate: number = 0.13
  public sDecelerate: number = 0.04
  public isProg: boolean = false
  public velocity = 0;
  public name: string = "disable"

  public onAnimationFrame() {
  }

  public onWheel(e: any) {
  }

  public onScroll(e: any) {
    e.preventDefault()

  }

  public onResize() {

  }
}


class StringScroll {
  private static instance: StringScroll;
  private wHeight: number
  private wWidth: number

  private activeProgressEls: Array<any> = new Array<any>()
  private activeParallaxEls: Array<any> = new Array<any>()

  private progressEls: any
  private stickyEls: any
  private lerpEls: any
  private scrollEls: any
  private parralaxEls: any

  private stickyObj: Array<any> = new Array<any>()
  private progressObj: Array<any> = new Array<any>()
  private activeProgressObj: Array<any> = new Array<any>()
  private activeProgressFullObj: Array<any> = new Array<any>()
  private scrollObj: Array<any> = new Array<any>()
  private activeParallaxObj: Array<any> = new Array<any>()
  private parallaxObj: Array<any> = new Array<any>()



  private onScrollEvents: Array<any> = new Array<any>()

  private stEvent: Map<string, any> = new Map<string, any>()
  private prEvent: Map<string, any> = new Map<string, any>()
  private prxEvent: Map<string, any> = new Map<string, any>()
  private prScrollEvent: Map<string, any> = new Map<string, any>()
  private prStartEvent: Map<string, any> = new Map<string, any>()
  private prEndEvent: Map<string, any> = new Map<string, any>()
  private stScrollEvent: Map<string, any> = new Map<string, any>()

  private observers: IntersectionObserver[] = [];

  private sf: number = 1
  private f: number = 1

  private sAccelerate: number = 0.13
  private sDecelerate: number = 0.04

  private stateName: string = ""
  private disableRecalculate: boolean = false
  private overflowCurrent = 0


  private isEnabled: boolean = true
  private wheelBindFunc
  private scrollBindFunc
  private defaultScrollBindFunc

  private isProgressEnable: boolean = true
  private isStickyEnable: boolean = true
  private isParallaxEnable: boolean = true

  private scrollEngenee: StringScrollSmooth
  private scrollEngeneeDesktop: StringScrollSmooth = new StringScrollSmooth()
  private scrollEngeneeMobile: StringScrollDefault = new StringScrollDefault()
  private scrollEngeneeDisable: StringScrollDisable = new StringScrollDisable()
  private parser: ParseManager

  private mobileScrollMode: "smooth" | "disable" | "default" = "default"
  private desktopScrollMode: "smooth" | "disable" | "default" = "smooth"

  public IsAutoupdateScrollPosition: boolean = true

  private constructor() {

    d = document
    w = window

    this.wHeight = w.innerHeight
    this.wWidth = w.innerWidth


    this.parser = new ParseManager()

    this.scrollEngenee = this.scrollEngeneeDesktop
    this.initElementsFromDOM()
    w.addEventListener('resize', () => { this.onResize() })




    this.wheelBindFunc = this.onWheel.bind(this)
    this.scrollBindFunc = this.onScroll.bind(this)
    this.defaultScrollBindFunc = this.onDefaultScroll.bind(this)

    document.body.addEventListener('wheel', this.wheelBindFunc, { passive: false })
    w.addEventListener('scroll', this.scrollBindFunc, { passive: false })

    this.onAnimationFrame()
    this.sendElements()
    this.onIntersectionObserver()
    this.onResize()

    this.onMutationObserver()

    document.documentElement.classList.add("string-scroll")
    document.documentElement.classList.add("string-smoothy")


  }

  public static getInstance(): StringScroll {
    if (!StringScroll.instance) {
      StringScroll.instance = new StringScroll();
    }
    return StringScroll.instance;
  }

  private initElementsFromDOM() {
    this.scrollEls = d.querySelectorAll('[data-string]')
    this.progressEls = d.querySelectorAll('[data-string-progress]')
    this.stickyEls = d.querySelectorAll('[data-string-sticky-progress]')
    this.parralaxEls = d.querySelectorAll('[data-string-parallax]')
    this.lerpEls = d.querySelectorAll('[data-string-lerp]')
  }

  public onChangePage() {

    if (this.IsAutoupdateScrollPosition) {
      this.scrollEngenee.data.c = 0
      this.scrollEngenee.data.t = 0
      window.scrollTo(0, this.scrollEngenee.data.c);
    }


    this.initElementsFromDOM()
    this.sendElements()
    this.onIntersectionObserver()
  }

  SetScrollPosition(scroll: number) {
    this.scrollEngenee.data.c = scroll
    this.scrollEngenee.data.t = scroll
    window.scrollTo(0, this.scrollEngenee.data.c);
  }

  public setMobileMode(mode: "smooth" | "disable" | "default") {
    this.mobileScrollMode = mode
    this.enableScroll()
  }

  public setDesktopMode(mode: "smooth" | "disable" | "default") {
    this.desktopScrollMode = mode
    this.enableScroll()
  }


  public disableScroll() {
    this.scrollEngenee = this.scrollEngeneeDisable
  }
  public enableScroll() {
    if (w.innerWidth < 1024 || isTouchDevice()) {
      this.setScrollMode(this.mobileScrollMode)
    } else {
      this.setScrollMode(this.desktopScrollMode)
    }
  }

  public setSpeedAccelerate(speed: number) {
    this.sAccelerate = speed
    this.scrollEngeneeDesktop.sAccelerate = speed
    this.scrollEngeneeDisable.sAccelerate = speed
    this.scrollEngeneeMobile.sAccelerate = speed
  }
  public setSpeedDecelerate(speed: number) {
    this.sDecelerate = speed
    this.scrollEngeneeDesktop.sDecelerate = speed
    this.scrollEngeneeDisable.sDecelerate = speed
    this.scrollEngeneeMobile.sDecelerate = speed
  }
  public setScrollFactor(factor: number) {
    this.f = factor
    if (isSafari()) {
      this.scrollEngeneeDesktop.data.cF = this.f * this.sf
    } else {
      this.scrollEngeneeDesktop.data.cF = this.f
    }
  }
  public setSafariFactor(safariFactor: number) {
    this.sf = safariFactor
    if (isSafari()) {
      this.scrollEngeneeDesktop.data.cF = this.f * this.sf
    } else {
      this.scrollEngeneeDesktop.data.cF = this.f
    }
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


  public setScrollMode(mode: "smooth" | "disable" | "default") {
    this.stateName = mode
    switch (mode) {
      case "smooth":
        this.scrollEngenee = this.scrollEngeneeDesktop
        break;
      case "default":
        this.scrollEngenee = this.scrollEngeneeMobile
        break;
      case "disable":
        this.scrollEngenee = this.scrollEngeneeDisable
        break;
    }
  }



  public enableById() {

  }
  public disableById(id: string) {

    function setDisable(element: any) {

      if (element.id == id) {

        element.disabled = true
        element.el.setAttribute("data-string-disabled", "")
      }

    }
    this.progressObj.forEach(setDisable)
    this.parallaxObj.forEach(setDisable)
    this.activeProgressObj.forEach(setDisable)

  }


  public enableProgress() {
    this.isProgressEnable = true
  }
  public enableSticky() {
    this.isStickyEnable = true
  }
  public enableParallax() {
    this.isParallaxEnable = true
  }

  public disableProgress() {
    this.isProgressEnable = false
  }
  public disableSticky() {
    this.isStickyEnable = false
  }
  public disableParallax() {
    this.isParallaxEnable = false
  }

  public onStickyEvent(id: string, event: any) {
    this.stEvent.set(id, event)
  }
  public onProgress(id: string, event: any) {
    if (this.prEvent.has(id) == false) {
      this.prEvent.set(id, [])
    }
    this.prEvent.get(id).push(event)

  }
  public onScrollProgress(id: string, event: any) {
    this.prScrollEvent.set(id, event)
  }
  public onStartProgress(id: string, event: any) {
    this.prStartEvent.set(id, event)
  }
  public onEndProgress(id: string, event: any) {
    this.prEndEvent.set(id, event)
  }
  public onParallax(id: string, event: any) {
    this.prxEvent.set(id, event)
  }
  public onScrollSticky(id: string, event: any) {
    this.stScrollEvent.set(id, event)
  }

  private onWheel(e: WheelEvent) {
    if (this.disableRecalculate) {
      e.preventDefault()
      return
    }
    this.scrollEngenee.onWheel(e)
  }

  private onMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          let b = d.body,
            h = d.documentElement
          let dHeight = Math.max(b.scrollHeight, b.offsetHeight,
            h.clientHeight, h.scrollHeight, h.offsetHeight)
          this.scrollEngenee.data.bS = dHeight - this.wHeight
          this.initElementsFromDOM()
          this.sendElements()
          this.onIntersectionObserver()
          this.recalculate()

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
    this.scrollEngenee.onScroll(e)
    this.recalculate()
    this.onScrollEvents.forEach(scrollEvent => {
      scrollEvent(d.documentElement.scrollTop)
    });
  }

  private onDefaultScroll(e: Event) {
    this.scrollEngenee.data.c = d.documentElement.scrollTop
    this.scrollEngenee.data.t = d.documentElement.scrollTop
    this.recalculate()
    this.onScrollEvents.forEach(scrollEvent => {
      scrollEvent(d.documentElement.scrollTop)
    })
  }

  private onIntersectionObserver() {
    this.observers.forEach((observer) => {
      observer.disconnect();
    })
    this.observers = []


    let callback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("-inview")
        } else {
          if (entry.target.getAttribute('data-string-repeat') != null) {
            entry.target.classList.remove("-inview")
          }
        }
      })
    }

    this.scrollObj.forEach((target: any) => {
      let options = {
        root: null,
        rootMargin: `${target.oTop * -1}px 0px ${target.oBottom * -1}px 0px`,
        threshold: 0.01,
      }
      let ob = new IntersectionObserver(callback, options)
      ob.observe(target.el)
      this.observers.push(ob);
    });


    let callbackGl = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          if (!this.activeProgressEls.includes(entry.target)) {

            this.activeProgressEls.push(entry.target);

            this.sendElements()
          }
        } else {
          let index = this.activeProgressEls.indexOf(entry.target);
          if (index !== -1) {
            this.activeProgressEls.splice(index, 1);
            this.sendElements()
          }
        }
      })
    }

    this.progressObj.forEach((target: any) => {
      let optionsProgress = {
        root: null,
        rootMargin: `${target.oTop * 1 + this.wHeight * 1.5}px 0px ${target.oBottom * 1 + this.wHeight * 1.5}px 0px`,
        threshold: 0.001,
      }
      let obGl = new IntersectionObserver(callbackGl, optionsProgress);
      obGl.observe(target.el);
      this.observers.push(obGl);

    });



    let callbackPrx = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          if (!this.activeParallaxEls.includes(entry.target)) {
            this.activeParallaxEls.push(entry.target)
            this.sendElements()
          }
        } else {
          let index = this.activeParallaxEls.indexOf(entry.target)
          if (index !== -1) {
            this.activeParallaxEls.splice(index, 1)
            this.sendElements()
          }
        }
      })
    }

    this.parallaxObj.forEach((target: any) => {
      let optionsProgress = {
        root: null,
        rootMargin: `${target.oTop * 1 + 10}px 0px ${target.oBottom * 1 + 10}px 0px`,
        threshold: 0.001,
      }
      let obPrx = new IntersectionObserver(callbackPrx, optionsProgress);
      obPrx.observe(target.el);
      this.observers.push(obPrx);

    });



  }

  public overflowHidden() {
    this.disableRecalculate = true
    this.overflowCurrent = this.scrollEngenee.data.c
    const firstChild = document.getElementById('string-scroll-layout') as HTMLElement;
    if (firstChild) {
      firstChild.style.transform = `translateY(-${this.scrollEngenee.data.c}px)`
    }
  }

  public overflowAuto() {
    const firstChild = document.getElementById('string-scroll-layout') as HTMLElement
    if (firstChild) {
      firstChild.style.transform = `translateY(0px)`
    }
    this.scrollEngenee.data.c = this.overflowCurrent
    this.scrollEngenee.data.t = this.overflowCurrent
    this.disableRecalculate = false
    setTimeout(() => {
      window.scrollTo(0, this.scrollEngenee.data.c);
    }, 10);
  }

  private onAnimationFrame() {
    let reqAnim = () => {
      this.scrollEngenee.onAnimationFrame()
      this.lerpEls.forEach((elemet: any, index: number) => {
        this.lerpEls[index].style.setProperty('--scroll-lerp', Math.abs(this.scrollEngenee.velocity))
      });
      requestAnimationFrame(reqAnim);
    }
    requestAnimationFrame(reqAnim);
  }

  private recalculate() {
    if (this.disableRecalculate) {
      return
    }
    if (this.isStickyEnable) {
      this.stickyObj.forEach((el: any) => {
        if (el.disabled) { return }
        let parentBox = gbcl(el.parent)
        let p = 0
        let elementTop = getCoords(el.parent).top - this.scrollEngenee.data.c;
        let elementBottom = elementTop + parentBox.height;
        if (elementBottom < 0) {
          p = 1;
        } else if (elementTop > this.wHeight) {
          p = 0;
        } else {
          p = 1 - (elementBottom / (parentBox.height + this.wHeight));
        }
        el.el.style.setProperty('--string-sticky-progress', p)
        this.eStic(el.id, p)
      })
    }

    if (this.isProgressEnable) {
      this.activeProgressObj.forEach((el: any) => {
        if (el.disabled) { return }

        let v = (this.scrollEngenee.data.c - el.startProgressPosition) / (el.endProgressPosition - el.startProgressPosition);

        if (v > 1) {
          v = 1
          this.eEndProg(el.id, v)
        }
        if (v < 0) {
          v = 0
          this.eStartProg(el.id, v)
        }
        el.el.style.setProperty('--string-progress', v)
        if (el.oldValue != v) {
          if (this.prEvent.has(el.id)) {
            this.prEvent.get(el.id).forEach((element: any) => {
              element(v)
            });
          }
        }
        this.eScrollProg(el.id, el.oTop - this.scrollEngenee.data.c + this.wHeight)
        el.oldValue = v
        el.connectEvent.forEach((event: any) => {
          event(v)
        });
      })
    }

    if (this.isParallaxEnable) {
      this.activeParallaxObj.forEach((el: any) => {
        if (el.disabled) { return }
        let v = (this.scrollEngenee.data.c - el.startProgressPosition) / (el.endProgressPosition - el.startProgressPosition)
        if (v > 1) {
          v = 1
        }
        if (v < 0) {
          v = 0
        }
        el.el.style.transform = `translateY(${v * el.parallaxFactor * this.wHeight}px)`;
        this.eParallax(el.id, v)
      })
    }
  }

  private eStic(id: string, progress: number) {
    if (this.stEvent.has(id)) {
      this.stEvent.get(id)(progress)
    }
  }
  private eScrollProg(id: string, progress: number) {
    if (this.prScrollEvent.has(id)) {
      this.prScrollEvent.get(id)(progress)
    }
  }
  private eStartProg(id: string, progress: number) {
    if (this.prStartEvent.has(id)) {
      this.prStartEvent.get(id)(progress)
    }
  }
  private eEndProg(id: string, progress: number) {
    if (this.prEndEvent.has(id)) {
      this.prEndEvent.get(id)(progress)
    }
  }
  private eParallax(id: string, progress: number) {
    if (this.prxEvent.has(id)) {
      this.prxEvent.get(id)(progress)
    }
  }

  private sendElements() {
    this.stickyObj = Array.from(this.stickyEls).map((el: any) => {
      return {
        el: el,
        top: el.getAttribute("data-offset-top"),
        height: el.getAttribute("data-offset-height"),
        disabled: el.getAttribute("data-string-disabled") == null ? false : true,
        id: el.getAttribute("data-string-id"),
        parent: el == null ? null : el.parentNode,
      }
    })

    this.progressObj = Array.from(this.progressEls).map((el: any) => {
      var r = gbcl(el)
      var oA = el.getAttribute('data-string-offset')
      var o = oA == null ? [0, 0] : this.parser.parseOffset(el, oA, this.wHeight)
      return {
        el: el,
        oTop: o[0],
        oBottom: o[1],
      };
    })


    this.activeProgressObj = Array.from(this.activeProgressEls).filter((el: any) => {
      return el.getAttribute('data-string-connect') == null
    }).map((el: any) => {
      var r = gbcl(el)
      var oA = el.getAttribute('data-string-offset')
      var o = oA == null ? [0, 0] : this.parser.parseOffset(el, oA, this.wHeight)

      let elementData = {
        el: el,
        top: getCoords(el).top,
        bottom: getCoords(el).top + r.height,
        height: r.height,
        oTop: o[0],
        oBottom: o[1],
        start: el.getAttribute("data-string-start") == null ? 1 : el.getAttribute("data-string-start"),
        end: el.getAttribute("data-string-end") == null ? 1 : el.getAttribute("data-string-end"),
        id: el.getAttribute("data-string-id"),
        disabled: el.getAttribute("data-string-disabled") == null ? false : true,
        oldValue: 0,
        divisor: this.wHeight - o[0] - o[1] - r.height,
        divisorFull: r.height + this.wHeight,
        startProgressPosition: 1,
        endProgressPosition: 1,
        connectEvent: new Array<any>()
      }


      let startPosition = el.getAttribute("data-string-start") || "top bottom";
      let endPosition = el.getAttribute("data-string-end") || "bottom top";

      let [startElPos, startScreenPos] = startPosition.split(" ");
      let [endElPos, endScreenPos] = endPosition.split(" ");

      if (startElPos == "top" && startScreenPos == "top") {
        elementData.startProgressPosition = elementData.top - elementData.oTop
      }
      if (startElPos == "top" && startScreenPos == "bottom") {
        elementData.startProgressPosition = elementData.top - elementData.oTop - this.wHeight
      }
      if (startElPos == "bottom" && startScreenPos == "top") {
        elementData.startProgressPosition = elementData.top + elementData.height + elementData.oBottom
      }
      if (startElPos == "bottom" && startScreenPos == "bottom") {
        elementData.startProgressPosition = elementData.top + elementData.height + elementData.oBottom - this.wHeight
      }


      if (endElPos == "top" && endScreenPos == "top") {
        elementData.endProgressPosition = elementData.top - elementData.oTop
      }
      if (endElPos == "top" && endScreenPos == "bottom") {
        elementData.endProgressPosition = elementData.top - elementData.oTop - this.wHeight
      }
      if (endElPos == "bottom" && endScreenPos == "top") {
        elementData.endProgressPosition = elementData.top + elementData.height + elementData.oBottom
      }
      if (endElPos == "bottom" && endScreenPos == "bottom") {
        elementData.endProgressPosition = elementData.top + elementData.height + elementData.oBottom - this.wHeight
      }

      return elementData

    })


    Array.from(this.activeProgressEls).forEach((el: any) => {
      if (el.getAttribute('data-string-connect') != null) {

        let findedElement = this.activeProgressObj.find((elFind: any) => {
          return elFind.id == el.getAttribute('data-string-connect')
        })
        if (findedElement != null) {
          findedElement.connectEvent.push((progress: number) => {
            el.style.setProperty('--string-progress', progress)
          })
        }
      }
    })


    this.parallaxObj = Array.from(this.parralaxEls).map((el: any) => {

      var r = gbcl(el)
      var oA = el.getAttribute('data-string-offset')
      var o = oA == null ? [0, 0] : this.parser.parseOffset(el, oA, this.wHeight)
      return {
        el: el,
        oTop: o[0],
        oBottom: o[1],
      };
    })

    this.activeParallaxObj = Array.from(this.activeParallaxEls).filter((el: any) => {
      return el.getAttribute('data-string-connect') == null
    }).map((el: any) => {
      if (el.getAttribute('data-string-connect') == null) {

        var r = gbcl(el)
        var oA = el.getAttribute('data-string-offset')
        var o = oA == null ? [0, 0] : this.parser.parseOffset(el, oA, this.wHeight)
        var pF = el.getAttribute('data-string-parallax')
        let elementData = {
          el: el,
          top: getCoords(el).top,
          bottom: getCoords(el).top + r.height,
          height: r.height,
          oTop: o[0],
          oBottom: o[1],
          start: el.getAttribute("data-string-start") == null ? 1 : el.getAttribute("data-string-start"),
          end: el.getAttribute("data-string-end") == null ? 1 : el.getAttribute("data-string-end"),
          id: el.getAttribute("data-string-id"),
          disabled: el.getAttribute("data-string-disabled") == null ? false : true,
          parallaxFactor: pF,
          oldValue: 0,
          divisor: this.wHeight - o[0] - o[1] - r.height,
          divisorFull: r.height + this.wHeight,
          startProgressPosition: 1,
          endProgressPosition: 1
        }
        elementData.startProgressPosition = elementData.top - this.wHeight
          + (elementData.start * (elementData.height + elementData.oTop) - ((1 - elementData.start) * elementData.oTop));
        elementData.endProgressPosition = elementData.top
          + (elementData.end * (elementData.height + elementData.oBottom) - ((1 - elementData.end) * elementData.oBottom));

        return elementData
      }
    })

    Array.from(this.activeParallaxEls).forEach((el: any) => {
      if (el.getAttribute('data-string-connect') != null) {

        let findedElement = this.activeProgressObj.find((elFind: any) => {
          return elFind.id == el.getAttribute('data-string-connect')
        })
        var pF = el.getAttribute('data-string-parallax')
        if (findedElement != null) {
          findedElement.connectEvent.push((progress: number) => {
            el.style.transform = `translateY(${progress * pF * this.wHeight}px)`;
          })
        }
      }
    })


    this.scrollObj = Array.from(this.scrollEls).map((el: any) => {
      var r = gbcl(el)
      var oA = el.getAttribute('data-string-offset')
      var o = oA == null ? [0, 0] : this.parser.parseOffset(el, oA, this.wHeight)
      return {
        el: el,
        top: getCoords(el).top,
        height: r.height,
        oTop: o[0],
        oBottom: o[1],
        disabled: el.getAttribute("data-string-disabled") == null ? false : true,
      };
    })




  }

  private initEl(el: any, isProgress: boolean = false) {
    var r = gbcl(el)
    if (isProgress) {
      el.style.setProperty('--string-progress', 0);
      el.setAttribute("data-offset-top", getCoords(el).top)
      el.setAttribute("data-offset-height", r.height)
    }
    var org = el.getAttribute('data-string-origin')
    if (org != null) {
      el.style.transformOrigin = this.parser.parseOrigin(org)
    }
  }

  public onResize() {
    this.stickyEls.forEach((el: any) => {
      this.initEl(el, true)
    })
    this.progressEls.forEach((el: any) => {
      this.initEl(el, true)
    })
    this.scrollEls.forEach((el: any) => {
      this.initEl(el)
    })
    this.sendElements()
    if (w.innerWidth < 1024 || isTouchDevice()) {
      this.setScrollMode(this.mobileScrollMode)
    }
    else {
      this.setScrollMode(this.desktopScrollMode)
    }
    if (this.wWidth != w.innerWidth) {
      this.wWidth = w.innerWidth
      this.wHeight = w.innerHeight
    }
    let b = d.body,
      h = d.documentElement
    let dHeight = Math.max(b.scrollHeight, b.offsetHeight,
      h.clientHeight, h.scrollHeight, h.offsetHeight)
    this.scrollEngenee.data.bS = dHeight - this.wHeight
    this.onIntersectionObserver()

    //this.scrollEngenee.onScroll()
    this.recalculate()

  }
}



export default StringScroll