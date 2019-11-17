import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

import {Chart, destroy} from 'chart.js';
import { Observable, combineLatest } from 'rxjs';

import StructureColors from './structureColors.js';
import CriticalOrgans from './criticalOrgans.js';
import ColorList from './colorList.js';
import Utils from './utils.js';

declare var Chart

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
dvhChart: Object[];
ppChart: Object[];
radarChart: Object[];

constructor(
    private apiService: ApiServiceService,
    ) { }

ngOnInit() {
    if ( typeof this.patientIdSelected != "undefined" ) {
            this.getData(this.patientIdSelected, this.planIdSelected);
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
                        labelString: 'Volume (%)',
                        fontSize: 16
                    },
                    ticks: {
                        fontSize: 16
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Dose (Gy)',
                        fontSize: 16
                    },
                    ticks: {
                        fontSize: 16
                    }
                }]
            },
            title: {
                display: true,
                text: 'DVH',
                fontSize: 16
            }
        }
    });
    return chart
}

createParallelPlot(SMdatasets,elementID) {
    let plans = SMdatasets.map(({plan}) => plan);
    var datasets = this.planData2organData(SMdatasets)
    var ctx = document.getElementById(elementID)
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
                        labelString: 'Minimum Distance (-)',
                        fontSize: 16
                    },
                    ticks: {
                        fontSize: 16
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 16
                    }
                }]
            },
            title: {
                display: true,
                text: 'Minimum Distance between DVH and protocols',
                fontSize: 16
            }
        }
    });
    return chart
}

createRadarPlot(SMdatasets,elementID) {
    var datasets = [];
    var labels = [];
    [datasets, labels] = this.planData2datasets(SMdatasets)
    // var datasets = SMdatasets
    var ctx = document.getElementById(elementID)
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'radar',
        
        // The data for our dataset
        data: {
            labels: labels,
            datasets: datasets
        },
        // Configuration options go here
        options: {
            scale: {
                pointLabels: {
                    display: true,
                    fontSize: 16,
                    labelString: 'Security Margin %'
                }
            },
            title: {
                display: true,
                text: 'Area Integral between protocol limits and DVH',
                fontSize: 16
            }
        }
    });
    return chart
}

extendDataset(DVHdatasets,SMAreaData,SMDistData,organData,patientId) {
    var organ = organData["Id"];
    var PatientCriticalOrgansS = CriticalOrgans.filter(function(data){
        return data.patient == patientId
    })
    var PatientCriticalOrgans = PatientCriticalOrgansS[0].organs
    var CriticalOrgansID = PatientCriticalOrgans.map(({ ID }) => ID)
    if (CriticalOrgansID.includes(organ)){
        var isTarget = organ.includes('PTV')
        var curve = organData["CurvePoints"].map(({Volume: y, ...rest})=>({y, ...rest}));
        curve = curve.map(({Dose: x, ...rest})=>({x, ...rest}));
        var color2 = StructureColors.filter(function(structure){
            return structure.ID == organ
        })
        var color = color2[0].Color
        var OrganLimits = PatientCriticalOrgans.filter(function(structure){
            return structure.ID == organ
        })
        var Vlimit = OrganLimits[0].V
        var MaxDoselimit = OrganLimits[0].MaxDose
        var Alimit = this.utils.curveArea(Vlimit)
        if (Alimit > 0) {
            if (!isTarget) {
                var Acurve = this.utils.curveArea(curve)
                SMAreaData.push(
                    {organ: organ, SM: (Alimit-Acurve)/Acurve})
            }
            var minDist = this.utils.minDistCurves(Vlimit,curve)
            SMDistData.push(
                {organ: organ, SM: minDist.dist, isProtocol:minDist.isProtocol})
            }
        DVHdatasets.push({
            label: organ,
            backgroundColor: 'rgb(255, 255, 255, 0)', // Transparent
            borderColor: color,
            data: curve,
            showLine: true,
            hidden: ((Alimit > 0) ? true : false)
        })
        if (MaxDoselimit != null) {
            DVHdatasets.push({
                label: organ + ' Max Dose',
                backgroundColor: 'rgb(255, 255, 255, 0)', // Transparent
                borderColor: color,
                data: [{x:MaxDoselimit,y:0},{x:MaxDoselimit,y:100}],
                showLine: true,
                borderDash: [10],
                lineTension: 0,
                hidden: ((Alimit > 0) ? true : false)
                })
            }
        
        if (Vlimit.length > 0) {
            DVHdatasets.push({
                label: organ + ' Protocol Limit',
                backgroundColor: 'rgb(255, 255, 255, 0)', // Transparent
                borderColor: color,
                data: Vlimit,
                showLine: true,
                borderDash: [10],
                lineTension: 0,
                hidden: ((Alimit > 0) ? true : false)
                })
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

planData2datasets(DataIN) {
    let plans = DataIN.map(({plan}) => plan);
    console.log('in',DataIN)
    var datasets = [];
    var labels = [];
    DataIN.forEach((plan, planIndex) => {
        var planData = plan.data
        let organs = planData.map(({organ}) => organ);
        labels = organs;
        let SM_organ = planData.map(({SM}) => SM);
        datasets = datasets.concat([{
            label: plan.plan,
            backgroundColor: 'rgb(255, 255, 255, 0)', // Transparent
            borderColor: ColorList[planIndex],
            data: SM_organ,
            showLine: true,
            lineTension: 0
        }])
    })
    return [datasets, labels]
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
        var SMAreadatasets = [];
        var SMDistdatasets = [];
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
                    var SMAreaData = [];
                    var SMDistData = [];
                    responseOrgans.forEach( organData => {
                        this.extendDataset(DVHdatasets,SMAreaData,SMDistData,organData,patientId);
                        })
                    planDVH.push({plan: plan, datasets: DVHdatasets});
                    SMAreadatasets.push({plan: plans[planIndex], data: SMAreaData});
                    SMDistdatasets.push({plan: plans[planIndex], data: SMDistData});
                    // Plotters
                    if (planIndex == (planLength-1)){
                        if (typeof this.dvhChart != "undefined") {
                            dvhChart = this.dvhChart;
                            dvhChart.destroy();
                        }
                        if (typeof planId != "undefined"){
                            var planSelected = planDVH.filter(function(dvh){
                                return dvh.plan == planId
                            })
                            var datasetsSelected = planSelected[0].datasets
                            var dvhChart = this.createDVH(datasetsSelected, 'dvh');
                            this.dvhChart = dvhChart;
                        }
                        if (typeof this.ppChart != "undefined") {
                            ppChart = this.ppChart;
                            ppChart.destroy();
                        }
                        var ppChart = this.createParallelPlot(SMDistdatasets,'pp');
                        this.ppChart = ppChart;
                        if (typeof this.radarChart != "undefined") {
                            radarChart = this.radarChart;
                            radarChart.destroy();
                        }
                        var radarChart = this.createRadarPlot(SMAreadatasets,'radar');
                        this.radarChart = radarChart;
                    }
                    })
                })
            })
        })
    }


}

