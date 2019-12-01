import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EngineService } from './engine.service';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html'
})
export class EngineComponent implements OnInit {

  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private engServ: EngineService) { }

  ngOnInit() {

    const socket = socketIo('https://mysterious-bastion-25953.herokuapp.com/')

    socket.on('hello', (data) => {
      console.log('\n\n\n',data,'\n\n\n')
      this.engServ.createScene(this.rendererCanvas, 'Hello');
      this.engServ.animate();
    })

    socket.on('msg', (data) => {
      console.log('\n\n\n', data, '\n\n\n')
      this.engServ.createScene(this.rendererCanvas, data);
      this.engServ.animate();
    })
    
  }

}
