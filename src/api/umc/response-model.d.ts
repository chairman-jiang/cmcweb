interface IFieldModel {
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

interface IPermissionItemModel {
  added: number
  edit: number
  del: number
  isShow: number
  permissionId: string
  permissionName: string
  permissionSort: number
  permissionUrl: string
  var1: string
  fieldList: IFieldModel[]
  children: IPermissionItemModel[]
}

declare namespace API {
  // findMyMenuPermissionByMenuId
  type MyMenuPermissionModel = IPermissionItemModel[]
  // signlogin
  type SignloginModel = {
    loginName: string
    userId: string
    userName: string
    userNumber: string
    password: string
    mobile: string | null
    email: string | null
    sex: string
    pictureBase64: string | null
    [index: string]: string | null
  }
}