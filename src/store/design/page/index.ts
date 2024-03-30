/*
 * @Author: Jeremy Yu
 * @Date: 2024-03-18 21:00:00
 * @Description: Page全局配置
 * @LastEditors: Jeremy Yu <https://github.com/JeremyYu-cn>
 * @LastEditTime: 2024-03-18 21:00:00
 */

import { Store, defineStore } from 'pinia'

export type TPageState = {
  name: string
  type: string
  uuid: string
  left: number
  top: number
  /** 画布宽度 */
  width: number
  /** 画布高度 */
  height: number
  /** 画布背景颜色 */
  backgroundColor: string
  /** 画布背景图片 */
  backgroundImage: string
  backgroundTransform: {
    x?: number
    y?: number
  }
  /** 透明度 */
  opacity: number
  /** 强制刷新用 */
  tag: number
  setting:{
    label: string
    parentKey: string
    value: boolean
  }[]
  record: Record<string, any>
}

type TPageGetter = {
  dPage(state: TPageState): TPageState
}

type TPageActions = {
  /** 更新Page数据 */
  updatePageData<T extends keyof TPageState>(data: {
    key: T
    value: TPageState[T]
    pushHistory?: boolean
  }): void
  /** 设置dPage */
  setDPage(data: TPageState): void
}

/** 页面全局配置 */
const PageStore = defineStore<"pageStore", TPageState, TPageGetter, TPageActions>("pageStore", {
  state: () => ({
    name: '背景页面',
    type: 'page',
    uuid: '-1',
    left: 0,
    top: 0,
    width: 1920, // 画布宽度
    height: 1080, // 画布高度
    backgroundColor: '#ffffff', // 画布背景颜色
    backgroundImage: '', // 画布背景图片
    backgroundTransform: {},
    opacity: 1, // 透明度
    tag: 0, // 强制刷新用
    setting: [
      {
        label: '背景颜色',
        parentKey: 'backgroundColor',
        value: false,
      },
    ],
    record: {},
  }),
  getters: {
    dPage: (state) => state
  },
  actions: {
    /** 更新Page数据 */
    updatePageData({ key, value, pushHistory }) {
      const data = this as TPageState
      if (data[key] !== value || pushHistory) {
        data[key] = value
        // 画布修改先不压入历史栈，因为替换模板后会重复压栈
        // store.dispatch('pushHistory', 'updatePageData')
      }
    },
    /** 设置dPage */
    setDPage(data: TPageState) {
      const cur = this as Record<string, any>
      const keys = Object.keys(data) as (keyof TPageState)[];
      keys.forEach(val => {
        cur[val] = data[val]
      })
    }
  }
})

export type TPageStore = Store<"pageStore", TPageState, TPageGetter, TPageActions>

export default PageStore