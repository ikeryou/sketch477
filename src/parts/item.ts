import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _con: HTMLElement
  private _inner: HTMLElement
  private _isHover: boolean = false
  private _innerHeight: number = 0
  private _rate: number = 0
  private _hoverAfterCnt: number = 0

  constructor(opt:any) {
    super(opt)

    this.addClass('item')

    this._con = this.qs('.container')
    this._inner = this.qs('.inner')

    let t = ''
    const num = Util.randomInt(50, 500)
    // ランダムな文字列を生成
    for(let i = 0; i < num; i++) {
      t += String.fromCharCode(Util.randomInt(33, 126))
    }
    this.qs('p').textContent = t

    Tween.set(this._inner, {
      fontSize: Util.randomInt(10, 20) + 'px',
      // backgroundColor: new Color(0xffffff).offsetHSL(Util.random(0,1), 0, 0).getStyle(),
    })

    Tween.set(this.el, {
      width: Func.val(150, 300) + 'px',
    })

    if(Conf.IS_TOUCH_DEVICE) {
      this.el.addEventListener('touchstart', () => {
        this._eRollOver()
      })
    } else {
      this._setHover()
    }
  }

  //
  protected _eRollOver() {
    this._isHover = true
    this.el.setAttribute('open', 'true')
    this._innerHeight = this.getHeight(this._inner)
    this._hoverAfterCnt = 0
  }

  //
  protected _eRollOut() {
    // this._isHover = false
    // this.el.removeAttribute('open')
  }


  protected _update():void {
    super._update()

    const tg = this._isHover ? 1 : 0
    this._rate += (tg - this._rate) * 0.1

    if(tg === 0 && this._rate < 0.01) {
      this.el.removeAttribute('open')
    }

    Tween.set(this._con, {
      height: Util.mix(0, this._innerHeight, this._rate),
    })

    if(this._isHover) {
      this._hoverAfterCnt++
      if(this._hoverAfterCnt > 120) {
        this._isHover = false
        // this.el.removeAttribute('open')
      }
    }
  }
}