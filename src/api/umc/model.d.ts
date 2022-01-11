type fieldModel = {
  added: number
  edit: number
  del: number
  fieldId: string
  fieldKey: string
  fieldName:string
  isShow: 0
  permissionId: string
  roleId: string
  var2: string // 字段备注
}

type permissionItem = {
  added: number
  edit: number
  del: number
  isShow: number
  permissionId: string
  permissionName: string
  permissionSort: number
  permissionUrl: string
  fieldList: fieldModel[]
  children: permissionItem[]
}

declare namespace API {
  type MyMenuPermissionModel = permissionItem[]
}