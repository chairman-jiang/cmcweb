type PermissionCallback = (err: Error | null) => void

interface IMenuItem {
  permissionId: string
  permissionName: string
  permissionUrl: string
  var1: string // icon
  children: IMenuItem[]
}

type MenuList = IMenuItem[]
