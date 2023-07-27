

var d: any = null
var w: any = null
function parseOffset(element: any, offset: any = "0,0", windowHeight: any, baseRemValue: number = 16) {
  let offsets = offset.split(',');
  if (offsets.length === 1) {
    offsets = [offsets[0], offsets[0]];
  }
  let offsetsValue = offsets.map((offset: any) => {
    offset = offset.trim();
    if (offset.startsWith('calc')) {
      return parseCalculation(offset, element, windowHeight, baseRemValue);
    } else {
      return parseSingleValue(offset, element, windowHeight, baseRemValue);
    }
  });
  return offsetsValue;
}

function parseSingleValue(value: string, element: any, windowHeight: any, baseRemValue: number): number {
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

function parseCalculation(calculation: string, element: any, windowHeight: any, baseRemValue: number): number {
  calculation = calculation.slice(5, -1); // remove "calc(" and ")"
  let parts = calculation.split(/([-+])/).filter(Boolean); // split by '-' or '+'
  return parts.reduce((total, part, index) => {
    if (part === '-' || part === '+') {
      return total; // ignore the operators for now
    } else {
      // remove 'px' from part to match the existing format
      let value = parseSingleValue(part.trim(), element, windowHeight, baseRemValue);
      if (parts[index - 1] === '-') {
        return total - value;
      } else {
        return total + value;
      }
    }
  }, 0);
}





function parseOrigin(originString: string) {
  if (originString == null || originString == "") {
    originString = "center center"
  }
  const parts = originString.split(' ');

  const x = parseOriginPart(parts[0]);
  const y = parseOriginPart(parts[1] || parts[0]);

  return `${x} ${y}`;
}

function parseOriginPart(part: string) {
  part = part.trim();
  if (part.startsWith('random')) {
    const options = part.slice(7, -1).split(',').map(s => s.trim());
    options.forEach(option => validateOrigin(option));
    const choice = Math.floor(Math.random() * options.length);
    return options[choice];
  } else {
    validateOrigin(part);
    return part;
  }
}

function validateOrigin(option: any) {
  const validOptions = ['top', 'center', 'bottom', 'left', 'right'];
  if (!validOptions.includes(option)) {
    throw new Error(`Invalid origin option: ${option}`);
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
function lerpAccelerate(start: any, end: any, t: any) {
  t = t * t
  return start * (1 - t) + end * t;
}
function damp(x: any, y: any, z: any, actualAccelerate: any, dt: any) {
  return lerp(x, y, 1 - Math.exp(-actualAccelerate * dt));
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
function mobileCheck() {
  let check = false;
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor);
  return check;
};

class StringScroll {
  private static instance: StringScroll;
  private respState: string = ""
  private wHeight: number

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
  private scrollObj: Array<any> = new Array<any>()
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
  private cf: number = 1

  private sAccelerate: number = 0.05
  private sDecelerate: number = 0.05
  private stPsDist: number = 0
  private t: number = 0
  private c: number = 0
  private stPs: number | null = null
  private d: number = 0
  private currentDeltaModule: number = 0
  private requestId = null
  private bottomScroll: number = 0
  private isProg: boolean = false
  private isProgTimeout: any = null

  private actualAccelerate: number = 0.05

  private isEnabled: boolean = true
  private wheelBindFunc
  private scrollBindFunc
  private defaultScrollBindFunc

  private isProgressEnable: boolean = true
  private isStickyEnable: boolean = true
  private isParallaxEnable: boolean = true

  private constructor() {

    d = document
    w = window

    this.wHeight = w.innerHeight
    this.scrollEls = d.querySelectorAll('[data-string]')
    this.progressEls = d.querySelectorAll('[data-string-progress]')
    this.stickyEls = d.querySelectorAll('[data-string-sticky-progress]')
    this.parralaxEls = d.querySelectorAll('[data-string-parallax]')
    this.lerpEls = d.querySelectorAll('[data-lerp]')
    w.addEventListener('resize', () => { this.onResize() })

    this.wheelBindFunc = this.onWheel.bind(this)
    this.scrollBindFunc = this.onScroll.bind(this)
    this.defaultScrollBindFunc = this.onDefaultScroll.bind(this)
    w.addEventListener('wheel', this.wheelBindFunc, { passive: false })
    w.addEventListener('scroll', this.scrollBindFunc, { passive: false })
    this.onAnimationFrame()

    this.sendElements()
    this.onIntersectionObserver()
    this.onResize()

    document.documentElement.classList.add("string-scroll")
    document.documentElement.classList.add("string-smoothy")

    //string-scrolling

  }

  public static getInstance(): StringScroll {
    if (!StringScroll.instance) {
      StringScroll.instance = new StringScroll();
    }
    return StringScroll.instance;
  }


  public setSpeedAccelerate(speed: number) {
    this.sAccelerate = speed
  }
  public setSpeedDecelerate(speed: number) {
    this.sDecelerate = speed
  }
  public setScrollFactor(factor: number) {
    this.f = factor
    if (isSafari()) {
      this.cf = this.f * this.sf
    } else {
      this.cf = this.f
    }
  }
  public setSafariFactor(safariFactor: number) {
    this.sf = safariFactor
    if (isSafari()) {
      this.cf = this.f * this.sf
    } else {
      this.cf = this.f
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


  public disable() {
    if (this.isEnabled) {
      w.removeEventListener('wheel', this.wheelBindFunc);
      w.removeEventListener('scroll', this.scrollBindFunc);
      w.addEventListener('scroll', this.defaultScrollBindFunc);
      this.isEnabled = false
    }
  }
  public enable() {
    if (!this.isEnabled) {
      w.removeEventListener('scroll', this.defaultScrollBindFunc);
      w.addEventListener('wheel', this.wheelBindFunc, { passive: false });
      w.addEventListener('scroll', this.scrollBindFunc, { passive: false });
      this.isEnabled = true
    }
  }



  public enableById() {

  }
  public disableById(id: string) {

    function setDisable(element: any) {

      if (element.id == id) {

        element.disabled = true
        element.el.setAttribute("data-string-disabled", "")
        console.log(element)
      }

    }
    this.progressObj.forEach(setDisable)
    this.scrollObj.forEach(setDisable)
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
    this.prEvent.set(id, event)
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





  private isScrollDown: boolean = false
  private onWheel(e: WheelEvent) {
    e.preventDefault();
    this.currentDeltaModule = Math.abs(e.deltaY)
    this.d = e.deltaY * this.cf
    this.t += this.d
    if (this.t < 0) {
      this.t = 0.00
    }
    if (this.t > this.bottomScroll) {
      this.t = this.bottomScroll
    }
    if (this.stPs == null) {
      this.stPs = d.documentElement.scrollTop
    }
    if (this.isScrollDown != this.c < this.t) {
      this.stPs = d.documentElement.scrollTop
      this.stPsDist = Math.abs((this.stPs == null ? this.t : this.stPs) - this.t) / 2
      this.actualAccelerate = this.sAccelerate
    }
    this.isScrollDown = this.c < this.t
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

  private onDefaultScroll(e: Event) {
    this.c = d.documentElement.scrollTop
    this.t = d.documentElement.scrollTop
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
        rootMargin: `${target.oTop * -1}px 0px ${target.oBottom * -1}px 0px`,
        threshold: 0.01,
      }
      let obGl = new IntersectionObserver(callbackGl, optionsProgress);
      obGl.observe(target.el);
      this.observers.push(obGl);

    });



    let optionsParallax = {
      root: null,
      rootMargin: `0px`,
      threshold: 0.01,
    }
    let callbackPrx = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          if (!this.activeParallaxEls.includes(entry.target)) {
            this.activeParallaxEls.push(entry.target);
            this.sendElements()
          }
        } else {
          let index = this.activeParallaxEls.indexOf(entry.target);
          if (index !== -1) {
            this.activeParallaxEls.splice(index, 1);
            this.sendElements()
          }
        }
      })
    }
    let obPrx = new IntersectionObserver(callbackPrx, optionsParallax);
    this.parralaxEls.forEach((target: any) => {
      obPrx.observe(target);
    });
    this.observers.push(obPrx);


  }

  private onAnimationFrame() {
    let reqAnim = () => {
      if (this.respState == "d") {
        let newC = damp(this.c, this.t, this.stPsDist, this.actualAccelerate, 1)
        let lerp = newC - this.c
        this.c = newC
        if (Math.abs(this.c - this.t) < 1) {
          this.c = this.t
        }
        if (lerp != 0) {
          if (this.currentDeltaModule > 40) {
            this.actualAccelerate = lerpAccelerate(this.actualAccelerate, this.sDecelerate, this.actualAccelerate / this.sDecelerate)
          }
          this.isProg = true
          d.documentElement.scrollTop = d.body.scrollTop = this.c
          document.documentElement.classList.add("string-scrolling")
          if (this.isProgTimeout != null) {
            clearTimeout(this.isProgTimeout)
          }
          this.isProgTimeout = setTimeout(() => {
            this.isProg = false
          }, 100);
          lerp = Math.abs(lerp)
          this.lerpEls.forEach((elemet: any, index: number) => {
            this.lerpEls[index].style.setProperty('--string-lerp', lerp)
          });
        } else {
          this.currentDeltaModule = 0
          this.actualAccelerate = this.sAccelerate
          this.stPs = null
          document.documentElement.classList.remove("string-scrolling")
        }
      }
      this.recalculate()
      requestAnimationFrame(reqAnim);
    }
    requestAnimationFrame(reqAnim);
  }

  private recalculate() {

    if (this.isStickyEnable) {
      this.stickyObj.forEach((el: any) => {
        if (el.disabled) { return }
        let prntH = gbcl(el.parent).height
        let p = (this.c + (this.wHeight * this.c / prntH)) / prntH
        el.el.style.setProperty('--string-sticky-progress', p)
        this.eStic(el.id, p)
      })
    }


    // console.log(this.activeProgressObj)
    if (this.isProgressEnable) {
      this.activeProgressObj.forEach((el: any) => {
        if (el.disabled) { return }
        let v = ((this.c - el.oBottom + this.wHeight - (el.top)) / (this.wHeight - el.oTop - el.oBottom))
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
          this.eProg(el.id, v)
        }
        this.eScrollProg(el.id, el.oTop - this.c + this.wHeight)
        el.oldValue = v
      })
    }

    if (this.isParallaxEnable) {
      this.parallaxObj.forEach((el: any) => {
        if (el.disabled) { return }
        let v = ((this.c - el.oBottom + this.wHeight - (el.top)) / (this.wHeight - el.oTop - el.oBottom))
        if (v > 1) {
          v = 1
        }
        if (v < 0) {
          v = 0
        }
        // el.el.style.setProperty('--string-parallax', v * el.parallaxFactor);
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
  private eProg(id: string, progress: number) {
    if (this.prEvent.has(id)) {
      this.prEvent.get(id)(progress)
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
  private eScrollSticky(id: string, progress: number) {
    if (this.stScrollEvent.has(id)) {
      this.stScrollEvent.get(id)(progress)
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
        parent: el.parentNode,
      };
    })

    this.progressObj = Array.from(this.progressEls).map((el: any) => {
      var r = gbcl(el)
      var oA = el.getAttribute('data-string-offset')
      var o = oA == null ? [0, 0] : parseOffset(el, oA, this.wHeight)

      return {
        el: el,
        top: getCoords(el).top,
        height: r.height,
        oTop: o[0],
        oBottom: o[1],
        id: el.getAttribute("data-string-id"),
        disabled: el.getAttribute("data-string-disabled") == null ? false : true,
        oldValue: 0
      };
    })

    this.activeProgressObj = Array.from(this.activeProgressEls).map((el: any) => {
      var r = gbcl(el)
      var oA = el.getAttribute('data-string-offset')
      var o = oA == null ? [0, 0] : parseOffset(el, oA, this.wHeight)
      return {
        el: el,
        top: getCoords(el).top,
        height: r.height,
        oTop: o[0],
        oBottom: o[1],
        id: el.getAttribute("data-string-id"),
        disabled: el.getAttribute("data-string-disabled") == null ? false : true,
        oldValue: 0
      };
    })

    this.parallaxObj = Array.from(this.activeParallaxEls).map((el: any) => {
      var r = gbcl(el)
      var oA = el.getAttribute('data-string-offset')
      var pF = el.getAttribute('data-string-parallax')
      var o = oA == null ? [0, 0] : parseOffset(el, oA, this.wHeight)
      return {
        el: el,
        top: getCoords(el).top,
        height: r.height,
        oTop: o[0],
        oBottom: o[1],
        parallaxFactor: pF,
        id: el.getAttribute("data-string-id"),
        disabled: el.getAttribute("data-string-disabled") == null ? false : true,
      };
    })

    this.scrollObj = Array.from(this.scrollEls).map((el: any) => {
      var r = gbcl(el)
      var oA = el.getAttribute('data-string-offset')
      var o = oA == null ? [0, 0] : parseOffset(el, oA, this.wHeight)
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
      el.style.transformOrigin = parseOrigin(org)
    }
  }

  private onResize() {
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


    let b = d.body,
      h = d.documentElement;

    let dHeight = Math.max(b.scrollHeight, b.offsetHeight,
      h.clientHeight, h.scrollHeight, h.offsetHeight);
    this.wHeight = w.screen.height;

    this.bottomScroll = dHeight - this.wHeight
    if (!mobileCheck()) {
      this.respState = "d"
    }
    if (mobileCheck()) {
      this.respState = "m"
    }

    this.onIntersectionObserver()
  }

}



export default StringScroll