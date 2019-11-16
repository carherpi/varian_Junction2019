import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseURL = 'https://junction-planreview.azurewebsites.net/'

  constructor(private http: HttpClient) { }

  getPatients() {     
    return this.http.get(this.baseURL + 'api/patients')
  }

  getImageUrl(value) {  
    var paciente = 'Head_Neck'   
    var plan = 'JSu-IM101'
    return this.baseURL + '/api/patients/' + paciente + '/plans/' + plan + '/RenderedBitmaps/' + value
  }
  getPatient(patientId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId)
  }

  getPatientPlans(patientId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans')
  }

  getPatientPlan(patientId, planId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans/' + planId)
  }

  getDVH(patientId, planId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans/' + planId + 'dvh')
  }

  getDoseVoxels(patientId, planId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans/' + planId + '/dosevoxels')
  }

  getRenderedBitmaps(patientId, planId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans/' + planId + '/RenderedBitmaps')
  }

  getRenderedBitmap(patientId, planId,bitmapId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans/' + planId + '/RenderedBitmaps/'+ bitmapId)
  }

  getIsodoseMeshes(patientId, planId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans/' + planId + '/isodose-meshes')
  }

  getIsodoseMesh(patientId, planId, isodoseId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans/' + planId + '/isodose-meshes/'+isodoseId)
  }

  getIsodoseContours(patientId, planId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans/' + planId + '/isodose-contours')
  }

  getIsodoseContour(patientId, planId, contourId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans/' + planId + '/isodose-contour/'+ contourId)
  }

  getDVHCuerves(patientId, planId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans/' + planId + '/dvhcurves')
  }

  getDVHCuerve(patientId, planId, curveId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId + '/plans/' + planId + '/dvhcurves/'+curveId)
  }

  getImages(patientId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId)
  }

  getImage(patientId, imageId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId +'/images/'+ imageId)
  }

  getImageMeshes(patientId, imageId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId +'/images/'+ imageId + '/structure-meshes')
  }

  getImageMesh(patientId, imageId, meshId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId +'/images/'+ imageId + '/structure-meshes/'+ meshId)
  }

  getStructuteContours(patientId, imageId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId +'/images/'+ imageId + '/structure-contours')
  }

  getStructuteContour(patientId, imageId, countourId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId +'/images/'+ imageId + '/structure-contours/'+countourId)
  }

  getVoxels(patientId, imageId){
    return this.http.get(this.baseURL + 'api/patients/'+ patientId +'/images/'+ imageId + '/imagevoxels/')
  }

}
