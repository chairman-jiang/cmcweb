export interface IConfirmConfig {
  title: string,
  content: string,
  isOk?: () => void
  isCancel?: () => void
  [index: string]: any
}