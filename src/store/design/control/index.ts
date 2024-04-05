/*
 * @Author: Jeremy Yu
 * @Date: 2024-03-18 21:00:00
 * @Description:
 * @LastEditors: xi_zi
 * @LastEditTime: 2024-04-04 11:50:51
 */

import { useHistoryStore } from '@/store'
import { Store, defineStore } from 'pinia'

type TControlState = {
  /** 是否正在移动组件 */
  dMoving: boolean
  /** 是否正在抓取组件 */
  dDraging: boolean
  /** 是否正在调整组件宽高 */
  dResizeing: boolean
  /** 是否显示参考线 */
  dShowRefLine: boolean
  /** 全局控制选择框的显示 */
  showMoveable: boolean
  /** 是否显示moveable的旋转按钮 */
  showRotatable: boolean
  /** 记录是否按下alt键 / 或ctrl */
  dAltDown: boolean
  // 是否按下空格键
  dSpaceDown: boolean
  /** 正在编辑or裁剪的组件id **/
  dCropUuid: string
  warpable: boolean // 是否开启斜切
  scalable: boolean // 是否开启缩放
  resizable: boolean // 是否开启可调整大小
  clippable: boolean // 是否裁剪
}

type TControlAction = {
  setdMoving: (isMoving: boolean) => void
  setDraging: (isDraging: boolean) => void
  setdResizeing: (isResizing: boolean) => void
  showRefLine: (isRefLine: boolean) => void
  setShowMoveable: (isShowMoveable: boolean) => void
  setShowRotatable: (isShowRotatable: boolean) => void
  updateAltDown: (isPressAltDown: boolean) => void
  /** 组件调整结束 */
  stopDResize: () => void
  /** 组件移动结束 */
  stopDMove: () => void
  /** 设置正在裁剪or编辑的组件 */
  setCropUuid: (uuid: string) => void
  /**
   * 设置斜切
   * @param able
   * @returns
   */
  setWarpable: (able: boolean) => void
  /**
   * 设置尺寸控制
   * @param able
   * @returns
   */
  setResizable: (able: boolean) => void
  /**
   * 设置缩放
   * @param able
   * @returns
   */
  setScalable: (able: boolean) => void
  /**
   * 设置裁剪
   * @param able
   * @returns
   */
  setClippable: (able: boolean) => void
  /**
   * 初始化moveable控制
   * @returns 
   */
  initMoveableControl: () => void
  setSpaceDown: (uuid: boolean) => void // 设置是否按下空格键
}

/** 全局控制配置 */
const ControlStore = defineStore<'controlStore', TControlState, {}, TControlAction>('controlStore', {
  state: () => ({
    dMoving: false, // 是否正在移动组件
    dDraging: false, // 是否正在抓取组件
    dResizeing: false, // 是否正在调整组件宽高
    dShowRefLine: true, // 是否显示参考线
    showMoveable: false, // 全局控制选择框的显示
    showRotatable: true, // 是否显示moveable的旋转按钮
    dAltDown: false, // 记录是否按下alt键 / 或ctrl
    dCropUuid: '-1', // 正在编辑or裁剪的组件id
    warpable: false, // 是否开启斜切
    scalable: false, // 是否开启缩放
    resizable: true, // 是否开启可调整大小
    clippable: false, // 是否开启裁剪
    dSpaceDown: false, // 记录是否按下空格键
  }),
  getters: {},
  actions: {
    setdMoving(bool: boolean) {
      this.dMoving = bool
    },
    setDraging(drag: boolean) {
      this.dDraging = drag
    },
    setdResizeing(bool: boolean) {
      this.dResizeing = bool
    },
    showRefLine(show: boolean) {
      this.dShowRefLine = show
    },
    setShowMoveable(show: boolean) {
      this.showMoveable = show
      // if (!show) {
      //   // TODO: 失焦时设置面板也失去关联，但会导致某些失焦状态出错(如裁剪)
      //   state.dActiveElement = state.dPage
      // }
    },
    setShowRotatable(e: boolean) {
      this.showRotatable = e
    },
    /** TODO 组合操作 */
    updateAltDown(e: boolean) {
      this.dAltDown = e
      console.log('控制组合按键, 成组功能为: realCombined')
    },
    /** 组件调整结束 */
    stopDResize() {
      if (this.dResizeing) {
        const historyStore = useHistoryStore()
        historyStore.pushHistory('stopDResize')
        // store.dispatch('pushHistory', 'stopDResize')
      }
      this.dResizeing = false
    },
    /** 组件移动结束 */
    stopDMove() {
      if (this.dMoving) {
        const historyStore = useHistoryStore()
        historyStore.pushHistory('stopDMove')
        // store.dispatch('pushHistory', 'stopDMove')
      }
      this.dMoving = false
    },
    setCropUuid(uuid: string) {
      // 设置正在裁剪or编辑的组件
      this.dCropUuid = uuid
    },
    setWarpable(able: boolean) {
      this.warpable = able
      if (able) {
        this.scalable = false
        this.resizable = false
      } else {
        this.resizable = true
      }
    },
    setResizable(able: boolean) {
      this.resizable = able
      if (able) {
        this.warpable = false
        this.scalable = false
      }
    },
    setScalable(able: boolean) {
      this.scalable = able
      if (able) {
        this.warpable = false
        this.resizable = false
      } else {
        this.resizable = true
      }
    },
    setClippable(able: boolean) {
      this.clippable = able
    },
    setSpaceDown(val: boolean) {
      this.dSpaceDown = val
    },
    initMoveableControl() {
      this.showRotatable = true
      this.resizable = true
      this.warpable = false
      this.scalable = false
      this.clippable = false
    },
  },
})

export type TControlStore = Store<'controlStore', TControlState, {}, TControlAction>

export default ControlStore
