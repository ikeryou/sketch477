import { MyDisplay } from "../core/myDisplay";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _items: Array<Item> = []

  constructor(opt:any) {
    super(opt)

    // Tween.set(this.el, {
    //   width: Util.randomInt(100, 300) + 'px',
    // })

    const num = 50
    for(let i = 0; i < num; i++) {
      // 複製する
      const org = document.querySelector('.l-accordion.js-org') as HTMLElement
      const el = org.cloneNode(true) as HTMLElement
      this.el.appendChild(el)
      el.classList.remove('js-org')

      const item = new Item({
        el: el,
        id: i,
      })
      this._items.push(item)
    }

  }

  protected _update():void {
    super._update()
  }
}