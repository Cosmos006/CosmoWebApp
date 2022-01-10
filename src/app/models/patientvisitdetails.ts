export class patientvisitdetails {
  constructor(
  public id:number=0,
  public patientid:number=0,
  public height?: number,
  public weight?: number,
  public bloodpressure?: number,
  public bodytemprature?: number,
  public respirationrate?: number,
  public diagnosisid?: string,
  public diagnosisdiscription?: string,
  public diagnosisdiscriptionifother?:string,
  public diagnosisisdepricated?: boolean,
  public procedureid?: string,
  public procedurediscription?: string,
  public proceduredepricated?: boolean,
  public drugid?: string,
  public drugname?: string,
  public druggenericname?: string,
  public drugbrandname?: string,
  public drugform?: string,
  )
  {}
}
