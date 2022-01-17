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

interface IUrole {
  umenus: any[];
  uroleName: string;
  uroleDesc: string;
  uroleType: number;
  uroleId: string;
}

declare namespace API {
  // findMyMenuPermissionByMenuId
  type MyMenuPermissionModel = IPermissionItemModel[]
  // signlogin
  type UserInfo = {
    loginName: string
    userId: string
    userName: string
    userNumber: string
    password: string
    mobile: string | null
    email: string | null
    sex: string
    pictureBase64: string | null
    affiliatedUnit?: string | null
    areaCode?:  string | null
    areaId?:  string | null
    areaName?: string | null
    birthday?: string | null
    entry?: string | null
    firstLogin?: boolean
    orgCode?: any;
    orgId?: any;
    orgName?: any;
    organization?: any;
    organizationPositions?: any[];
    organizations?: any;
    permissions?: any;
    pid?: any;
    pname?: any;
    positionName?: any;
    positions?: any;
    rankName?: any;
    roles?: any[];
    status?: number;
    toUrl?: any;
    token?: any;
    uroles?: IUrole[];
    userOpenId?: any;
    var1?: any;
    var2?: any;
    var3?: any;
    workPhone?: any;
    [index: string]: any
  }
}


