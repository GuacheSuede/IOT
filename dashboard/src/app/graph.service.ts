import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpClient) { }
  // url = environment.serverUrl;

  getAllGraph() {
    return this.http.get<any[]>('http://localhost:4040/api');
  }
  updategraph(id: string, graph) {
    return this.http.put('http://localhost:4040/api/${id}', graph);
  }
  deletegraph(id: string) {
    return this.http.delete<any[]>('http://localhost:4040/api/' + id);
  }
  addgraph(graph) {
    return this.http.post<any[]>('http://localhost:4040/api/', graph);
  }

  getGraph(keyword: string) {
    return this.http.get('http://localhost:4040/api/' + keyword);

  }

}
