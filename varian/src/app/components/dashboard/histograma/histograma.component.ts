import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';



@Component({
  selector: 'app-histograma',
  templateUrl: './histograma.component.html',
  styleUrls: ['./histograma.component.scss']
})

declare var Chart : any;

const patientId = 'Lung';
const planId = 'JSu-IM107' // Assume is given

const protocols = [
    {patient: 'Head_Neck', protocol: 'http://www.londoncancer.org/media/84331/london-cancer-head-and-neck-radiotherapy-protocol-march-2013.pdf'},
]

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
    {ID: 'Heart', Color: 'rgba(255, 255, 0)'},
    {ID: 'Lung right', Color: 'rgba(255, 41, 162)'},
    {ID: 'Lung left', Color: 'rgba(255, 255, 85)'},
    {ID: 'Lung-GTV', Color: 'rgba(255, 49, 142)'},
    {ID: 'Spinal Cord', Color: 'rgba(255, 255, 174)'},
    {ID: 'BrainStem', Color: 'rgba(255, 219, 243)'},
    {ID: 'Mandible', Color: 'rgba(255, 41, 146, 0.80)'},
    {ID: 'Lips', Color: 'rgba(255, 204, 185)'},
    {ID: 'Parotid Right', Color: 'rgba(255, 153, 68)'},
    {ID: 'Parotid-Right', Color: 'rgba(255, 153, 68)'},
    {ID: 'Larynx', Color: 'rgba(255, 102, 102)'},
]

const CriticalOrgans = [
    {ID: 'Heart', MaxDose: null, MeanDose: 32, V: [{x:40,y:50}]},
    {ID: 'Lung right', MaxDose: null, MeanDose: 32, 
    V: [{x:30,y:20},{x:20,y:25},{x:10,y:40},{x:5,y:50}]},
    {ID: 'Lung left', MaxDose: null, MeanDose: 32, 
    V: [{x:30,y:20},{x:20,y:25},{x:10,y:40},{x:5,y:50}]},
    {ID: 'Spinal-cord', MaxDose: 45, MeanDose: null, V: []},
    {ID: 'Spinal Cord', MaxDose: 45, MeanDose: null, V: []},
    // {ID: 'BrainStem', Color: '#FFA4CC29'},
    // {ID: 'Kidneys', Color: '#FF400000'},
    // {ID: 'Liver', Color: '#FFCC9729'},
]
const CriticalOrgansID = CriticalOrgans.map(({ ID }) => ID)


export class HistogramaComponent implements OnInit {

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    
  }

  createChart(datasets) {
    var canvas = <HTMLCanvasElement> document.getElementById("dvh");
    var ctx = canvas.getContext("2d");
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

  getHistoData(){
    this.apiService.getDVH(patientId,planId)
    .subscribe(function (response){
    var organs = response;
    this.apiService.getDVHsCurve(patientId, planId,organs)
    .then(function(results){
      datasets = result;
        results.forEach(response => {
            var organ = response.data.Id;
            console.log(organ)
            if (CriticalOrgansID.includes(organ) || organ.includes('PTV') || organ.includes('GTV')){
                var curve = response.data.CurvePoints.map(({Volume: y, ...rest})=>({y, ...rest}));
                curve = curve.map(({Dose: x, ...rest})=>({x, ...rest}));
                var color = StructureColors.filter(function(structure){
                    return structure.ID == organ
                })
                var color = color[0].Color
                datasets = datasets.concat([{
                    label: response.data.Id,
                    backgroundColor: 'rgb(255, 255, 255, 0)', // Transparent
                    borderColor: color,
                    data: curve,
                    showLine: true,
                }])
                if (CriticalOrgansID.includes(organ)) {
                    var OrganLimits = CriticalOrgans.filter(function(structure){
                        return structure.ID == organ
                    })
                    var Vlimit = OrganLimits[0].V
                    if (Vlimit.length > 0) {
                        datasets = datasets.concat([{
                            label: response.data.Id + ' Protocol Limit',
                            backgroundColor: 'rgb(255, 255, 255, 0)', // Transparent
                            borderColor: color,
                            data: Vlimit,
                            showLine: true,
                        }])
                    }
                    var MaxDoselimit = OrganLimits[0].MaxDose
                    if (MaxDoselimit != null) {
                        datasets = datasets.concat([{
                            label: response.data.Id + ' Max Dose',
                            backgroundColor: 'rgb(255, 255, 255, 0)', // Transparent
                            borderColor: color,
                            data: [{x:MaxDoselimit,y:0},{x:MaxDoselimit,y:100}],
                            showLine: true,
                        }])
                    }
                }
            }
        });
    })
    .finally(function() {
        this.createChart(datasets)
    })
})
}

}

