import { gbcl } from "./Utils/gbcl";


export class StringParse {
  private static i: StringParse;
  public static getInstance(): StringParse {
    if (!StringParse.i) {
      StringParse.i = new StringParse();
    }
    return StringParse.i;
  }

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
  public parseCoords(e: any){
    let br = gbcl(document.body),
      er = gbcl(e),
      o = er.top - br.top;
    return { top: o };
  }
}