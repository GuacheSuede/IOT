import { Component, OnInit } from '@angular/core';
import { GraphService } from '../graph.service';
import { Router } from '@angular/router';
import { SmoothieChart, TimeSeries } from './smoothie.js';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.sass']
})

export class AllComponent implements OnInit {

  graphs: any = [];

  current_visitors = [];
  temperature = [];
  noise = [];
  gas_amonia = [];

  bin = [];

  soap_dispenser = [];

  water_hand_wash = [];

  humidity = [];

  temperature_sink = [];

  urinal = [];
  sink = [];
  gas_hydrogen = [];
  gas_methane = [];

  gas_sulfur = [];

  gas_formaldehyde = [];

  gas_methylene_chloride = [];

  gas_hydrogen_sulfide = [];

  s1 = new SmoothieChart();
  s2 = new SmoothieChart();
  s3 = new SmoothieChart();
  s4 = new SmoothieChart();
  s5 = new SmoothieChart();
  s6 = new SmoothieChart();
  s7 = new SmoothieChart();
  s8 = new SmoothieChart();
  s9 = new SmoothieChart();
  s10 = new SmoothieChart();
  s11 = new SmoothieChart();
  s12 = new SmoothieChart();
  s13 = new SmoothieChart();
  s14 = new SmoothieChart();
  s15 = new SmoothieChart();
  s16 = new SmoothieChart();
  s17 = new SmoothieChart();

  getAllGraph() {
    this.graphService.getAllGraph().subscribe(graphs => {

      for (let g of graphs){
        if (g['data'].includes('gas_methane')){
          this.gas_methane.push(g);
        }
        if (g['data'].includes('gas_hydrogen')){

          this.gas_hydrogen.push(g);
        }
        if (g['data'].includes('gas_amonia')){

          this.gas_amonia.push(g);
        }
        if (g['data'].includes('gas_sulfur')){

          this.gas_sulfur.push(g);
        }
        if (g['data'].includes('gas_formaldehyde')){

          this.gas_formaldehyde.push(g);
        }
        if (g['data'].includes('gas_methylene_chloride')){

          this.gas_methylene_chloride.push(g);
        }
        if (g['data'].includes('gas_hydrogen_sulfide')){

          this.gas_hydrogen_sulfide.push(g);
        }

        if (g['data'].includes('current_visitors') || g['data'].includes('current_vistors') ){
          this.current_visitors.push(g);
        }

        if (g['data'].includes('temperature')){
          this.temperature.push(g);
        }

        if (g['data'].includes('noise')){
          this.noise.push(g);
        }

        if (g['data'].includes('temperature')){
          this.temperature.push(g);
        }


        if (g['data'].includes('urinal')){
          this.urinal.push(g);
        }

        if (g['data'].includes('sink')){
          this.sink.push(g);
        }


        if (g['data'].includes('soap_dispenser')){
          this.soap_dispenser.push(g);
        }
        if (g['data'].includes('bin')){
          this.bin.push(g);
        }

        if (g['data'].includes('water_hand_wash')){
          this.water_hand_wash.push(g);
        }

        if (g['data'].includes('humidity')){
          this.humidity.push(g);
        }

        if (g['data'].includes('temperature_sink')){

          this.temperature_sink.push(g);
        }

       }


      // this.graphs = graphs;
  });
}
  constructor(private graphService: GraphService, private router: Router) {


  }


  ngOnInit() {
    this.getAllGraph();

    this.s1.streamTo(document.getElementById('c1'), 1000);
    this.s2.streamTo(document.getElementById('c2'), 1000);
    this.s3.streamTo(document.getElementById('c3'), 1000);
    this.s4.streamTo(document.getElementById('c4'), 1000);
    this.s5.streamTo(document.getElementById('c5'), 1000);
    this.s6.streamTo(document.getElementById('c6'), 1000);
    this.s7.streamTo(document.getElementById('c7'), 1000);
    this.s8.streamTo(document.getElementById('c8'), 1000);
    this.s9.streamTo(document.getElementById('c9'), 1000);
    this.s10.streamTo(document.getElementById('c10'), 1000);
    this.s11.streamTo(document.getElementById('c11'), 1000);
    this.s12.streamTo(document.getElementById('c12'), 1000);
    this.s13.streamTo(document.getElementById('c13'), 1000);
    this.s14.streamTo(document.getElementById('c14'), 1000);
    this.s15.streamTo(document.getElementById('c15'), 1000);
    this.s16.streamTo(document.getElementById('c16'), 1000);
    this.s17.streamTo(document.getElementById('c17'), 1000);
    var line1 = new TimeSeries();
    var line2 = new TimeSeries();
    var line3 = new TimeSeries();
    var line4 = new TimeSeries();
    var line5 = new TimeSeries();
    var line6 = new TimeSeries();
    var line7 = new TimeSeries();
    var line8 = new TimeSeries();
    var line9 = new TimeSeries();
    var line10 = new TimeSeries();
    var line11 = new TimeSeries();
    var line12 = new TimeSeries();
    var line13 = new TimeSeries();
    var line14 = new TimeSeries();
    var line15 = new TimeSeries();
    var line16 = new TimeSeries();
    var line17 = new TimeSeries();

    var g1 = this.gas_methane;
    var g2 = this.gas_amonia;
    var g3 = this.gas_hydrogen;
    var g4 = this.gas_sulfur;
    var g5 = this.gas_formaldehyde;
    var g6 = this.gas_methylene_chloride;
    var g7 = this.gas_hydrogen_sulfide;
    var g8 = this.current_visitors;
    var g9 = this.temperature;
    var g10 = this.noise;
    var g11 = this.urinal;
    var g12 = this.water_hand_wash;
    var g13 = this.temperature_sink;
    var g14 = this.soap_dispenser;
    var g15 = this.bin;
    var g16 = this.humidity;
    var g17 = this.sink
    var track = 0;

    setInterval(function() {
      ++track
      line1.append(new Date(), g1[track]['value']);
      line2.append(new Date(), g2[track]['value']);
      line3.append(new Date(), g3[track]['value']);
      line4.append(new Date(), g4[track]['value']);
      line5.append(new Date(), g5[track]['value']);
      line6.append(new Date(), g6[track]['value']);
      line7.append(new Date(), g7[track]['value']);
      line8.append(new Date(), g8[track]['value']);
      line9.append(new Date(), g9[track]['value']);
      line10.append(new Date(), g10[track]['value']);
      line11.append(new Date(), g11[track]['value']);
      line12.append(new Date(), g12[track]['value']);
      line13.append(new Date(), g13[track]['value']);
      line14.append(new Date(), g14[track]['value']);
      line15.append(new Date(), g15[track]['value']);
      line16.append(new Date(), g16[track]['value']);
      line17.append(new Date(), g17[track]['value']);

    }, 3000);

    this.s1.addTimeSeries(line1,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s2.addTimeSeries(line2,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s3.addTimeSeries(line3,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s4.addTimeSeries(line4,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s5.addTimeSeries(line5,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s6.addTimeSeries(line6,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s7.addTimeSeries(line7,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s8.addTimeSeries(line8,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s9.addTimeSeries(line9,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s10.addTimeSeries(line10,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s11.addTimeSeries(line11,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s12.addTimeSeries(line12,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s13.addTimeSeries(line13,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3});
    this.s14.addTimeSeries(line14,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3 });
    this.s15.addTimeSeries(line15,  { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth:3 });

    this.s16.addTimeSeries(line16,  { strokeStyle:'rgb(0, 255, 0)', fillStyle:'rgba(0, 255, 0, 0.4)', lineWidth:3 });
    this.s17.addTimeSeries(line17,  { strokeStyle:'rgb(0, 255, 0)', fillStyle:'rgba(0, 255, 0, 0.4)', lineWidth:3 });

  }

}
