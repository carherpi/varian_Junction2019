import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

import Chart from 'chart.js';
import { Observable, combineLatest } from 'rxjs';

import StructureColors from './structureColors.js';
import CriticalOrgans from './criticalOrgans.js';
import Utils from './utils.js';
import { isPromise } from 'q';

@Component({
  selector: 'app-histograma',
  templateUrl: './histograma.component.html',
  styleUrls: ['./histograma.component.scss']
})

export class HistogramaComponent implements OnInit {

@Input() patientIdSelected : any;
@Input() planIdSelected : any

utils = new Utils;
datasets = new Array<Object>();
dvhChart: any[];
ppChart: any[];
radarChart: any[];


constructor(
    private apiService: ApiServiceService,
    ) { }

ngOnInit() {
    if ((typeof this.patientIdSelected != "undefined") 
        && (typeof this.planIdSelected != "undefined")) {
            this.getData(this.patientIdSelected, this.planIdSelected);
            this.createDVH(this.datasets, 'dvh');
        } else {
            if (typeof this.dvhChart != "undefined") {
                this.dvhChart.destroy();
            }
            if (typeof this.ppChart != "undefined") {
                this.ppChart.destroy();
            }
            if (typeof this.dvhChart != "undefined") {
                this.radarChart.destroy();
            }
        }
  }

ngOnChanges(changes) {
    this.ngOnInit()
}

createDVH(datasets, elementID) {
    var canvas = document.getElementById(elementID)
    var ctx = canvas
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'scatter',
        // The data for our dataset
        data: {
            datasets: datasets
        },
        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Volume %'
                    }
                }]
            }
        }
    });
    return chart
}

createParallelPlot(SMdatasets,elementID) {
    let plans = SMdatasets.map(({plan}) => plan);
    var datasets = this.planData2organData(SMdatasets)
    var ctx = document.getElementById(elementID).getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        
        // The data for our dataset
        data: {
            labels: plans,
            datasets: datasets
        },
        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Security Margin %'
                    }
                }]
            }
        }
    });
    return chart
}

createRadarPlot(SMdatasets,elementID) {
    let plans = SMdatasets.map(({plan}) => plan);
    var datasets = this.planData2organData(SMdatasets)
    var ctx = document.getElementById(elementID).getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'radar',
        
        // The data for our dataset
        data: {
            labels: plans,
            datasets: datasets
        },
        // Configuration options go here
        // options: {
        //     scales: {
        //         yAxes: [{
        //             scaleLabel: {
        //                 display: true,
        //                 labelString: 'Security Margin %'
        //             }
        //         }]
        //     }
        // }
    });
    return chart
}

extendDataset(DVHdatasets,SMdata,organData,patientId) {
    var organ = organData["Id"];
    var PatientCriticalOrgansS = CriticalOrgans.filter(function(data){
        return data.patient == patientId
    })
    var PatientCriticalOrgans = PatientCriticalOrgansS[0].organs
    var CriticalOrgansID = PatientCriticalOrgans.map(({ ID }) => ID)
    if (CriticalOrgansID.includes(organ) || organ.includes('PTV') || organ.includes('GTV')){
        var curve = organData["CurvePoints"].map(({Volume: y, ...rest})=>({y, ...rest}));
        curve = curve.map(({Dose: x, ...rest})=>({x, ...rest}));
        var color2 = StructureColors.filter(function(structure){
            return structure.ID == organ
        })
        var color = color2[0].Color
        DVHdatasets.push({
            label: organ,
            backgroundColor: 'rgb(255, 255, 255, 0)', // Transparent
            borderColor: color,
            data: curve,
            showLine: true,
        })
        if (CriticalOrgansID.includes(organ)) {
            var OrganLimits = PatientCriticalOrgans.filter(function(structure){
                return structure.ID == organ
            })
            var Vlimit = OrganLimits[0].V
            if (Vlimit.length > 0) {
                DVHdatasets.push({
                    label: organ + ' Protocol Limit',
                    backgroundColor: 'rgb(255, 255, 255, 0)', // Transparent
                    borderColor: color,
                    data: Vlimit,
                    showLine: true,
                    borderDash: [10],
                    lineTension: 0
                })
            }
            var MaxDoselimit = OrganLimits[0].MaxDose
            if (MaxDoselimit != null) {
                DVHdatasets.push({
                        label: organ + ' Max Dose',
                        backgroundColor: 'rgb(255, 255, 255, 0)', // Transparent
                        borderColor: color,
                        data: [{x:MaxDoselimit,y:0},{x:MaxDoselimit,y:100}],
                        showLine: true,
                        borderDash: [10],
                        lineTension: 0
                    })
                }
            var Alimit = this.utils.curveArea(Vlimit)
            if (Alimit > 0) {
                var Acurve = this.utils.curveArea(curve)
                SMdata.push(
                    {organ: organ, SM: (Alimit-Acurve)/Acurve})
                var minDist = this.utils.minDistCurves(Vlimit,curve)
                console.log(organ,Alimit,minDist.dist,minDist.isProtocol)
                }
            }
        }
    }

planData2organData(DataIN) {
    var SM_data = {}
    DataIN.forEach((plan, planIndex) => {
        var planData = plan.data
        let organs = planData.map(({organ}) => organ);
        let SM_organ = planData.map(({SM}) => SM);
        if (planIndex) {
            organs.forEach((organ, i) => SM_data[organ] = SM_data[organ].concat(SM_organ[i]));
        } else {
            organs.forEach((organ, i) => SM_data[organ] = [SM_organ[i]]);
        }
    })
    var datasets = [];
    var organs = Object.keys(SM_data)
    Object.values(SM_data).forEach((data,i) =>{
        var color2 = StructureColors.filter(function(structure){
            return structure.ID == organs[i]
        })
        var color = color2[0].Color
        datasets = datasets.concat([{
            label: organs[i],
            backgroundColor: 'rgb(255, 255, 255, 0)', // Transparent
            borderColor: color,
            data: data,
            showLine: true,
            lineTension: 0
        }])
    })
    return datasets
}

getData(patientId,planId){
    this.apiService.getPatientPlans(patientId)
    .subscribe( planIDs => {
        var planLength = 0;
        var plans = Object.values(planIDs)
        let requestsPlans:Observable<any>[] = [];
        plans.forEach( plan => {
            planLength = planLength+1;
            requestsPlans.push( this.apiService.getDVHCurves(patientId,plan))
        })
        var planDVH = []
        var SMdatasets = [];
        combineLatest(requestsPlans).toPromise()
        .then(responsePlans => {
            responsePlans.forEach( (organs, planIndex) => {
                var plan = planIDs[planIndex]
                let requestsOrgan:Observable<any>[] = [];
                organs.forEach( organ => {
                    requestsOrgan.push(this.apiService.getDVHCurve(patientId,plan,organ))
                });
                combineLatest(requestsOrgan).toPromise()
                .then(responseOrgans => {
                    var DVHdatasets = []
                    var SMdata = [];
                    responseOrgans.forEach( organData => {
                        this.extendDataset(DVHdatasets,SMdata,organData,patientId);
                        })
                    planDVH.push({plan: plan, datasets: DVHdatasets});
                    SMdatasets.push({plan: plans[planIndex], data: SMdata});
                    // Plotters
                    if (planIndex == (planLength-1)){
                        var planSelected = planDVH.filter(function(dvh){
                            return dvh.plan == planId
                        })
                        var datasetsSelected = planSelected[0].datasets
                        this.dvhChart = this.createDVH(datasetsSelected, 'dvh');
                        this.ppChart = this.createParallelPlot(SMdatasets,'pp');
                        this.radarChart = this.createRadarPlot(SMdatasets,'radar');
                    }
                    })
                })
            })
        })
    }


}

