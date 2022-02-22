declare namespace Param {
  interface IFindContractBoard {
    isContract: number
  }

  interface IReportFindContractDist {
    date: string
  }

  interface IReportFindContractDept {
    date: string
  }

  interface IReportFindAreaDistByAreaOrgId {
    date: string
    areaOrgId: string
  }
  interface IReportFindContractTrend {
    year: string
    areaOrgId: string
  }
}