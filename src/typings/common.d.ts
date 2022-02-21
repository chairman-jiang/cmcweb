interface IRuleItem {
  required: boolean
  message: string
}

interface IRules {
  [propName: string]: IRuleItem[]
}
