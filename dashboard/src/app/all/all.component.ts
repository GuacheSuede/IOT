import { Component, OnInit } from '@angular/core';
import { GraphService } from '../graph.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.sass']
})

export class AllComponent implements OnInit {

  graphs: any = [];

  getAllGraph() {
    this.graphService.getAllGraph().subscribe(graphs => {
      this.graphs = graphs;
  });
}
  constructor(private graphService: GraphService, private router: Router) {

    this.getAllGraph();

  }


  ngOnInit() {
  }
?
}
