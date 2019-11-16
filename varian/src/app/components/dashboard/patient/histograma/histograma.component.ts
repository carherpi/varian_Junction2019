import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

import Chart from 'chart.js';
import { Observable, combineLatest } from 'rxjs';


const StructureColors = [
    {ID: 'Body', Color: 'rgb(255,0,240)'},
    {ID: 'PTV_45', Color: 'rgba(180, 0, 0)'},
    {ID: 'PTV_50.4', Color: 'rgba(200, 0, 0)'},
    {ID: 'PTV56', Color: 'rgba(215, 0, 0)'},
    {ID: 'PTV_63', Color: 'rgba(230, 0, 0)'},
    {ID: 'PTV63', Color: 'rgba(230, 0, 0)'},
    {ID: 'PTV70', Color: 'rgba(255, 0, 0)'},
    {ID: 'Femur_R', Color: 'rgba(255, 0, 127, 1.00)'},
    {ID: 'Femur_L', Color: 'rgba(255, 41, 204)'},
    {ID: 'Bladder', Color: 'rgba(255, 164, 204)'},
    {ID: 'Rectum', Color: 'rgba(255, 64, 0)'},
    {ID: 'Bowel', Color: 'rgba(255, 204, 151)'},
    // {ID: 'Heart', Color: 'rgba(255, 255, 0)'},
    {ID: 'Heart', Color: 'rgba(0, 0, 255)'},
    {ID: 'Lung right', Color: 'rgba(255, 41, 162)'},
    {ID: 'Lung left', Color: 'rgba(255, 255, 85)'},
    // {ID: 'Lung-GTV', Color: 'rgba(255, 49, 142)'},
    {ID: 'Lung-GTV', Color: 'rgba(255, 255, 255)'},
    {ID: 'Spinal Cord', Color: 'rgba(255, 255, 174)'},
    {ID: 'BrainStem', Color: 'rgba(255, 219, 243)'},
    {ID: 'Mandible', Color: 'rgba(255, 41, 146, 0.80)'},
    {ID: 'Lips', Color: 'rgba(255, 204, 185)'},
    {ID: 'Parotid Right', Color: 'rgba(255, 153, 68)'},
    {ID: 'Parotid-Right', Color: 'rgba(255, 153, 68)'},
    {ID: 'Larynx', Color: 'rgba(255, 102, 102)'},
]

const CriticalOrgans = [
    {ID: 'Heart', MaxDose: null, MeanDose: 32,
    V: [{x:0,y:100},{x:40,y:100},{x:40,y:50},{x:70,y:50},{x:70,y:0}]},
    {ID: 'Lung right', MaxDose: null, MeanDose: 32, 
    V: [{x:0,y:100},{x:5,y:100},{x:5,y:50},{x:10,y:40},{x:20,y:25},{x:30,y:20},{x:70,y:20},{x:70,y:0}]},
    {ID: 'Lung left', MaxDose: null, MeanDose: 32, 
    V: [{x:0,y:100},{x:5,y:100},{x:5,y:50},{x:10,y:40},{x:20,y:25},{x:30,y:20},{x:70,y:20},{x:70,y:0}]},
    {ID: 'Spinal-cord', MaxDose: 45, MeanDose: null, V: []},
    {ID: 'Spinal Cord', MaxDose: 45, MeanDose: null, V: []},
    // {ID: 'BrainStem', Color: '#FFA4CC29'},
    // {ID: 'Kidneys', Color: '#FF400000'},
    // {ID: 'Liver', Color: '#FFCC9729'},
]
const CriticalOrgansID = CriticalOrgans.map(({ ID }) => ID)





@Component({
  selector: 'app-histograma',
  templateUrl: './histograma.component.html',
  styleUrls: ['./histograma.component.scss']
})

export class HistogramaComponent implements OnInit {

@Input() patientIdSelected : any;
@Input() planIdSelected : any


datasets = new Array<Object>();

constructor(
    private apiService: ApiServiceService,
    private patientComponent: PatientComponent
    ) { }

ngOnInit() {
    this.getData(this.patientIdSelected, this.planIdSelected);
    this.createDVH(this.datasets, 'dvh');
  }

ngOnChanges(changes) {
    this.getData(this.patientIdSelected, this.planIdSelected);
    this.createDVH(this.datasets, 'dvh');
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
}

createParallelPlot(SMdatasets,elementID) {
    let plans = SMdatasets.map(({plan}) => plan);
    var datasets = this.planData2organData(SMdatasets)
    console.log(datasets)
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
}

createRadarPlot(SMdatasets,elementID) {
    let plans = SMdatasets.map(({plan}) => plan);
    var datasets = this.planData2organData(SMdatasets)
    console.log(datasets)
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
}

curveArea(curve) {
    var start = true;
    var area = 0;
    var x_0 = 0;
    var y_0 = 0;
    curve.forEach(point => {
        if (start) {
            x_0 = point.x;
            y_0 = point.y;
            start = false;
        } else {
            var dx = point.x - x_0;
            var dy = point.y - y_0;
            area = area + dx*point.y -(dx*dy)/2;
            x_0 = point.x;
            y_0 = point.y;
        }
    })
    return(area)
}

extendDataset(DVHdatasets,SMdata,organData) {
    var organ = organData["Id"];
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
            var OrganLimits = CriticalOrgans.filter(function(structure){
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
                    borderDash: [10,5],
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
                        borderDash: [10,5],
                        lineTension: 0
                    })
                }
            var Alimit = this.curveArea(Vlimit)
            var Acurve = this.curveArea(curve)
            SMdata.push(
                {organ: organ, SM: (Alimit-Acurve)/Acurve})
            }
        }
    }

planData2organData(DataIN) {
    console.log(DataIN)
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
    console.log(patientId)
    this.apiService.getPatientPlans(patientId)
    .subscribe( planIDs => {
        console.log(planIDs)
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
                        this.extendDataset(DVHdatasets,SMdata,organData);
                        })
                    planDVH.push({plan: plan, datasets: DVHdatasets});
                    SMdatasets.push({plan: plans[planIndex], data: SMdata});
                    // Plotters
                    if (planIndex == (planLength-1)){
                        var planSelected = planDVH.filter(function(dvh){
                            return dvh.plan == planId
                        })
                        var datasetsSelected = planSelected[0].datasets
                        this.createDVH(datasetsSelected, 'dvh');
                        this.createParallelPlot(SMdatasets,'pp');
                        this.createRadarPlot(SMdatasets,'radar');
                    }
                    })
                })
            })
        })
    }


}

