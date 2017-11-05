import { Component, OnInit } from '@angular/core';
import { PastanagaService } from '../service';

@Component({
  selector: 'app-pastanaga-message',
  templateUrl: './pastanaga-message.component.html',
  styleUrls: ['./pastanaga-message.component.scss']
})
export class PastanagaMessageComponent implements OnInit {

  message: string;
  error = false;

  constructor(public pastanaga: PastanagaService) { }

  ngOnInit() {
    this.pastanaga.message.subscribe(msg => {
      console.log(msg);
      this.message = msg.message;
      this.error = msg.error;
    });
  }

  cancel() {
    this.pastanaga.discardMessage(true);
  }
}
